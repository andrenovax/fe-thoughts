module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '.*\\.(css)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testRegex: 'tests/.*\\.spec\\.(ts|tsx)$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/'],
};
