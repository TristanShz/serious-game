/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./resources/**/*.{js,ts,jsx,tsx}", "./_common/**/*.{ts,tsx,js,jsx}"],
  theme: {
    fontFamily: {
      montserrat: "Montserrat, Inter, Arial, sans-serif",
      gilroy: "Gilroy, Inter, Arial, sans-serif",
      inter: "Inter, Montserrat, sans-serif"
    },
    extend: {
      height: {
        0.3: ".3px",
        0.2: ".2px",
        0.4: ".4px"
      },
      width: {
        0.3: ".3px",
        0.2: ".2px",
        0.4: ".4px"
      },
      fontSize: {
        xxs: "7.5px"
      },
      scale: {
        98: "0.98",
        102: "1.02"
      },
      colors: {
        background: {
          DEFAULT: "#F0E9DF",
          border: "#CDB39B"
        },
        primary: {
          light: "#FF9543",
          DEFAULT: "#FF7001",
          dark: "#FF5B31"
        },
        secondary: {
          light: "#E56F3F",
          DEFAULT: "#E84B0C",
          dark: ""
        },
        neutral: {
          DEFAULT: "#041937",
          95: "#102441",
          90: "#1d304b",
          75: "#435269",
          50: "#818c9b",
          25: "#c0c5cd",
          10: "#e6e8eb",
          5: "#F3F4F5"
        },
        quizz: {
          background: "#F7F4EF",
          title: {
            DEFAULT: "#BA8B5B",
            light: "#CDB39B"
          },
          question: {
            DEFAULT: "#F0E9DF",
            selected: "#d5c0b0",
            border: "#CDB39B"
          },
          answer: {
            true: {
              DEFAULT: "#D8E4BE",
              darker: "#426113"
            },
            false: {
              DEFAULT: "#E3775C",
              darker: "#84402F"
            }
          }
        },
        input: {
          correct: "#A6D55E",
          error: "#E3775C",
          border: "#B4B9D5",
          focus: "#FF7001"
        }
      }
    }
  },
  plugins: []
};
