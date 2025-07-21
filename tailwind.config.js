/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-pink": "#ffc6ff",
      },
      boxShadow: {
        custom: "0 4px 8px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
