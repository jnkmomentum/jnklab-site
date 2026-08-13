export default function Impressum() {
  return (
    <section
      id="impressum"
      className="py-24 px-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-xl font-semibold mb-10"
          style={{ color: "#e8e8f0" }}
        >
          Impressum
        </h2>

        <div
          className="text-sm leading-7 space-y-6"
          style={{ color: "#7878a0" }}
        >
          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Angaben gemäß § 5 TMG
            </p>
            <p style={{ color: "#7878a0" }}>
              JNK Momentum UG (haftungsbeschränkt)<br />
              Thomasiusstr. 25<br />
              10557 Berlin<br />
              Deutschland
            </p>
          </div>

          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Geschäftsführung
            </p>
            <p style={{ color: "#7878a0" }}>
              Jonas Kwaschik
            </p>
          </div>

          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Kontakt
            </p>
            <p>
              E-Mail:{" "}
              <a
                href="mailto:contact@jnklab.com"
                style={{ color: "#9b8ffd" }}
              >
                contact@jnklab.com
              </a>
            </p>
          </div>

          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Handelsregister
            </p>
            <p style={{ color: "#7878a0" }}>
              Amtsgericht Berlin (Charlottenburg), HRB 150638 B
            </p>
          </div>

          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Umsatzsteuer-ID
            </p>
            <p style={{ color: "#7878a0" }}>
              DE289447986 (gemäß § 27a UStG)
            </p>
          </div>

          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </p>
            <p style={{ color: "#7878a0" }}>
              Jonas Kwaschik<br />
              JNK Momentum UG (haftungsbeschränkt)<br />
              Thomasiusstr. 25, 10557 Berlin
            </p>
          </div>

          <hr style={{ borderColor: "rgba(255,255,255,0.06)" }} />

          <div>
            <p className="font-medium mb-2" style={{ color: "#9090b8" }}>
              Datenschutzhinweis
            </p>
            <p style={{ color: "#60608a" }}>
              Diese Website verwendet keine Cookies und erhebt keine
              personenbezogenen Daten. Beim Aufruf dieser Website werden
              technisch bedingt Server-Logs gespeichert (IP-Adresse, Zeitstempel,
              aufgerufene Seite). Diese Daten werden ausschließlich zur
              Sicherstellung des Betriebs verwendet und nach 7 Tagen
              automatisch gelöscht.
            </p>
            <p className="mt-3" style={{ color: "#60608a" }}>
              Für Anfragen zum Datenschutz wenden Sie sich bitte an:{" "}
              <a
                href="mailto:contact@jnklab.com"
                style={{ color: "#9b8ffd" }}
              >
                contact@jnklab.com
              </a>
            </p>
          </div>

          <div>
            <p className="font-medium mb-2" style={{ color: "#9090b8" }}>
              Haftungsausschluss
            </p>
            <p style={{ color: "#60608a" }}>
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt
              erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der
              Inhalte übernehmen wir keine Gewähr. Als Diensteanbieter sind wir
              für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich.
              Für externe Links gilt: Zum Zeitpunkt der Verlinkung wurden keine
              Rechtsverstöße festgestellt. Bei Bekanntwerden von
              Rechtsverletzungen werden derartige Links umgehend entfernt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
