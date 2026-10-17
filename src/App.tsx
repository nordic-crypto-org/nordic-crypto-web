import { useEffect, useState } from "react"

type IconName = "arrow" | "calendar" | "chevron" | "globe" | "menu" | "moon" | "sun"

type Story = {
  country: string
  date: string
  source: string
  title: string
  summary: string
  topics: string[]
}

const stories: Story[] = [
  {
    country: "SE",
    date: "16. oktober",
    source: "Kryptovalutaguiden",
    title:
      "Canton Foundation inngår avtale med Meritz Securities om tokenisering",
    summary:
      "Samarbeidet skal undersøke hvordan tradisjonelle aktiva som obligasjoner kan tokeniseres og gjøres tilgjengelige for institusjonelle investorer.",
    topics: ["Tokenisering", "Næringsliv"],
  },
  {
    country: "NO",
    date: "15. oktober",
    source: "Altaposten",
    title: "Kryptostrid i Kautokeino: Hvor utbredt er mining egentlig?",
    summary:
      "Et nytt spørsmål til Norges digitaliseringsminister setter søkelyset på kryptominingens rolle i landets voksende datasenterbransje.",
    topics: ["Mining", "Politik"],
  },
  {
    country: "NO",
    date: "15. oktober",
    source: "Finanstilsynet",
    title:
      "Finanstilsynet innfører nye MiCA-regler for betydelige tokenutstedere",
    summary:
      "De nye prosedyrereglene fastsetter hvordan Den europeiske banktilsynsmyndigheten kan ilegge bøter og tvangsmulkt.",
    topics: ["Regulering", "MiCA"],
  },
  {
    country: "SE",
    date: "15. oktober",
    source: "Kaupr",
    title: "Riksbanken vil forberede lovgivning for en mulig digital krone",
    summary:
      "Den svenske sentralbanken viser til sikkerhetssituasjonen, den digitale euroen og stablecoins, og ønsker at lovarbeidet starter nå.",
    topics: ["Politik", "Bank"],
  },
]

const events = [
  {
    day: "22",
    month: "OKT",
    title: "Nordic Blockchain Conference",
    place: "København, DK",
  },
  { day: "29", month: "OKT", title: "Bitcoin Oslo Meetup", place: "Oslo, NO" },
  {
    day: "05",
    month: "NOV",
    title: "Web3 Builders Helsinki",
    place: "Helsinki, FI",
  },
]

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v3M17 3v3M4 9h16" />
        <rect x="4" y="5" width="16" height="16" rx="2" />
      </>
    ),
    chevron: <path d="m7 10 5 5 5-5" />,
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    moon: <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  )
}

