export type Story = {
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

export type NordicEvent = {
  id: string
  title: string
  start: string
  city?: string | null
  country: string
  online?: boolean
  html_urls?: Record<string, string>
}

export type Market = {
  symbol?: string
  price: string
  min: string
  max: string
  exchange_count: number
  updated_at: string
}

export type HomepageData = {
  stories: Story[]
  events: NordicEvent[]
  market: Market | null
  updated: string | null
}
