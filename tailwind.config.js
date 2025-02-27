/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6A31F6", // 포인트 색상 (보라색)
        lightGray: "#F5F5F5", // 배경 색상
        darkGray: "#282828", // 다크 테마 배경 색상
        black: "#000000" // 기본 검은색
      },
      boxShadow: {
        custom: "4px 12px 20px #F0ECF8"
      },
      borderRadius: {
        button: "4px"
      },
      fontFamily: {
        Roboto: ["var(--font-Roboto)"]
      }
    }
  },
  plugins: []
};
