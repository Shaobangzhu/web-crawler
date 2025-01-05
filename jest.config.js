module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"], // Specify where test files are located
  moduleDirectories: ["node_modules", "src"], // Allow importing from src
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1", // Alias for src
  },
};
