/**
 * JNK wordmark with the "." reimagined as a point of impact (NIC-5168):
 * a glowing violet core with expanding shockwave rings and a ring of sparks
 * radiating outward — echoing the hero particle field. Pure CSS, no JS/runtime
 * cost; the animation calms to a static glow under prefers-reduced-motion.
 */

const SPARKS = [0, 45, 90, 135, 180, 225, 270, 315];

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
        <span className="impact-ring" />
        <span className="impact-ring delay" />
        {SPARKS.map((a) => (
          <span
            key={a}
            className="impact-spark"
            style={{ ["--a" as string]: `${a}deg` }}
          />
        ))}
        <span className="impact-core" />
      </span>
    </span>
  );
}
