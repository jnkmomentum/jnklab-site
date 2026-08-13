"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Mission", href: "#mission" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
  { label: "Impressum", href: "#impressum" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(6, 6, 9, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: "#e8e8f0", letterSpacing: "0.18em" }}
        >
          JNK<span style={{ color: "#6d5dfc" }}>.</span>
        </a>

        <div className="hidden sm:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm transition-colors duration-200"
              style={{ color: "#7878a0" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#e8e8f0")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#7878a0")
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:hello@jnklab.com"
          className="hidden sm:inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-all duration-200"
          style={{
            border: "1px solid rgba(109, 93, 252, 0.4)",
            color: "#9b8ffd",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(109, 93, 252, 0.12)";
            el.style.borderColor = "rgba(109, 93, 252, 0.7)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "transparent";
            el.style.borderColor = "rgba(109, 93, 252, 0.4)";
          }}
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
