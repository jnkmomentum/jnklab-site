"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero background: a colorful, depth-blurred particle field rendered in WebGL
 * (three.js) that reacts to the pointer.  Replaces the old 2D "constellation"
 * canvas.  Design goals (NIC-5168):
 *   - inspiring + colorful (brand-violet → cyan → magenta palette)
 *   - partly blurred: a subset of particles are large, soft bokeh (depth-of-field)
 *   - interacts with the mouse: particles are pushed away from the cursor and
 *     the whole field parallax-drifts toward it
 *   - honours prefers-reduced-motion (renders a single static frame, no loop)
 */

const COUNT = 320;

// Muted violet-only palette — intentional, not a rainbow.
const PALETTE = [
  new THREE.Color("#6d5dfc"), // brand violet
  new THREE.Color("#8b5cf6"), // violet
  new THREE.Color("#4c3ad6"), // deep violet
  new THREE.Color("#a78bfa"), // soft lilac
];

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;      // clip-space -1..1
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

    // --- pointer repulsion (in clip space) --------------------------------
    vec2 ndc = gl_Position.xy / gl_Position.w;
    vec2 toMouse = ndc - uMouse;
    toMouse.x *= uAspect;
    float d = length(toMouse);
    float radius = 0.55;
    float force = smoothstep(radius, 0.0, d) * uMouseActive;
    // nearer-to-camera (higher focus) particles react more → parallax feel
    vec2 push = normalize(toMouse + 1e-4) * force * (0.16 + aFocus * 0.20);
    gl_Position.xy += push * gl_Position.w;

    // --- size: blurred particles are much larger (bokeh) ------------------
    float focusSize = mix(3.4, 1.0, aFocus);
    gl_PointSize = aSize * focusSize * uPixelRatio * (300.0 / -mvPosition.z);

    // blurred particles are dimmer so they read as out-of-focus depth
    vAlpha = mix(0.10, 0.55, aFocus);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec3  vColor;
  varying float vFocus;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5)) * 2.0; // 0 center .. ~1 edge
    if (dist > 1.0) discard;

    // Crisp particles get a tight bright core; blurred ones a wide soft haze.
    float edge = pow(1.0 - dist, mix(1.0, 3.2, vFocus));
    float core = pow(1.0 - dist, 6.0) * vFocus; // extra sparkle on focused pts

    float alpha = (edge * 0.55 + core * 0.4) * vAlpha;
    vec3 col = vColor + core * 0.3; // hot centre lifts toward white
    gl_FragColor = vec4(col, alpha);
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

      // Even palette distribution across the muted violet tones.
      const idx = Math.floor(Math.random() * PALETTE.length);
      const c = PALETTE[idx];
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
