export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts$': ['@swc/jest'],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};