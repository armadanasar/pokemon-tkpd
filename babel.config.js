module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: ["graphql-tag"],
  env: {
    production: {
      plugins: ["jsx-remove-data-test-id"],
    },
  },
};
