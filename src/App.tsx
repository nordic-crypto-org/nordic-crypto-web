import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Sidebar from "./components/Sidebar"
import StoryFeed from "./components/StoryFeed"
import { fallbackHomepageData, getHomepageData } from "./lib/api"
import type { HomepageData } from "./lib/types"

export default function App({
  initialData = fallbackHomepageData,
}: {
  initialData?: HomepageData
}) {
  const [darkMode, setDarkMode] = useState(false)
  const [themeReady, setThemeReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [data, setData] = useState<HomepageData>(
    initialData.stories.length > 0 ? initialData : fallbackHomepageData,
  )
  const [dataError, setDataError] = useState(false)

  useEffect(() => {
    setDarkMode(localStorage.getItem("nc-theme") === "dark")
    setThemeReady(true)
  }, [])

  useEffect(() => {
    if (!themeReady) return
    document.documentElement.dataset.theme = darkMode ? "dark" : "light"
    document.documentElement.lang = "nn"
    localStorage.setItem("nc-theme", darkMode ? "dark" : "light")
  }, [darkMode, themeReady])

  useEffect(() => {
    getHomepageData()
      .then((homepage) => {
        setData(homepage)
        setDataError(false)
      })
      .catch(() => setDataError(true))
  }, [])

  return (
    <div className="app-shell">
      <Header
        darkMode={darkMode}
        menuOpen={menuOpen}
        onThemeToggle={() => setDarkMode((mode) => !mode)}
        onMenuToggle={() => setMenuOpen((open) => !open)}
      />
      <main>
        <Hero updated={data.updated} dataError={dataError} />
        <div className="content-grid wrap">
          <StoryFeed stories={data.stories} />
          <Sidebar events={data.events} market={data.market} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
