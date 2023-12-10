/** @type {import("prettier").Config} */
module.exports = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],

  // @trivago/prettier-plugin-sort-imports
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(react-dom/(.*)$)|^(react-dom$)",
    "<THIRD_PARTY_MODULES>",
    "^types$",
    "^@/assets/(.*)$",
    "^@/api/(.*)$",
    "^@/schema/(.*)$",
    "^@/component/(.*)$",
    "^[./]",
  ],
};
