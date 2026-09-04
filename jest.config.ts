import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
   '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/*.test.js',
  ],
};

export default createJestConfig(config);
