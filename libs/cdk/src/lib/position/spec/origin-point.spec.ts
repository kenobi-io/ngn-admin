import { describe, expect, it } from '@jest/globals';

import { originPoint } from '../interactions/flexible-connected/origin-point';
import {
    center,
    ContainerRectFlexMock,
    endBottom,
    mockContainerRectFlex,
    startTop,
} from './flexible-connected-strategy-position.fixture';

describe('originPoint', () => {
    it('should return correct origin point for center position', () => {
        const result = originPoint(
            mockContainerRectFlex.originRect,
            mockContainerRectFlex.containerRect,
            center
        )(mockContainerRectFlex);

        expect(result.fallback?.originPoint).toEqual({ x: 70, y: 35 });
    });

    it('should return correct origin point for start/top position', () => {
        const result = originPoint(
            mockContainerRectFlex.originRect,
            mockContainerRectFlex.containerRect,
            startTop
        )(mockContainerRectFlex);

        expect(result.fallback?.originPoint).toEqual({ x: 20, y: 10 });
    });

    it('should return correct origin point for end/bottom position', () => {
        const result = originPoint(
            mockContainerRectFlex.originRect,
            mockContainerRectFlex.containerRect,
            endBottom
        )(mockContainerRectFlex);

        expect(result.fallback?.originPoint).toEqual({ x: 120, y: 60 });
    });

    it('should handle negative origin point values', () => {
        const mockNegativeData: ContainerRectFlexMock = {
            ...mockContainerRectFlex,
            containerRect: {
                bottom: 0,
                height: 500,
                left: -100,
                right: 0,
                top: -50,
                width: 500,
            },
        };
        mockNegativeData.fallback &&
            (mockNegativeData.fallback.originPoint = { x: -10, y: -20 });
        const result = originPoint(
            mockContainerRectFlex.originRect,
            mockNegativeData.containerRect,
            center
        )(mockNegativeData);

        expect(result.fallback?.originPoint).toEqual({ x: 70, y: 35 });
    });
});
