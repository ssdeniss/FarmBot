module.exports = {
  contextSeparator: '.',
  createOldCatalogs: true,

  keepRemoved: true,
  keySeparator: '.',
  defaultValue: '',
  indentation: 2,

  namespaceSeparator: false,
  defaultNamespace: 'default',

  lexers: {
    js: ['JavascriptLexer'],
    jsx: ['JsxLexer'],
    default: ['JavascriptLexer'],
  },

  lineEnding: 'auto',

  locales: ['ro'],

  output: 'public/locales/$LOCALE.json',

  input: ['src/**/*.js', 'src/**/*.jsx'],

  sort: true,

  skipDefaultValues: false,

  verbose: true,
  failOnWarnings: false,
};
