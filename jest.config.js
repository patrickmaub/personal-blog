module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Use jsdom for browser-like environment
  roots: ['<rootDir>/src'], // Look for tests in src
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for TypeScript files
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Run this file after the test framework is installed in the environment
  moduleNameMapper: {
    // Handle CSS imports (if any are treated as modules)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    // Handle module path aliases
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock contentlayer/generated
    '^contentlayer/generated$': '<rootDir>/src/__mocks__/contentlayer/generated.ts'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json', // Use a separate tsconfig for tests if needed, or the main one
    },
  },
  // collectCoverage: true, // Optionally enable coverage reports
  // coverageDirectory: "coverage",
  // coverageReporters: ["json", "lcov", "text", "clover"],
};
