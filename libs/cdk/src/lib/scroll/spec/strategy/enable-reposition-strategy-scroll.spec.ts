import { describe, expect, it, jest } from '@jest/globals';

import { enableRepositionStrategyScroll } from '../../interactions';

describe('enableRepositionStrategyScroll', () => {
    it('should subscribe to scrolled events and perform necessary actions', () => {
        // Mocked functions
        const updatePositionOverlayRef = jest.fn();
        const detachOverlayRef = jest.fn();

        // Mock the functions imported from other files
        jest.mock('../../../../overlay', () => ({
            detachOverlayRef,
            updatePositionOverlayRef,
        }));
        jest.mock('../../clip-scroll', () => ({
            isElementScrolledOutsideView: jest.fn(),
        }));
        jest.mock('../../scrollable', () => ({
            sizeViewportRulerScroll: jest.fn(),
        }));
        jest.mock('./disable-reposition-strategy-scroll', () => ({
            disableRepositionStrategyScroll: jest.fn(),
        }));

        // Invoke the function
        enableRepositionStrategyScroll()(strategy);

        // Expectations
        expect(strategy.dispatcher.auditTimeInMs).toBe(
            strategy.config.scrollThrottle
        );

        // Simulate scrolled event
        strategy.dispatcher.scrolled.subscribe.mock.calls[0][0]();

        // Expectations for scrolled event
        expect(updatePositionOverlayRef).toHaveBeenCalledWith(strategy.overlay);
        expect(
            strategy.overlay.overlayElement.getBoundingClientRect
        ).toHaveBeenCalled();
        expect(detachOverlayRef).not.toHaveBeenCalled(); // Since autoClose is true, detachOverlayRef should not be called

        // Clean up
        jest.restoreAllMocks();
    });
});
