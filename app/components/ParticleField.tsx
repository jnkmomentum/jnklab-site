"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero background: a colorful, depth-blurred particle field rendered in WebGL
 * (three.js) that reacts to the pointer.  Replaces the old 2D "constellation"
 * canvas.  Design goals (NIC-5168):
 *   - inspiring + colorful (brand-violet + mint accent palette)
 *   - partly blurred: a subset of particles are large, soft bokeh (depth-of-field)
 *   - magnifying lens on pointer: particles near cursor grow brighter and larger
 *   - honours prefers-reduced-motion (renders a single static frame, no loop)
 */

const COUNT = 320;

// Violet-dominant palette with mint green accent.
const PALETTE = [
  new THREE.Color("#6d5dfc"), // brand violet
  new THREE.Color("#8b5cf6"), // violet
  new THREE.Color("#4c3ad6"), // deep violet
  new THREE.Color("#a78bfa"), // soft lilac
  new THREE.Color("#2dd4bf"), // mint teal accent
  new THREE.Color("#34d399"), // emerald mint accent
];
// Mint appears with ~20% probability to be accent, not dominant
const PALETTE_WEIGHTS = [0.28, 0.22, 0.18, 0.22, 0.05, 0.05];

function pickPaletteColor(): THREE.Color {
  const r = Math.random();
  let acc = 0;
  for (let i = 0; i < PALETTE_WEIGHTS.length; i++) {
    acc += PALETTE_WEIGHTS[i];
    if (r < acc) return PALETTE[i];
  }
  return PALETTE[0];
}

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;       // clip-space -1..1
  uniform float uMouseActive;
  uniform float uPixelRatio;
  uniform float uAspect;

  attribute float aSeed;
  attribute float aSize;
  attribute float aFocus;    // 1 = crisp, 0 = blurred/far
  attribute vec3  aColor;

  varying vec3  vColor;
  varying float vFocus;
  varying float vAlpha;
  varying float vFlicker;
  varying float vMouseBoost; // 0..1, how close to cursor

  void main() {
    vColor = aColor;
    vFocus = aFocus;

    // --- gentle organic drift ---------------------------------------------
    vec3 p = position;
    float t = uTime * 0.12;
    float s = aSeed * 6.2831853;
    p.x += sin(t + s) * (1.4 + (1.0 - aFocus) * 1.8);
    p.y += cos(t * 0.9 + s * 1.3) * (1.2 + (1.0 - aFocus) * 1.6);
    p.z += sin(t * 0.7 + s * 0.7) * 1.0;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // --- magnifying lens effect (replaces black-hole push) ----------------
    vec2 ndc = gl_Position.xy / gl_Position.w;
    vec2 toMouse = ndc - uMouse;
    toMouse.x *= uAspect;
    float d = length(toMouse);
    float lensRadius = 0.42;
    float lensFactor  = smoothstep(lensRadius, 0.0, d) * uMouseActive;
    vMouseBoost = lensFactor;

    // --- size: blurred particles are much larger (bokeh) ------------------
    float focusSize = mix(3.4, 1.0, aFocus);
    // Particles within the lens radius grow larger — magnifying glass feel
    float sizeBoost = 1.0 + lensFactor * 2.2 * (0.5 + aFocus * 0.5);
    gl_PointSize = aSize * focusSize * uPixelRatio * (300.0 / -mvPosition.z) * sizeBoost;

    // blurred particles are dimmer so they read as out-of-focus depth
    vAlpha = mix(0.10, 0.55, aFocus);

    // --- per-particle flicker / sparkle -----------------------------------
    float flickerRate  = 2.5 + aSeed * 6.0;           // 2.5–8.5 Hz
    float flickerPhase = aSeed * 10.9956;              // spread phases
    float rawFlicker   = 0.55 + 0.45 * sin(uTime * flickerRate + flickerPhase);
    float softFlicker  = 0.88 + 0.12 * sin(uTime * flickerRate * 0.25 + flickerPhase);
    vFlicker = mix(softFlicker, rawFlicker, aFocus);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec3  vColor;
  varying float vFocus;
  varying float vAlpha;
  varying float vFlicker;
  varying float vMouseBoost;

  void main() {
    vec2 pc   = gl_PointCoord - vec2(0.5); // centered, range [-0.5, 0.5]
    float dist = length(pc) * 2.0;          // 0 = center, ~1 = edge

    // Lens brightness boost: particles near the cursor glow brighter
    float brightBoost = 1.0 + vMouseBoost * 1.6;

    if (vFocus > 0.35) {
      // ── Crisp star particle: draw as sparkle cross (+ shape) ──────────
      float aw = 0.065;                     // arm half-width in normalised coords
      bool inH   = abs(pc.y) < aw;         // inside horizontal arm
      bool inV   = abs(pc.x) < aw;         // inside vertical arm
      bool inDot = dist < 0.38;            // small central glow disk

      if (!inH && !inV && !inDot) discard;

      // Arm brightness falls off along arm length away from centre
      float armH = inH ? max(0.0, 1.0 - abs(pc.x) * 3.2) : 0.0;
      float armV = inV ? max(0.0, 1.0 - abs(pc.y) * 3.2) : 0.0;
      float arm  = max(armH, armV);

      // Very tight, hot centre core
      float core = pow(max(0.0, 1.0 - dist * 2.8), 3.0);

      float brightness = max(arm * 0.75, core);
      vec3  col  = vColor + core * 0.65;   // white-hot centre
      col = min(col * brightBoost, 1.0);   // magnify brightness
      float alpha = brightness * vAlpha * vFlicker * min(brightBoost, 2.0);
      gl_FragColor = vec4(col, alpha);
    } else {
      // ── Bokeh / blurred depth-of-field haze — soft circle, gentle flicker ──
      if (dist > 1.0) discard;
      float edge = pow(1.0 - dist, mix(1.0, 3.2, vFocus));
      float core = pow(1.0 - dist, 6.0) * vFocus;
      vec3  col  = vColor + core * 0.3;
      col = min(col * brightBoost, 1.0);
      float alpha = (edge * 0.55 + core * 0.4) * vAlpha * vFlicker * min(brightBoost, 2.0);
      gl_FragColor = vec4(col, alpha);
    }
  }
`;

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 60;

    // --- geometry ---------------------------------------------------------
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);
    const focuses = new Float32Array(COUNT);
    const colors = new Float32Array(COUNT * 3);

    const spreadX = 90;
    const spreadY = 60;
    const spreadZ = 55;

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spreadX;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;

      seeds[i] = Math.random();

      // ~65% blurred (low focus) bokeh for large galaxy-cloud halos
      const blurred = Math.random() < 0.65;
      focuses[i] = blurred
        ? Math.random() * 0.22
        : 0.55 + Math.random() * 0.45;
      sizes[i] = blurred
        ? 14 + Math.random() * 28  // large bokeh = galaxy cloud feel
        : 1.0 + Math.random() * 2.0;

      const c = pickPaletteColor();
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aFocus", new THREE.BufferAttribute(focuses, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseActive: { value: 0 },
      uPixelRatio: { value: pixelRatio },
      uAspect: { value: width / height },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- interaction ------------------------------------------------------
    const targetMouse = new THREE.Vector2(0, 0);
    let targetActive = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      targetMouse.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      );
      targetActive = 1;
    };
    const onPointerLeave = () => {
      targetActive = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      uniforms.uAspect.value = w / h;
    };
    window.addEventListener("resize", onResize);

    // --- render loop ------------------------------------------------------
    let animId = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      uniforms.uTime.value = clock.getElapsedTime();

      // eased pointer follow
      uniforms.uMouse.value.lerp(targetMouse, 0.08);
      uniforms.uMouseActive.value +=
        (targetActive - uniforms.uMouseActive.value) * 0.06;

      // slow parallax drift of the whole field toward the cursor
      points.rotation.y = uniforms.uMouse.value.x * 0.18;
      points.rotation.x = -uniforms.uMouse.value.y * 0.12;

      renderer.render(scene, camera);
    };

    if (reducedMotion) {
      // static: one frame, no motion, no pointer reaction
      uniforms.uMouseActive.value = 0;
      renderer.render(scene, camera);
    } else {
      const loop = () => {
        renderFrame();
        animId = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
