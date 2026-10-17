import { useEffect, useState } from "react"

type IconName = "arrow" | "calendar" | "chevron" | "globe" | "menu" | "moon" | "sun"

type Story = {
  id: string
  country: string
  published: string
  source_name: string
  title: string
  title_en?: string | null
  title_i18n?: Record<string, string>
  summary?: string
  summary_i18n?: Record<string, string>
  topics: string[]
  language_code?: string
}

type NordicEvent = {
  id: string
  title: string
  start: string
  city?: string | null
  country: string
  online?: boolean
  html_urls?: Record<string, string>
}

type Market = {
  price: string
  min: string
  max: string
  exchange_count: number
  updated_at: string
}

const API = "https://nordiccrypto.no/api/v1"
const SITE = "https://nordiccrypto.no/nn"

const fallbackStories: Story[] = [
  {
    id: "2cb0ee76f54a",
    country: "NO",
    published: "2026-10-16T10:24:41+00:00",
    source_name: "Ságat",
    title: "Avviser krypto-på-kammerset-påstand",
    summary:
      "Bransjeorganisasjonen Norsk Datasenter Industri avviser at kryptoutvinning er ein vanleg måte å starte opp i datasenterbransjen på.",
    topics: ["mining", "policy"],
    language_code: "no",
  },
]

const topicNames: Record<string, string> = {
  banking: "Bank",
  bitcoin: "Bitcoin",
  business: "Næringsliv",
  crime: "Kriminalitet",
  mica: "MiCA",
  mining: "Utvinning",
  policy: "Politikk",
  regulation: "Regulering",
  stablecoins: "Stablecoins",
  tax: "Skatt",
  tokenisation: "Tokenisering",
}

function storyTitle(story: Story) {
  return (
    story.title_i18n?.nn ||
    (story.language_code === "no" ? story.title : story.title_en) ||
    story.title
  )
}

function storySummary(story: Story) {
  return story.summary_i18n?.nn || story.summary || ""
}

function formatDate(value: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("nn-NO", options || {
    day: "numeric",
    month: "long",
  }).format(new Date(value))
}

