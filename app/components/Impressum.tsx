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
              Jonas Kwaschik<br />
              (Einzelunternehmer, handelnd als JNK Momentum / jnklab)
            </p>
          </div>

          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Geschäftsadresse
            </p>
            {/* PLACEHOLDER: Replace with confirmed business address before DNS cutover */}
            <p className="italic" style={{ color: "#4a4a68" }}>
              [PLACEHOLDER: Straße und Hausnummer]<br />
              [PLACEHOLDER: PLZ und Ort]<br />
              Deutschland
            </p>
          </div>

          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Inhaber
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
                href="mailto:hello@jnklab.com"
                style={{ color: "#9b8ffd" }}
              >
                hello@jnklab.com
              </a>
            </p>
          </div>

          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Handelsregister
            </p>
            {/* PLACEHOLDER: Fill in if/when company is registered as UG or GmbH */}
            <p className="italic" style={{ color: "#4a4a68" }}>
              Nicht eingetragen (Einzelunternehmer)<br />
              <span style={{ fontSize: "0.8em" }}>[PLACEHOLDER: aktualisieren bei UG/GmbH-Gründung]</span>
            </p>
          </div>

          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Umsatzsteuer-ID
            </p>
            {/* PLACEHOLDER: Fill in once VAT registration is complete */}
            <p className="italic" style={{ color: "#4a4a68" }}>
              [PLACEHOLDER: USt-IdNr. gemäß § 27a UStG: DE…]
            </p>
          </div>

          <div>
            <p className="font-medium mb-1" style={{ color: "#9090b8" }}>
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </p>
            <p style={{ color: "#7878a0" }}>
              Jonas Kwaschik<br />
              {/* PLACEHOLDER: Add confirmed address below once available */}
              <span className="italic" style={{ color: "#4a4a68" }}>[PLACEHOLDER: Adresse wie oben]</span>
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
                href="mailto:hello@jnklab.com"
                style={{ color: "#9b8ffd" }}
              >
                hello@jnklab.com
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
