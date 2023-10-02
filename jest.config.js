require('dotenv').config({ path: '.env.testing' });

module.exports = {
  // The root of your project directory (where your package.json is located)
  rootDir: './',

  // A list of directories that Jest should search for tests in
  // In this case, all test files are located in the 'test' directory
  testMatch: ['<rootDir>/test/**/*.test.ts'],

  // Transform TypeScript files using ts-jest
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  // If you're using ES6 modules in your tests, set the module system to 'node'
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],

  // A list of setup files to run before running your tests
  // Include your setup/test file here
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],

  // Optional: Specify other testing libraries or custom reporters
  // setupFilesAfterEnv: ['jest-extended', 'jest-stare'],

  // Optional: Configure code coverage reporting
  // You can customize the coverageDirectory and collectCoverageFrom options
  // to match your project's needs
  // collectCoverage: true,
  // coverageDirectory: '<rootDir>/coverage',
  // collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

  // Optional: Specify environment variables for your tests
  // You can set environment variables specifically for your tests here
  // For example, you can use this to set NODE_ENV to 'testing'
  // setupFiles: ['<rootDir>/test/setupTests.ts'],
  testEnvironment: 'node',
  
};

