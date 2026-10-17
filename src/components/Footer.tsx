import { SITE_BASE } from "../lib/api"

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid wrap">
        <div className="footer-brand">
          <a className="brand" href={`${SITE_BASE}/`}>
            <img src="/brand/shield-band.svg" alt="" />
            <span>
              Nordic <strong>Crypto</strong>
            </span>
          </a>
          <p>Uavhengige nyheiter om bitcoin, blokkjede og krypto i Norden.</p>
        </div>
        <div>
          <p className="footer-title">Utforsk</p>
          <a href={`${SITE_BASE}/`}>Nyheiter</a>
          <a href={`${SITE_BASE}/calendar/`}>Kalender</a>
          <a href={`${SITE_BASE}/markets/`}>Marknader</a>
        </div>
        <div>
          <p className="footer-title">Om oss</p>
          <a href={`${SITE_BASE}/about/`}>Om Nordic Crypto</a>
          <a href={`${SITE_BASE}/ethics/`}>Redaksjonelle prinsipp</a>
          <a href={`${SITE_BASE}/contact/`}>Kontakt</a>
        </div>
        <div>
          <p className="footer-title">Følg oss</p>
          <a href="https://t.me/nordiccryptochat">Telegram</a>
          <a href="https://x.com/nordiccryptobot">X / Twitter</a>
          <a href="https://github.com/nordic-crypto-org/nordic-crypto">
            Kjeldekode
          </a>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© 2026 Nordic Crypto</span>
        <span>Design av Mari Svennevik Notland</span>
        <span>Ingen informasjonskapslar · Inga annonsesporing</span>
        <span>MIT-lisens</span>
      </div>
    </footer>
  )
}
