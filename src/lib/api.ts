import type { HomepageData, Market, NordicEvent, Story } from "./types"

export const API_BASE = "https://nordiccrypto.no/api/v1"
export const SITE_BASE = "https://nordiccrypto.no/nn"

const fallbackStory: Story = {
  id: "2cb0ee76f54a",
  country: "NO",
  published: "2026-10-16T10:24:41+00:00",
  source_name: "Ságat",
  title: "Avviser krypto-på-kammerset-påstand",
  summary:
    "Bransjeorganisasjonen Norsk Datasenter Industri avviser at kryptoutvinning er ein vanleg måte å starte opp i datasenterbransjen på.",
  topics: ["mining", "policy"],
  language_code: "no",
}

export const fallbackHomepageData: HomepageData = {
  stories: [fallbackStory],
  events: [],
  market: null,
  updated: null,
}

async function fetchJson<T>(url: string, timeout = 8000): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok) {
      throw new Error(`${response.status} from ${url}`)
    }
    return (await response.json()) as T
  } finally {
    clearTimeout(timer)
  }
}

export async function getHomepageData(): Promise<HomepageData> {
  const [news, eventData, marketData] = await Promise.all([
    fetchJson<{ items: Story[]; updated?: string; generated_at?: string }>(
      `${API_BASE}/news/latest.json`,
    ),
    fetchJson<{ events: NordicEvent[] }>(`${API_BASE}/events/upcoming.json`),
    fetchJson<{ pairs: Market[] }>(`${API_BASE}/markets/aggregated.json`),
  ])

  const latest = news.items.slice(0, 5)
  const stories = await Promise.all(
    latest.map(async (story) => {
      try {
        const detail = await fetchJson<Story | { item: Story }>(
          `${API_BASE}/news/${story.id}.json`,
        )
        return "item" in detail ? detail.item : detail
      } catch {
        return story
      }
    }),
  )

  return {
    stories: stories.length > 0 ? stories : fallbackHomepageData.stories,
    events: eventData.events.slice(0, 3),
    market:
      marketData.pairs.find((pair) => pair.symbol === "BTC-NOK") || null,
    updated: news.updated || news.generated_at || null,
  }
}
