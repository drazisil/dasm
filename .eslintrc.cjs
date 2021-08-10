module.exports = {
  parserOptions: {
    sourceType: "module"
  },
  env: {
    es2020: true,
    node: true,
    jest: true
  },
  extends: ["plugin:prettier/recommended"],
  parser: "@babel/eslint-parser"
}