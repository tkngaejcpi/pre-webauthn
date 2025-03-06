/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],

  trailingComma: "all",
  semi: true,
  singleQuote: true,

  useTabs: true,
  tabWidth: 2,

  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
