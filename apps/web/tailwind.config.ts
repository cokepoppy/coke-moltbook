import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"]
      },
      colors: {
        google: {
          blue: "#1a73e8",
          red: "#ea4335",
          yellow: "#fbbc04",
          green: "#34a853",
          gray: "#f1f3f4",
          text: "#202124",
          subtext: "#5f6368"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
