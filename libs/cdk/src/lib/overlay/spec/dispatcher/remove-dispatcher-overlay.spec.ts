/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, jest } from '@jest/globals';

import { DetachDispatcherOverlay } from '../../data';
import { removeDispatcherOverlay } from '../../interactions';
import { createMockOverlay, paramsCreateMockOverlay } from '../overlay.fixture';

describe('removeDispatcherOverlay', () => {
    it('[removeDispatcherOverlay] should remove an overlay from the attached overlays', () => {
        const mockOverlay: any = createMockOverlay(
            paramsCreateMockOverlay as any
        );
        const detachMock: DetachDispatcherOverlay = jest.fn() as any;
        const result = removeDispatcherOverlay(detachMock)({
            overlay: mockOverlay,
        });
        // Verify that the detach function was called
        expect(detachMock).toHaveBeenCalledTimes(1);
        // Verify that the attached overlay has been removed
        expect(
            result?.overlay?.dispatcherOverlay?.attachedOverlays
        ).toHaveLength(0);
    });

    it('[removeDispatcherOverlay] should not remove an overlay if no attached overlays', () => {
        const mockOverlay: any = createMockOverlay(
            paramsCreateMockOverlay as any
        );
        const detachMock: DetachDispatcherOverlay = jest.fn() as any;

        const result = removeDispatcherOverlay(detachMock)({
            overlay: mockOverlay,
        });

        // Verify that the detach function was not called
        expect(detachMock).not.toHaveBeenCalled();

        // Verify that the attached overlays array remains empty
        expect(
            result?.overlay?.dispatcherOverlay?.attachedOverlays
        ).toHaveLength(0);
    });

    // Add more test cases as needed
});
