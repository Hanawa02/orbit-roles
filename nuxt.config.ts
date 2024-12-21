import { paraglide } from "@inlang/paraglide-vite";
import { fileURLToPath, URL } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
  ],
  supabase: {
    redirectOptions: {
      login: "/auth/login",
      callback: "/auth/confirm",
      include: undefined,
      exclude: ["/auth/login", "/auth/signup"],
      cookieRedirect: true,
    },
    cookieName: process.env.SUPABASE_COOKIE_NAME,
  },
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
        cookieName: process.env.SUPABASE_COOKIE_NAME,
      },
    },
  },
  alias: {
    translations: "./src/i18n/generated/messages.js",
  },
  vite: {
    plugins: [
      paraglide({
        project: "./project.inlang",
        outdir: "./src/i18n/generated",
      }),
    ],
  },
});
