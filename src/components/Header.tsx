import Icon from "./Icon"
import { SITE_BASE } from "../lib/api"

export default function Header({
  darkMode,
  menuOpen,
  onThemeToggle,
  onMenuToggle,
}: {
  darkMode: boolean
  menuOpen: boolean
  onThemeToggle: () => void
  onMenuToggle: () => void
}) {
  return (
    <header className="site-header">
      <div className="header-top wrap">
        <a className="brand" href={`${SITE_BASE}/`} aria-label="Nordic Crypto framside">
          <img src="/brand/shield-band.svg" alt="" />
          <span>
            Nordic <strong>Crypto</strong>
          </span>
        </a>
        <div className="header-actions">
          <a className="subscribe-button" href="#newsletter">
            Få nyheitsbrevet
          </a>
          <button
            className="icon-button"
            type="button"
            onClick={onThemeToggle}
            aria-label={darkMode ? "Byt til lyst tema" : "Byt til mørkt tema"}
          >
            <Icon name={darkMode ? "sun" : "moon"} />
          </button>
          <details className="language-menu">
            <summary className="language-button" aria-label="Vel språk">
              <Icon name="globe" size={18} />
              <span>NN</span>
              <Icon name="chevron" size={14} />
            </summary>
            <div>
              <a href="https://nordiccrypto.no/nn/">Nynorsk</a>
              <a href="https://nordiccrypto.no/nb/">Bokmål</a>
              <a href="https://nordiccrypto.no/">English</a>
              <a href="https://nordiccrypto.no/sv/">Svenska</a>
              <a href="https://nordiccrypto.no/da/">Dansk</a>
              <a href="https://nordiccrypto.no/fi/">Suomi</a>
            </div>
          </details>
          <button
            className="menu-button"
            type="button"
            onClick={onMenuToggle}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label="Opne meny"
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>
      <div className={`nav-wrap ${menuOpen ? "is-open" : ""}`}>
        <nav
          className="main-nav wrap"
          id="main-navigation"
          aria-label="Hovudmeny"
        >
          <a className="active" href={`${SITE_BASE}/`}>Nyheiter</a>
          <a href={`${SITE_BASE}/calendar/`}>Kalender</a>
          <a href={`${SITE_BASE}/newsletter/`}>Nyheitsbrev</a>
          <a href={`${SITE_BASE}/markets/`}>Marknader</a>
          <a href={`${SITE_BASE}/org-chart/`}>Kven er kven</a>
          <a href={`${SITE_BASE}/academia/`}>Akademia</a>
        </nav>
      </div>
    </header>
  )
}
