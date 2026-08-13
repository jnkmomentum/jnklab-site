const values = [
  {
    title: "Shipping is the strategy",
    body: "We ship small, learn fast, and iterate in production. No endless planning cycles — working software is the only reliable measure of progress.",
  },
  {
    title: "Craft in the details",
    body: "We care about the last 10%. Typography, motion, micro-interactions — these are not luxuries, they are signals of a team that gives a damn.",
  },
  {
    title: "Honest partnership",
    body: "We tell clients what is real. If a feature is the wrong move, we say so. Our reputation is built on advice we would give our own company.",
  },
  {
    title: "Long-term thinking",
    body: "We build software meant to last. Maintainable code, clear architecture, and documentation that does not rot — because we often maintain what we build.",
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
            Mission & Vision
          </div>
          <h2
            className="reveal reveal-delay-1 text-4xl sm:text-5xl font-bold leading-tight mb-6"
            style={{ color: "#e8e8f0" }}
          >
            A studio that{" "}
            <span
              style={{
                fontFamily: "var(--font-instrument)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
              className="gradient-text"
            >
              moves
            </span>
          </h2>
          <p
            className="reveal reveal-delay-2 text-lg leading-relaxed"
            style={{ color: "#7878a0" }}
          >
            JNK Momentum is a German consulting firm and product studio.
            We work with focused teams who need a senior technical partner —
            and we build our own products on the side, eating our own cooking.
          </p>
        </div>

        {/* Two-column intro */}
        <div className="reveal reveal-delay-2 grid sm:grid-cols-2 gap-8 mb-20">
          <div
            className="p-8 rounded-2xl"
            style={{
              background: "#0d0d14",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#6d5dfc" }}
            >
              Consulting
            </h3>
            <p className="text-base leading-relaxed" style={{ color: "#9090b8" }}>
              We embed with product and engineering teams as a senior technical
              partner. Strategy, architecture, code, delivery — whatever the
              engagement needs. We take equity or fixed scope, always with skin
              in the game.
            </p>
          </div>
          <div
            className="p-8 rounded-2xl"
            style={{
              background: "#0d0d14",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "#6d5dfc" }}
            >
              Products
            </h3>
            <p className="text-base leading-relaxed" style={{ color: "#9090b8" }}>
              We build and own software products. Not MVPs that gather dust —
              real tools with real users. Each product is a bet we stand behind
              with our own time, money, and code.
            </p>
          </div>
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
