export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['@swc/jest'],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};