"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    let animId: number;
    const particles: Particle[] = [];
    const COUNT = 60;
    const CONNECT_DIST = 130;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(109, 93, 252, ${p.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = ((1 - dist / CONNECT_DIST) * 0.15);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(109, 93, 252, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useParticles(canvasRef);

  return (
    <section
      id="top"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 text-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,93,252,0.12) 0%, transparent 70%), #060609",
      }}
    >
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
          style={{
            border: "1px solid rgba(109, 93, 252, 0.3)",
            color: "#9b8ffd",
            background: "rgba(109, 93, 252, 0.06)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#6d5dfc" }}
          />
          Consulting & Product Studio
        </div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span style={{ color: "#e8e8f0" }}>We design,{" "}</span>
          <br className="hidden sm:block" />
          <span
            style={{
              fontFamily: "var(--font-instrument)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
            className="gradient-text"
          >
            build
          </span>
          <span style={{ color: "#e8e8f0" }}>{" "}and ship.</span>
        </h1>

        <p
          className="text-lg sm:text-xl leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: "#7878a0" }}
        >
          JNK Momentum is a boutique studio that turns ideas into{" "}
          <span style={{ color: "#e8e8f0" }}>real software</span> — consulting
          engagements and owned products, shipped with intent.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#work"
            className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: "#6d5dfc",
              color: "#fff",
              boxShadow: "0 0 24px rgba(109, 93, 252, 0.35)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 36px rgba(109, 93, 252, 0.55)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 24px rgba(109, 93, 252, 0.35)";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            See our work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#e8e8f0",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.25)";
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#4a4a68" }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div
          className="w-px h-12"
          style={{
            background:
              "linear-gradient(to bottom, rgba(109,93,252,0.5), transparent)",
          }}
        />
      </div>
    </section>
  );
}
