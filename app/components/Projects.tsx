const projects = [
  {
    name: "Dawn",
    tagline: "Personal life management",
    description:
      "A personal life-management app that brings together your goals, habits, and daily rhythm. Designed for depth, not bustle.",
    url: "",
    status: "Live",
    tags: ["iOS", "Web", "Productivity"],
    accentColor: "rgba(139, 92, 246, 0.15)",
    coverImage: "/covers/dawn.jpg",
  },
  {
    name: "HedyKnows",
    tagline: "KI-Kurse für Frauen",
    description:
      "A German AI-skills coaching platform built for women who want to work smarter with artificial intelligence. Practical, direct, no hype.",
    url: "https://hedyknows.com",
    status: "Live",
    tags: ["Education", "AI", "DE"],
    accentColor: "rgba(16, 185, 129, 0.12)",
    coverImage: "/covers/hedy.jpg",
  },
  {
    name: "Civic Graph",
    tagline: "Open legislative knowledge graph",
    description:
      "An open knowledge graph of legislative and civic data built from primary public sources — making government data actually navigable.",
    url: "https://civigraph.eu",
    status: "Live",
    tags: ["Open data", "Civic tech", "Graph"],
    accentColor: "rgba(59, 130, 246, 0.12)",
    coverImage: "/covers/civicgraph.jpg",
  },
  {
    name: "Miravel",
    tagline: "German personal-finance simulator",
    description:
      "A personal-finance simulator tailored to the German financial system. Model your financial future — realistically, in your language.",
    url: "https://miravel.io",
    status: "Live",
    tags: ["Fintech", "Germany", "Simulator"],
    accentColor: "rgba(245, 158, 11, 0.12)",
    coverImage: "/covers/miravel.jpg",
  },
];

function StatusBadge({ status }: { status: string }) {
  const live = status === "Live";
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
      style={{
        background: live
          ? "rgba(16, 185, 129, 0.1)"
          : "rgba(109, 93, 252, 0.1)",
        color: live ? "#10b981" : "#9b8ffd",
        border: live
          ? "1px solid rgba(16, 185, 129, 0.2)"
          : "1px solid rgba(109, 93, 252, 0.2)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: live ? "#10b981" : "#6d5dfc" }}
      />
      {status}
    </span>
  );
}

export default function Projects() {
  return (
    <section
      id="work"
      className="py-32 px-6"
      style={{
        background:
          "linear-gradient(to bottom, #060609 0%, #080810 50%, #060609 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-20">
          <div
            className="reveal text-xs font-medium tracking-widest uppercase mb-6"
            style={{ color: "#6d5dfc" }}
          >
            Portfolio
          </div>
          <h2
            className="reveal reveal-delay-1 text-4xl sm:text-5xl font-bold leading-tight mb-6"
            style={{ color: "#e8e8f0" }}
          >
            Things we{" "}
            <span
              style={{
                fontFamily: "var(--font-instrument)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
              className="gradient-text"
            >
              actually shipped
            </span>
          </h2>
          <p
            className="reveal reveal-delay-2 text-lg leading-relaxed"
            style={{ color: "#7878a0" }}
          >
            Four bets we are running — two live, two in the lab. Each one
            represents a genuine problem we decided to solve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const isExternal = p.url !== "";
            const linkProps = isExternal
              ? {
                  href: p.url,
                  target: "_blank" as const,
                  rel: "noopener noreferrer",
                }
              : undefined;

            return (
              <div
                key={p.name}
                className={`reveal reveal-delay-${(i % 2) + 1} relative group flex flex-col rounded-2xl card-hover overflow-hidden`}
                style={{
                  background: "#0d0d14",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Branded cover asset (NIC-5170) — abstract graphic per project */}
                <div
                  className="relative w-full h-36 overflow-hidden"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.coverImage}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ background: "#0d0d14" }}
                  />
                  {/* Bottom fade blends the cover into the card body */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(13,13,20,0) 0%, #0d0d14 100%)",
                    }}
                  />
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-8">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: "#e8e8f0" }}
                      >
                        {p.name}
                      </div>
                      <div className="text-sm" style={{ color: "#7878a0" }}>
                        {p.tagline}
                      </div>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed flex-1 mb-8"
                    style={{ color: "#9090b8" }}
                  >
                    {p.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "#7878a0",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {isExternal ? (
                    <a
                      {...linkProps}
                      className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                      style={{ color: "#9b8ffd" }}
                    >
                      Visit site
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  ) : (
                    <span
                      className="inline-flex items-center gap-2 text-sm font-medium"
                      style={{ color: "#4a4a68" }}
                    >
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
