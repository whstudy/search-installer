module.exports = {
  testURL: 'http://localhost:8000',
  testEnvironment: './tests/PuppeteerEnvironment',
  verbose: true,
  setupFilesAfterEnv: ['./tests/setupTests.js'],
  globals: {
    localStorage: null,
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@@/(.*)$': '<rootDir>/src/.umi/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
  },
};
