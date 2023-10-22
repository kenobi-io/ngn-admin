/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    jest,
} from '@jest/globals';

import { mockNgZone } from '../../../../directive/spec';
import { Overlay } from '../../../data';
import { updateElementSizeOverlay } from '../../../interactions';
import { mockOverlay } from '../../overlay.fixture';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockCoerceCssPixelValue = jest.fn((value) => value);

describe('updateElementSizeOverlay1', () => {
    beforeEach(() => {
        jest.spyOn(mockOverlay, 'ngZone', 'get').mockReturnValue(mockNgZone);
        jest.mock('@angular/cdk/coercion', () => ({
            coerceCssPixelValue: mockCoerceCssPixelValue,
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should update element size properties', () => {
        const mockConfig = {
            height: 300,
            maxHeight: 450,
            maxWidth: 400,
            minHeight: 150,
            minWidth: 100,
            width: 200,
        };

        const mockPane = {
            style: {
                height: '',
                maxHeight: '',
                maxWidth: '',
                minHeight: '',
                minWidth: '',
                width: '',
            },
        };

        const updatedPane = updateElementSizeOverlay()({
            config: mockConfig,
            pane: mockPane,
        } as Overlay);

        expect(updatedPane.pane?.style.width).toBe(
            mockCoerceCssPixelValue(mockConfig.width)
        );
        expect(updatedPane.pane?.style.height).toBe(
            mockCoerceCssPixelValue(mockConfig.height)
        );
        expect(updatedPane.pane?.style.minWidth).toBe(
            mockCoerceCssPixelValue(mockConfig.minWidth)
        );
        expect(updatedPane.pane?.style.minHeight).toBe(
            mockCoerceCssPixelValue(mockConfig.minHeight)
        );
        expect(updatedPane.pane?.style.maxWidth).toBe(
            mockCoerceCssPixelValue(mockConfig.maxWidth)
        );
        expect(updatedPane.pane?.style.maxHeight).toBe(
            mockCoerceCssPixelValue(mockConfig.maxHeight)
        );
    });
});
