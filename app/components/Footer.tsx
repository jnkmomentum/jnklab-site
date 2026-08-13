"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="py-10 px-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: "#4a4a68" }}
        >
          JNK<span style={{ color: "#6d5dfc" }}>.</span>
        </span>
        <span className="text-xs" style={{ color: "#4a4a68" }}>
          &copy; {year} JNK Momentum. All rights reserved.
        </span>
        <a
          href="#impressum"
          className="text-xs transition-colors duration-200"
          style={{ color: "#4a4a68" }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = "#7878a0")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "#4a4a68")
          }
        >
          Impressum & Datenschutz
        </a>
      </div>
    </footer>
  );
}
