import { describe, expect, it } from '@jest/globals';

import { calculateBoundingBoxRect } from '../interactions';
import {
    center,
    mockContainerRectFlex,
} from './flexible-connected-strategy-position.fixture';

describe('calculateBoundingBoxRect', () => {
    it('should return the correct bounding box dimensions for the center position', () => {
        const result = calculateBoundingBoxRect(
            mockContainerRectFlex.originRect,
            mockContainerRectFlex.overlayRect,
            center
        )(mockContainerRectFlex);

        expect(result.containerRect).toEqual({
            bottom: 500,
            height: 500,
            left: 20,
            right: 180,
            top: 0,
            width: 160,
        });
    });
});
