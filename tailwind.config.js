/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        persona: {
          blue: {
            DEFAULT: "#00d2ff",
            light: "#63e6ff",
            dark: "#0055b3",
            abyss: "#040b18",
          },
          red: {
            DEFAULT: "#e60012",
            bright: "#ff1e38",
            dark: "#800008",
          },
          yellow: {
            DEFAULT: "#ffe600",
            amber: "#ff9900",
          },
          dark: "#07070a",
          panel: "#0d111d",
          border: "#1f293d",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Outfit"', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
