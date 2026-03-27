/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D1EAE3", // Soft teal
        secondary: "#FAD9C1", // Peach/Beige
        accent: "#1A1A1A", // Dark for text/buttons
        background: "#FDF6F0", // Main cream background
        surface: "#FFFFFF",
        muted: "#9D9D9D",
        purple: "#E1DFFF",
        olive: "#9BA478",
        blue: "#93B5D1",
      },
      borderRadius: {
        "3xl": "30px",
        "4xl": "40px",
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
}
