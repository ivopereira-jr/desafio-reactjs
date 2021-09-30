module.exports = {
  testPathIgnorePatterns: ["/node_modules"],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.js"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: { // estilos instalar a dependencia identity-obj-proxy -D
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  // Coverage report relatorio dos testes
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/**/*.spec.js",
    "!src/**/*App.js"
  ],
  coverageReporters: ["lcov", "json"]
}
