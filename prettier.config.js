/** @type {import('prettier').Config} */
const config = {
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'none',
  semi: false,
  tabWidth: 2,
  printWidth: 80,
  plugins: ['prettier-plugin-sort-json']
}
export default config
