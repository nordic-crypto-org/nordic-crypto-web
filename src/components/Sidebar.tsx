import { SITE_BASE } from "../lib/api"
import { formatDate, formatPrice } from "../lib/format"
import type { Market, NordicEvent } from "../lib/types"
import Icon from "./Icon"
import SectionLabel from "./SectionLabel"

export default function Sidebar({
  events,
  market,
}: {
  events: NordicEvent[]
  market: Market | null
}) {
  return (
    <aside className="side-column">
      <section className="side-section" id="events">
        <SectionLabel>Dette skjer i Norden</SectionLabel>
        <div className="event-list">
          {events.map((event) => (
            <a
              className="event"
              href={event.html_urls?.nn || event.html_urls?.en || `${SITE_BASE}/calendar/`}
              target="_blank"
              rel="noreferrer"
              key={event.id}
            >
              <span className="event-date">
                <strong>{formatDate(event.start, { day: "2-digit" })}</strong>
                <small>
                  {formatDate(event.start, { month: "short" }).toUpperCase()}
                </small>
              </span>
              <span className="event-info">
                <strong>{event.title}</strong>
                <span>
                  {event.online
                    ? "På nett"
                    : [event.city, event.country].filter(Boolean).join(", ")}
                </span>
              </span>
            </a>
          ))}
          {!events.length && <p className="loading-note">Hentar arrangement…</p>}
        </div>
        <a className="text-link" href={`${SITE_BASE}/calendar/`}>
          <Icon name="calendar" size={17} /> Sjå heile kalenderen
        </a>
      </section>

      <section className="market-card" id="markets">
        <div className="market-heading">
          <div>
            <p className="eyebrow">Nordiske marknader</p>
            <h2>Bitcoin</h2>
          </div>
          <span className="positive">{market ? "Direkte" : "Hentar"}</span>
        </div>
        <p className="price">
          {market ? formatPrice(market.price) : "—"} <span>NOK</span>
        </p>
        <div className="market-range">
          <span>
            Låg <strong>{market ? formatPrice(market.min) : "—"}</strong>
          </span>
          <span />
          <span>
            Høg <strong>{market ? formatPrice(market.max) : "—"}</strong>
          </span>
        </div>
        <div className="market-footer">
          <span>Gjennomsnitt · {market?.exchange_count || "—"} børsar</span>
          <a href={`${SITE_BASE}/markets/`}>
            Alle prisar <Icon name="arrow" size={15} />
          </a>
        </div>
      </section>

      <section className="newsletter" id="newsletter">
        <p className="eyebrow">Kvar fredag</p>
        <h2>Dei viktigaste kryptonyheitene i Norden i innboksen din.</h2>
        <p>
          Ei vekentleg oppsummering med dei utvalde sakene til redaksjonen.
          Ingen annonsar. Ingen støy.
        </p>
        <form
          method="post"
          action="https://nordic-crypto-tips.nordiccrypto.workers.dev/api/subscribe"
        >
          <input type="hidden" name="site" value="nordic-crypto" />
          <input type="hidden" name="lang" value="nn" />
          <label htmlFor="email">E-postadresse</label>
          <div className="input-group">
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="du@eksempel.no"
            />
            <button type="submit" aria-label="Abonner på nyheitsbrevet">
              <Icon name="arrow" />
            </button>
          </div>
          <label className="newsletter-consent">
            <input name="consent" type="checkbox" value="yes" required />
            <span>
              Eg samtykkjer til at Nordic Crypto lagrar adressa og sender meg
              nyheitsbrevet.
            </span>
          </label>
        </form>
        <small>Gratis · Meld deg av når som helst</small>
      </section>
    </aside>
  )
}