function formatPrice(value: string) {
  return new Intl.NumberFormat("nn-NO", {
    maximumFractionDigits: 0,
  }).format(Number(value))
}

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
  actionHref = "#latest",
}: {
  children: React.ReactNode
  action?: string
  actionHref?: string
}) {
  return (
    <div className="section-label">
      <span>{children}</span>
      <span className="section-line" />
      {action && (
        <a className="section-action" href={actionHref}>
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
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("nc-theme") === "dark",
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [stories, setStories] = useState<Story[]>(fallbackStories)
  const [events, setEvents] = useState<NordicEvent[]>([])
  const [market, setMarket] = useState<Market | null>(null)
  const [updated, setUpdated] = useState<string | null>(null)
  const [dataError, setDataError] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light"
    document.documentElement.lang = "nn"
    localStorage.setItem("nc-theme", darkMode ? "dark" : "light")
  }, [darkMode])

  useEffect(() => {
    async function loadHomepage() {
      try {
        const [newsResponse, eventsResponse, marketsResponse] =
          await Promise.all([
            fetch(`${API}/news/latest.json`),
            fetch(`${API}/events/upcoming.json`),
            fetch(`${API}/markets/aggregated.json`),
          ])

        if (!newsResponse.ok || !eventsResponse.ok || !marketsResponse.ok) {
          throw new Error("Eitt eller fleire endepunkt svarte ikkje")
        }

        const news = await newsResponse.json()
        const eventData = await eventsResponse.json()
        const marketData = await marketsResponse.json()
        const latest = (news.items as Story[]).slice(0, 5)

        const detailedStories = await Promise.all(
          latest.map(async (story) => {
            try {
              const response = await fetch(`${API}/news/${story.id}.json`)
              if (!response.ok) return story
              const detail = await response.json()
              return detail.item || detail
            } catch {
              return story
            }
          }),
        )

        setStories(detailedStories)
        setEvents((eventData.events as NordicEvent[]).slice(0, 3))
        setMarket(
          marketData.pairs.find(
            (pair: { symbol: string }) => pair.symbol === "BTC-NOK",
          ) || null,
        )
        setUpdated(news.updated || news.generated_at || null)
      } catch {
        setDataError(true)
      }
    }

    loadHomepage()
  }, [])

  const leadStory = stories[0]
  const latestStories = stories.slice(1)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-top wrap">
          <a className="brand" href={`${SITE}/`} aria-label="Nordic Crypto framside">
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
              onClick={() => setDarkMode((mode) => !mode)}
              aria-label={
                darkMode ? "Byt til lyst tema" : "Byt til mørkt tema"
              }
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
              onClick={() => setMenuOpen((open) => !open)}
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
            <a className="active" href={`${SITE}/`}>
              Nyheiter
            </a>
            <a href={`${SITE}/calendar/`}>Kalender</a>
            <a href={`${SITE}/newsletter/`}>Nyheitsbrev</a>
            <a href={`${SITE}/markets/`}>Marknader</a>
            <a href={`${SITE}/org-chart/`}>Kven er kven</a>
            <a href={`${SITE}/academia/`}>Akademia</a>
          </nav>
        </div>
      </header>

      <main>
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
                    ? `Oppdatert ${formatDate(updated, { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}`
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
                <a href="#latest" key={country}>
                  {country}
                </a>
              ))}
            </div>
            <p>
              <strong>5 land</strong>
              <span>Opne data</span>
              <span>Oppdatert fortløpande</span>
            </p>
          </div>
        </div>

        <div className="content-grid wrap">
          <div className="news-column">
            <article className="lead-story">
              <div className="lead-kicker">
                <span className="country">{leadStory.country}</span>
                <span>
                  {leadStory.topics
                    .slice(0, 2)
                    .map((topic) => topicNames[topic] || topic)
                    .join(" & ")}
                </span>
                <span className="live-dot" />
                <span>Siste sak</span>
              </div>
              <h2>{storyTitle(leadStory)}</h2>
              <p>{storySummary(leadStory)}</p>
              <div className="lead-meta">
                <span>
                  Kjelde: <strong>{leadStory.source_name}</strong>
                </span>
                <span>{formatDate(leadStory.published)}</span>
                <a
                  href={`${SITE}/stories/${leadStory.id}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Les saka <Icon name="arrow" size={17} />
                </a>
              </div>
            </article>

            <section className="latest" id="latest">
              <SectionLabel action="Sjå alle nyheiter" actionHref={`${SITE}/`}>
                Siste nytt
              </SectionLabel>
              <div className="story-list">
                {latestStories.map((story) => (
                  <article className="story" key={story.title}>
                    <div className="story-meta">
                      <span className="country">{story.country}</span>
                      <span>{formatDate(story.published)}</span>
                      <span>{story.source_name}</span>
                    </div>
                    <h3>
                      <a
                        href={`${SITE}/stories/${story.id}/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {storyTitle(story)}
                      </a>
                    </h3>
                    {storySummary(story) && <p>{storySummary(story)}</p>}
                    <div className="tag-row">
                      {story.topics.map((topic) => (
                        <Tag key={topic}>{topicNames[topic] || topic}</Tag>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="side-column">
            <section className="side-section" id="events">
              <SectionLabel>Dette skjer i Norden</SectionLabel>
              <div className="event-list">
                {events.map((event) => (
                  <a
                    className="event"
                    href={event.html_urls?.nn || event.html_urls?.en || `${SITE}/calendar/`}
                    target="_blank"
                    rel="noreferrer"
                    key={event.id}
                  >
                    <span className="event-date">
                      <strong>
                        {formatDate(event.start, { day: "2-digit" })}
                      </strong>
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
                {!events.length && (
                  <p className="loading-note">Hentar arrangement…</p>
                )}
              </div>
              <a className="text-link" href={`${SITE}/calendar/`}>
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
                <span>
                  Gjennomsnitt · {market?.exchange_count || "—"} børsar
                </span>
                <a href={`${SITE}/markets/`}>
                  Alle prisar <Icon name="arrow" size={15} />
                </a>
              </div>
            </section>

            <section className="newsletter" id="newsletter">
              <p className="eyebrow">Kvar fredag</p>
              <h2>Dei viktigaste kryptonyheitene i Norden i innboksen din.</h2>
              <p>
                Ei vekentleg oppsummering med dei utvalde sakene til
                redaksjonen. Ingen annonsar. Ingen støy.
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
                    Eg samtykkjer til at Nordic Crypto lagrar adressa og sender
                    meg nyheitsbrevet.
                  </span>
                </label>
              </form>
              <small>Gratis · Meld deg av når som helst</small>
            </section>
          </aside>
        </div>
      </main>

      <footer>
        <div className="footer-grid wrap">
          <div className="footer-brand">
            <a className="brand" href={`${SITE}/`}>
              <img src="/brand/shield-band.svg" alt="" />
              <span>
                Nordic <strong>Crypto</strong>
              </span>
            </a>
            <p>Uavhengige nyheiter om bitcoin, blokkjede og krypto i Norden.</p>
          </div>
          <div>
            <p className="footer-title">Utforsk</p>
            <a href={`${SITE}/`}>Nyheiter</a>
            <a href={`${SITE}/calendar/`}>Kalender</a>
            <a href={`${SITE}/markets/`}>Marknader</a>
          </div>
          <div>
            <p className="footer-title">Om oss</p>
            <a href={`${SITE}/about/`}>Om Nordic Crypto</a>
            <a href={`${SITE}/ethics/`}>Redaksjonelle prinsipp</a>
            <a href={`${SITE}/contact/`}>Kontakt</a>
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
    </div>
  )
}
