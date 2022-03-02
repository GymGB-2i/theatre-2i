module.exports = {
  content: [
    "./pages/**/*.{js, jsx, ts, tsx}",
    "./components/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      aspectRatio: {
        "1/2": "3 / 2",
      },
      width: {
        "128": "32rem",
        "256": "64rem",
      },
      maxWidth: {
        "128": "32rem",
        "256": "64rem",
      },
      maxHeight: {
        "128": "32rem",
        "320": "50rem",
        "256": "64rem",
      },
      height: {
        "128": "32rem",
        "320": "50rem",
        "256": "64rem",
      }
    },
    fontFamily: {
      'display-sans': ['Degular', 'Epilogue', 'Inter', 'system-ui', 'sans-serif', 'sans'],
      'text-sans': ['Neue Haas Grotesk Text', 'neue-haas-grotesk-text', 'Inter', 'system-ui', 'sans-serif', 'sans'],
    }
  },
  plugins: [],
}
