/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1a1a1c",
          muted: "#5c5c61",
          faint: "#8e8e93",
        },
        surface: {
          DEFAULT: "#ffffff",
          soft: "#f5f5f4",
          card: "#fafaf9",
        },
        btc: {
          DEFAULT: "#f7931a",
          deep: "#e8850f",
          glow: "#fff4e8",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.04)",
        lift: "0 8px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
