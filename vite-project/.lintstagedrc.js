module.exports = {
  "*.{js,ts,tsx}": [
    "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "prettier --write --ignore-path .gitignore .",
  ],
};
