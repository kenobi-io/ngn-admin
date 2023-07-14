/* eslint-disable */
export default {
    displayName: 'bff',
    preset: '../../../jest.preset.js',
    // globals: {
    //     'ts-jest': {
    //         tsconfig: '<rootDir>/tsconfig.spec.json',
    //     },
    // },
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.spec.json' },
        ],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    // coverageDirectory: '../../../coverage/lcov-report/apps/apis/bff',
};
