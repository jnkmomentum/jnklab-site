"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div
          className="reveal text-xs font-medium tracking-widest uppercase mb-6"
          style={{ color: "#6d5dfc" }}
        >
          Contact
        </div>

        <h2
          className="reveal reveal-delay-1 text-4xl sm:text-5xl font-bold leading-tight mb-6"
          style={{ color: "#e8e8f0" }}
        >
          Let&rsquo;s talk about{" "}
          <span
            style={{
              fontFamily: "var(--font-instrument)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
            className="gradient-text"
          >
            your project
          </span>
        </h2>

        <p
          className="reveal reveal-delay-2 text-lg leading-relaxed mb-12"
          style={{ color: "#7878a0" }}
        >
          Whether you need a technical partner for a consulting engagement, or
          want to talk about one of our products — we are a short email away.
        </p>

        <div className="reveal reveal-delay-3">
          <a
            href="mailto:contact@jnklab.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium transition-all duration-300"
            style={{
              background: "rgba(109, 93, 252, 0.1)",
              border: "1px solid rgba(109, 93, 252, 0.3)",
              color: "#9b8ffd",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(109, 93, 252, 0.18)";
              el.style.borderColor = "rgba(109, 93, 252, 0.6)";
              el.style.boxShadow = "0 0 30px rgba(109, 93, 252, 0.2)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(109, 93, 252, 0.1)";
              el.style.borderColor = "rgba(109, 93, 252, 0.3)";
              el.style.boxShadow = "none";
              el.style.transform = "none";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            contact@jnklab.com
          </a>
        </div>
      </div>
    </section>
  );
}
