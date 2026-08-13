const values = [
  {
    title: "Impact over output",
    body: "We measure what changed, not lines shipped.",
  },
  {
    title: "Speed to validation",
    body: "Early-stage momentum beats late-stage polish.",
  },
  {
    title: "Forward innovation",
    body: "We hunt the non-obvious, high-leverage move.",
  },
  {
    title: "AI as new work",
    body: "Reshaping how teams operate, not decorating them with a chatbot.",
  },
  {
    title: "Honest partnership",
    body: "Straight talk, shared skin in the game.",
  },
];

export default function Mission() {
  return (
    <section id="mission" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <div
            className="reveal text-xs font-medium tracking-widest uppercase mb-6"
            style={{ color: "#6d5dfc" }}
          >
            What we do
          </div>
          <h2
            className="reveal reveal-delay-1 text-4xl sm:text-5xl font-bold leading-tight mb-6"
            style={{ color: "#e8e8f0" }}
          >
            Product innovation &{" "}
            <span
              style={{
                fontFamily: "var(--font-instrument)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
              className="gradient-text"
            >
              consulting
            </span>
          </h2>
          <p
            className="reveal reveal-delay-2 text-lg leading-relaxed"
            style={{ color: "#7878a0" }}
          >
            We partner with companies and teams to find the valuable, innovative
            thing — and get it into real users&apos; hands fast. Early-stage products and MVPs
            are our home turf: momentum and validated outcomes over polish. And
            we rethink how people and teams work with AI, so both the product
            and the way you build it move faster.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`reveal reveal-delay-${(i % 4) + 1} p-6 rounded-xl card-hover`}
              style={{
                background: "#0d0d14",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="w-8 h-px mb-4"
                style={{ background: "#6d5dfc" }}
              />
              <h4
                className="text-sm font-semibold mb-3"
                style={{ color: "#e8e8f0" }}
              >
                {v.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "#7878a0" }}>
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
