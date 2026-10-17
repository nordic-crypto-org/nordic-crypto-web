import { SITE_BASE } from "../lib/api"
import {
  formatDate,
  storySummary,
  storyTitle,
  topicNames,
} from "../lib/format"
import type { Story } from "../lib/types"
import Icon from "./Icon"
import SectionLabel from "./SectionLabel"

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>
}

export default function StoryFeed({ stories }: { stories: Story[] }) {
  const leadStory = stories[0]
  if (!leadStory) return null

  return (
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
            href={`${SITE_BASE}/stories/${leadStory.id}/`}
            target="_blank"
            rel="noreferrer"
          >
            Les saka <Icon name="arrow" size={17} />
          </a>
        </div>
      </article>

      <section className="latest" id="latest">
        <SectionLabel action="Sjå alle nyheiter" actionHref={`${SITE_BASE}/`}>
          Siste nytt
        </SectionLabel>
        <div className="story-list">
          {stories.slice(1).map((story) => (
            <article className="story" key={story.id}>
              <div className="story-meta">
                <span className="country">{story.country}</span>
                <span>{formatDate(story.published)}</span>
                <span>{story.source_name}</span>
              </div>
              <h3>
                <a
                  href={`${SITE_BASE}/stories/${story.id}/`}
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
  )
}
