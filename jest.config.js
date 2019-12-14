module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**", "!**/vendor/**", ],
  reporters: ["default", "jest-junit"]
};
