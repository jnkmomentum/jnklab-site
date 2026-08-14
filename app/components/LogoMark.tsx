// Each spark gets its own angle + staggered delay for organic, non-mechanical feel
const SPARKS = [
  { angle: 0, delay: 0 },
  { angle: 45, delay: 0.55 },
  { angle: 90, delay: 1.1 },
  { angle: 135, delay: 0.3 },
  { angle: 180, delay: 0.85 },
  { angle: 225, delay: 1.4 },
  { angle: 270, delay: 0.65 },
  { angle: 315, delay: 1.9 },
];

export default function LogoMark() {
  return (
    <span
      className="inline-flex items-baseline font-bold tracking-wide uppercase"
      style={{
        color: "#e8e8f0",
        letterSpacing: "0.12em",
        fontFamily: "var(--font-space)",
      }}
    >
      JNK
      <span className="impact" aria-hidden="true">
        {SPARKS.map(({ angle, delay }) => (
          <span
            key={angle}
            className="impact-spark"
            style={{
              ["--a" as string]: `${angle}deg`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
        <span className="impact-core" />
      </span>
    </span>
  );
}
