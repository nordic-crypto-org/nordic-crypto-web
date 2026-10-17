import type { ReactNode } from "react"
import Icon from "./Icon"

export default function SectionLabel({
  children,
  action,
  actionHref = "#latest",
}: {
  children: ReactNode
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
