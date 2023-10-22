/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, jest } from '@jest/globals';

import { disposeOverlay, FnsScrollStrategy } from '../../../interactions';
import { mockOverlay } from '../../overlay.fixture';

describe('disposeOverlayRef', () => {
    it('should dispose overlay properly', () => {
        const param: FnsScrollStrategy = {
            detach: () => jest.fn() as any,
            disable: () => jest.fn() as any,
        }; // Your FnsScrollStrategy parameter
        const {
            attachments,
            backdropClick,
            host,
            keydownEvents,
            locationChanges,
            outsidePointerEvents,
            portalOutlet,
        } = mockOverlay;
        // Mock the methods and properties being called
        portalOutlet && (portalOutlet.disposeFn = jest.fn());
        locationChanges.unsubscribe = jest.fn();
        attachments.complete = jest.fn();
        backdropClick.complete = jest.fn();
        keydownEvents && (keydownEvents.complete = jest.fn());
        outsidePointerEvents && (outsidePointerEvents.complete = jest.fn());
        host && (host.remove = jest.fn());

        // Run the function
        const result = disposeOverlay(param)(mockOverlay);

        // Assertions for each method call and their parameters
        portalOutlet && expect(portalOutlet.disposeFn).toHaveBeenCalledTimes(1);
        expect(locationChanges.unsubscribe).toHaveBeenCalledTimes(1);
        expect(attachments.complete).toHaveBeenCalledTimes(1);
        expect(backdropClick.complete).toHaveBeenCalledTimes(1);
        keydownEvents &&
            expect(keydownEvents.complete).toHaveBeenCalledTimes(1);
        outsidePointerEvents &&
            expect(outsidePointerEvents.complete).toHaveBeenCalledTimes(1);
        host && expect(host.remove).toHaveBeenCalledTimes(1);
        expect(result).toBe(mockOverlay);
    });
});
