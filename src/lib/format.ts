import type { Story } from "./types"

export const topicNames: Record<string, string> = {
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

export function storyTitle(story: Story) {
  return (
    story.title_i18n?.nn ||
    (story.language_code === "no" ? story.title : story.title_en) ||
    story.title
  )
}

export function storySummary(story: Story) {
  return story.summary_i18n?.nn || story.summary || ""
}

export function formatDate(
  value: string,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat("nn-NO", {
    timeZone: "Europe/Oslo",
    ...(options || {
      day: "numeric",
      month: "long",
    }),
  }).format(new Date(value))
}

export function formatPrice(value: string) {
  return new Intl.NumberFormat("nn-NO", {
    maximumFractionDigits: 0,
  }).format(Number(value))
}
