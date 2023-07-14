import { Platform } from '@angular/cdk/platform';
import { Location } from '@angular/common';
import { jest } from '@jest/globals';

export const createMockLocation = (): Location => ({
    back: jest.fn(),
    forward: jest.fn(),
    getState: jest.fn(),
    go: jest.fn(),
    historyGo: jest.fn(),
    isCurrentPathEqualTo: jest.fn<typeof Boolean>(),
    ngOnDestroy: jest.fn(),
    normalize: jest.fn<typeof String>(),
    onUrlChange: jest.fn<never>(),
    path: jest.fn<typeof String>(),
    prepareExternalUrl: jest.fn<typeof String>(),
    replaceState: jest.fn(),
    subscribe: jest.fn<never>(),
});

export const mockPlatform: Platform = {
    ANDROID: false,
    BLINK: false,
    EDGE: false,
    FIREFOX: false,
    IOS: false,
    isBrowser: true,
    SAFARI: false,
    TRIDENT: false,
    WEBKIT: false,
} as Platform;

export const mockLocation: Location = createMockLocation();
