// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './', // This is the root directory of your project
    testRegex: '.*\\.spec\\.ts$', // Matches test files ending with .spec.ts
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest', // Transforms TypeScript files using ts-jest
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.(t|j)s'],
    coverageDirectory: './coverage',
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1', // Maps src/ path correctly
    },
    testEnvironment: 'node',
};

export default config;
