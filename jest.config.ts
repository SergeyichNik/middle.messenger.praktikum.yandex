module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^./style.css$': 'identity-obj-proxy',
    '^components': '<rootDir>/src/components',
    '^core': '<rootDir>/src/core',
    '^store': '<rootDir>/src',
    '^pages': '<rootDir>/src/pages',
    '^utils': '<rootDir>/src/utils/$1',
    '^assets': '<rootDir>/src/assets',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
