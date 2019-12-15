module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**", "!**/vendor/**" ],
    coveragePathIgnorePatterns: ["/node_modules/", "src/@types"],
    reporters: ["default", "jest-junit"]
};