function SectionLabel({
  children,
  action,
}: {
  children: React.ReactNode
  action?: string
}) {
  return (
    <div className="section-label">
      <span>{children}</span>
      <span className="section-line" />
      {action && (
        <a className="section-action" href="#latest">
          {action} <Icon name="arrow" size={16} />
        </a>
      )}
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light"
  }, [darkMode])

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-top wrap">
          <a className="brand" href="#" aria-label="Nordic Crypto forside">
            <img src="/brand/shield-band.svg" alt="" />
            <span>
              Nordic <strong>Crypto</strong>
            </span>
          </a>
          <div className="header-actions">
            <a className="subscribe-button" href="#newsletter">
              Få nyhetsbrevet
            </a>
            <button
              className="icon-button"
              type="button"
              onClick={() => setDarkMode((mode) => !mode)}
              aria-label={
                darkMode ? "Skift til lyst tema" : "Skift til mørkt tema"
              }
            >
              <Icon name={darkMode ? "sun" : "moon"} />
            </button>
            <button
              className="language-button"
              type="button"
              aria-label="Velg språk"
            >
              <Icon name="globe" size={18} />
              <span>NO</span>
              <Icon name="chevron" size={14} />
            </button>
            <button
              className="menu-button"
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              aria-label="Åpne meny"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
        <div className={`nav-wrap ${menuOpen ? "is-open" : ""}`}>
          <nav
            className="main-nav wrap"
            id="main-navigation"
            aria-label="Hovedmeny"
          >
            <a className="active" href="#latest">
              Nyheter
            </a>
            <a href="#events">Kalender</a>
            <a href="#markets">Markeder</a>
            <a href="#regulation">Regulering</a>
            <a href="#research">Forskning</a>
            <a href="#people">Personer</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-grid wrap">
            <div>
              <p className="eyebrow">Uavhengig nordisk journalistikk</p>
              <h1>Krypto i Norden. Uten støy.</h1>
            </div>
            <div className="hero-copy">
              <p>
                Nyheter, regulering og arrangementer fra Danmark, Norge,
                Sverige, Finland og Island — samlet, verifisert og forklart.
              </p>
              <p className="updated">
                Oppdatert 17. oktober · 164 kilder fulgt
              </p>
            </div>
          </div>
        </section>

        <div className="content-grid wrap">
          <div className="news-column">
            <article className="lead-story">
              <div className="lead-kicker">
                <span className="country">NO</span>
                <span>Politik &amp; mining</span>
                <span className="live-dot" />
                <span>Ny</span>
              </div>
              <h2>
                Norsk bransje avviser at datasentre vanligvis starter med
                kryptomining
              </h2>
              <p>
                Norsk Datasenter Industri avviser påstanden om at mining er en
                vanlig vei inn i datasenterbransjen. Saken følger debatten
                om Arctic Cores planer i Kautokeino.
              </p>
              <div className="lead-meta">
                <span>
                  Kilde: <strong>Ságat</strong>
                </span>
                <span>6 min. siden</span>
                <a href="#latest">
                  Les saken <Icon name="arrow" size={17} />
                </a>
              </div>
            </article>

            <section className="latest" id="latest">
              <SectionLabel action="Se alle nyheter">Siste nytt</SectionLabel>
              <div className="story-list">
                {stories.map((story) => (
                  <article className="story" key={story.title}>
                    <div className="story-meta">
                      <span className="country">{story.country}</span>
                      <span>{story.date}</span>
                      <span>{story.source}</span>
                    </div>
                    <h3>
                      <a href="#latest">{story.title}</a>
                    </h3>
                    <p>{story.summary}</p>
                    <div className="tag-row">
                      {story.topics.map((topic) => (
                        <Tag key={topic}>{topic}</Tag>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="side-column">
            <section className="side-section" id="events">
              <SectionLabel>Kommende i Norden</SectionLabel>
              <div className="event-list">
                {events.map((event) => (
                  <a className="event" href="#events" key={event.title}>
                    <span className="event-date">
                      <strong>{event.day}</strong>
                      <small>{event.month}</small>
                    </span>
                    <span className="event-info">
                      <strong>{event.title}</strong>
                      <span>{event.place}</span>
                    </span>
                  </a>
                ))}
              </div>
              <a className="text-link" href="#events">
                <Icon name="calendar" size={17} /> Se hele kalenderen
              </a>
            </section>

            <section className="market-card" id="markets">
              <div className="market-heading">
                <div>
                  <p className="eyebrow">Nordiske markeder</p>
                  <h2>Bitcoin</h2>
                </div>
                <span className="positive">+2,4%</span>
              </div>
              <p className="price">
                745.821 <span>NOK</span>
              </p>
              <svg
                className="sparkline"
                viewBox="0 0 300 72"
                role="img"
                aria-label="Bitcoin-kursen er steget"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="currentColor"
                      stopOpacity=".25"
                    />
                    <stop
                      offset="100%"
                      stopColor="currentColor"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <path
                  className="chart-fill"
                  d="M0 62 C25 57, 38 61, 58 46 S88 49, 110 38 S139 44, 163 31 S194 35, 214 18 S247 27, 268 12 S286 10, 300 5 L300 72 L0 72 Z"
                />
                <path
                  className="chart-line"
                  d="M0 62 C25 57, 38 61, 58 46 S88 49, 110 38 S139 44, 163 31 S194 35, 214 18 S247 27, 268 12 S286 10, 300 5"
                />
              </svg>
              <div className="market-footer">
                <span>Gjennomsnitt · 3 børser</span>
                <a href="#markets">
                  Alle priser <Icon name="arrow" size={15} />
                </a>
              </div>
            </section>

            <section className="newsletter" id="newsletter">
              <p className="eyebrow">Hver fredag</p>
              <h2>Nordens viktigste kryptonyheter i innboksen din.</h2>
              <p>
                En ukentlig briefing med redaksjonens utvalgte saker. Ingen
                annonser. Ingen støy.
              </p>
              <form onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="email">E-postadresse</label>
                <div className="input-group">
                  <input
                    id="email"
                    type="email"
                    placeholder="deg@eksempel.no"
                  />
                  <button type="submit" aria-label="Meld på nyhetsbrevet">
                    <Icon name="arrow" />
                  </button>
                </div>
              </form>
              <small>Gratis · Meld av når som helst</small>
            </section>
          </aside>
        </div>
      </main>

      <footer>
        <div className="footer-grid wrap">
          <div className="footer-brand">
            <a className="brand" href="#">
              <img src="/brand/shield-band.svg" alt="" />
              <span>
                Nordic <strong>Crypto</strong>
              </span>
            </a>
            <p>Uavhengige nyheter om bitcoin, blokkjede og krypto i Norden.</p>
          </div>
          <div>
            <p className="footer-title">Utforsk</p>
            <a href="#latest">Nyheter</a>
            <a href="#events">Kalender</a>
            <a href="#markets">Markeder</a>
          </div>
          <div>
            <p className="footer-title">Om os</p>
            <a href="#about">Om Nordic Crypto</a>
            <a href="#ethics">Redaksjonelle prinsipper</a>
            <a href="#contact">Kontakt</a>
          </div>
          <div>
            <p className="footer-title">Følg oss</p>
            <a href="#telegram">Telegram</a>
            <a href="#x">X / Twitter</a>
            <a href="https://github.com/nordic-crypto-org/nordic-crypto">
              Kildekode
            </a>
          </div>
        </div>
        <div className="footer-bottom wrap">
          <span>© 2026 Nordic Crypto</span>
          <span>Ingen informasjonskapsler · Ingen annonsesporing</span>
          <span>MIT-lisens</span>
        </div>
      </footer>
    </div>
  )
}
