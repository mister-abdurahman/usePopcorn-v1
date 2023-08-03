/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        secondary: "#212529",
        secondary_light: "#2b3035",
        secondary_lighter: "#343a40",
        primary: "#6741d9",
        primary_light: "#7950f2",
      },
    },
  },
  plugins: [],
};
