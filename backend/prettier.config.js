/** @type {import('prettier').Config} */
export default {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^express$",
    "<THIRD_PARTY_MODULES>",
    "^@/utils/(.*)$",
    "^@/middlewares/(.*)$",
    "^@/models/(.*)$",
    "^@/routes/(.*)$",
    "^@/services/(.*)$",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "decorators-legacy"],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
}
