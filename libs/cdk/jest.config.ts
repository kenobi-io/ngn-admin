/* eslint-disable */
export default {
    displayName: 'cdk',
    preset: '../../jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
    // coverageDirectory: '../../coverage/lcov-report/libs/cdk',
    transform: {
        '^.+\\.(ts|mjs|js|html|svg)$': 'jest-preset-angular',
        // '^.+\\.[tj]s$': [
        //     'ts-jest',
        //     {
        //         tsconfig: '<rootDir>/tsconfig.spec.json',
        //         stringifyContentPathRegex: '\\.(html|svg)$',
        //     },
        // ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
};
