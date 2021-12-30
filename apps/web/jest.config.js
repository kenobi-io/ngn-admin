// module.exports = {
//   displayName: 'web',
//   preset: '../../jest.preset.js',
//   setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
//   globals: {
//     'ts-jest': {
//       stringifyContentPathRegex: '\\.(html|svg)$',

//       tsconfig: '<rootDir>/tsconfig.spec.json',
//     },
//   },
//   coverageDirectory: '../../coverage/apps/web',
//   snapshotSerializers: [
//     'jest-preset-angular/build/serializers/no-ng-attributes',
//     'jest-preset-angular/build/serializers/ng-snapshot',
//     'jest-preset-angular/build/serializers/html-comment',
//   ],
//   transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
// };

module.exports = {
  displayName: 'web',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { cwd: __dirname }],
  },
  transformIgnorePatterns: ['node_modules/(?!(@asyncapi)/)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/web',
};
