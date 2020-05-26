module.exports = {
    verbose: true,
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$",
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    collectCoverageFrom: [
      "src/**/*.ts",
      "!src/api/index.ts",
      "!src/core/migrations/**",
      "!src/core/database/**",
      "!**/node_modules/**",
      "!**/dist/**"
    ]
  }