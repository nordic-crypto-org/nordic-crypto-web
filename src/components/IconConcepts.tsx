type Concept = {
  id: string
  name: string
  description: string
  mark: React.ReactNode
}

const concepts: Concept[] = [
  {
    id: "01",
    name: "Nordmerket",
    description:
      "Eit forenkla skjold med ein tydeleg N. Nærast dagens identitet, men langt meir leseleg i små storleikar.",
    mark: (
      <>
        <path
          className="mark-primary"
          d="M12 7h40v22c0 14-8.4 23.4-20 29C20.4 52.4 12 43 12 29V7Z"
        />
        <path
          className="mark-accent"
          d="M21 42V20h6l10 13V20h6v22h-6L27 29v13h-6Z"
        />
      </>
    ),
  },
  {
    id: "02",
    name: "Polar",
    description:
      "Eit nordisk kompass med éi markert nordretning. Redaksjonelt, geografisk og utan generiske kryptosymbol.",
    mark: (
      <>
        <circle className="mark-primary" cx="32" cy="32" r="25" />
        <path
          className="mark-cutout"
          d="m32 13 6 14 13 5-13 5-6 14-6-14-13-5 13-5 6-14Z"
        />
        <path className="mark-accent" d="m32 13 6 14-6 5-6-5 6-14Z" />
      </>
    ),
  },
  {
    id: "03",
    name: "Nordisk knute",
    description:
      "N og C fletta saman i eitt monogram. Mest teknologisk, men framleis mjukt og institusjonelt.",
    mark: (
      <>
        <path
          className="mark-primary mark-stroke"
          d="M46 18a21 21 0 1 0 0 28"
        />
        <path
          className="mark-accent mark-stroke"
          d="M21 44V20l22 24V20"
        />
      </>
    ),
  },
  {
    id: "04",
    name: "Fem land",
    description:
      "Fem band samla til eitt merke. Kvart band står for eitt nordisk land og møtest i ein felles retning.",
    mark: (
      <>
        <path
          className="mark-primary"
          d="M9 14h8v25l15 11v9L9 43V14Zm12 0h8v19l3 2v10l-11-8V14Zm34 0h-8v25L32 50v9l23-16V14Zm-12 0h-8v19l-3 2v10l11-8V14Z"
        />
        <path className="mark-accent" d="M28 9h8v21l-4 3-4-3V9Z" />
      </>
    ),
  },
  {
    id: "05",
    name: "Signal",
    description:
      "Ei stigande signallinje inne i eit ope våpenskjold. Uttrykkjer oversikt, marknad og framdrift.",
    mark: (
      <>
        <path
          className="mark-primary mark-stroke"
          d="M13 9h38v20c0 13-7.6 22-19 28-11.4-6-19-15-19-28V9Z"
        />
        <path
          className="mark-accent mark-stroke"
          d="m20 38 8-9 7 6 10-13"
        />
        <path className="mark-accent" d="m40 20 7-1-1 7-6-6Z" />
      </>
    ),
  },
]

function Mark({
  concept,
  sizeClass,
}: {
  concept: Concept
  sizeClass: string
}) {
  return (
    <svg
      className={`concept-mark ${sizeClass}`}
      viewBox="0 0 64 64"
      role="img"
      aria-label={concept.name}
    >
      {concept.mark}
    </svg>
  )
}

export default function IconConcepts() {
  return (
    <section className="icon-concepts wrap" aria-labelledby="icon-concepts-title">
      <div className="concept-intro">
        <p className="eyebrow">Identitetsstudie · fem retningar</p>
        <h2 id="icon-concepts-title">Nytt merke for Nordic Crypto</h2>
        <p>
          Alle forslaga er teikna for å fungere frå 16 pikslar til appikon.
          North Sea og Shield Gold knyter dei til den eksisterande identiteten.
        </p>
      </div>

      <div className="concept-grid">
        {concepts.map((concept) => (
          <article className="concept-card" key={concept.id}>
            <div className="concept-number">{concept.id}</div>
            <div className="concept-stage">
              <Mark concept={concept} sizeClass="mark-large" />
            </div>
            <div className="concept-copy">
              <h3>{concept.name}</h3>
              <p>{concept.description}</p>
            </div>
            <div className="scale-test" aria-label="Storleikstest">
              <span>
                <Mark concept={concept} sizeClass="mark-16" />
                <small>16</small>
              </span>
              <span>
                <Mark concept={concept} sizeClass="mark-32" />
                <small>32</small>
              </span>
              <span>
                <Mark concept={concept} sizeClass="mark-64" />
                <small>64</small>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
