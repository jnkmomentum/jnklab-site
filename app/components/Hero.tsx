"use client";

import ParticleField from "./ParticleField";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 text-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(109,93,252,0.12) 0%, transparent 70%), #060609",
      }}
    >
      {/* WebGL particle field (three.js) — colorful, depth-blurred, mouse-reactive */}
      <ParticleField />

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
