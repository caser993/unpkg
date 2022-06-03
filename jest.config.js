module.exports = {
  moduleNameMapper: {
    '\\.css$': '<rootDir>/modules/__mocks__/styleMock.js',
    '\\.png$': '<rootDir>/modules/__mocks__/imageMock.js',
    'entry-manifest': '<rootDir>/modules/__mocks__/entryManifest.js',
    'getStats\\.js': '<rootDir>/modules/__mocks__/getStatsMock.js',
    'utils\\/npm\\.js': '<rootDir>/modules/__mocks__/npmMock.js'
  },
  testMatch: ['**/__tests__/*-test.js'],

  // agorbatchev: some dependencies are now ESM modules and I couldn't jest to work with `babel-jest`
  preset: `ts-jest`,
  transformIgnorePatterns: ['/node_modules/(?!(pretty-bytes))'],
  transform: {
    '\\.js$': 'ts-jest',
  }
};
