import nextJest from 'next/jest.js';

import type { Config } from 'jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  // setupFiles: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
