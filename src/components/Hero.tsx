import { formatDate } from "../lib/format"

export default function Hero({
  updated,
  dataError,
}: {
  updated: string | null
  dataError: boolean
}) {
  return (
    <>
      <section className="hero">
        <div className="hero-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
          <i />
        </div>
        <div className="hero-grid wrap">
          <div>
            <p className="eyebrow">Uavhengig nordisk journalistikk</p>
            <h1>Krypto i Norden. Utan støy.</h1>
          </div>
          <div className="hero-copy">
            <p>
              Nyheiter, regulering og arrangement frå Noreg, Sverige, Danmark,
              Finland og Island — samla, verifiserte og forklarte.
            </p>
            <p className="updated">
              {dataError
                ? "Kunne ikkje oppdatere nett no"
                : updated
                  ? `Oppdatert ${formatDate(updated, {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Hentar siste oppdatering"}
              {" · "}Live data frå Nordic Crypto
            </p>
          </div>
        </div>
      </section>

      <div className="coverage-bar">
        <div className="coverage-inner wrap">
          <div className="coverage-status">
            <span className="status-pulse" />
            <span>Nordisk dekning</span>
          </div>
          <div className="country-links" aria-label="Land me dekkjer">
            {["NO", "SE", "DK", "FI", "IS"].map((country) => (
              <a href="#latest" key={country}>{country}</a>
            ))}
          </div>
          <p>
            <strong>5 land</strong>
            <span>Opne data</span>
            <span>Oppdatert fortløpande</span>
          </p>
        </div>
      </div>
    </>
  )
}
