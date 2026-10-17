import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

export default defineConfig({
  integrations: [react()],
  output: "static",
  server: {
    host: process.env.FIGMA_DEV_SERVER_HOST || "0.0.0.0",
    port: Number(process.env.PORT || 8443),
  },
  preview: {
    host: process.env.FIGMA_DEV_SERVER_HOST || "0.0.0.0",
    port: Number(process.env.PORT || 8443),
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
  },
})
