import { exactOverlayY } from '../overlay/exact-overlay-y';

describe('exactOverlayY', () => {
    const overlayRect = { bottom: 20, left: 0, right: 20, top: 0 };
    const originRect = { bottom: 70, left: 50, right: 70, top: 50 };
    const containerRect = { bottom: 100, left: 0, right: 100, top: 0 };
    const pos = {
        originX: 'left',
        originY: 'center',
        overlayX: 'left',
        overlayY: 'top',
    };

    it("should return correct y value when originY is 'top'", () => {
        const result = exactOverlayY(overlayRect, originRect, containerRect, {
            ...pos,
            originY: 'top',
        })();
        expect(result.y).toEqual(originRect.top - overlayRect.height);
    });

    it("should return correct y value when originY is 'center'", () => {
        const result = exactOverlayY(overlayRect, originRect, containerRect, {
            ...pos,
            originY: 'center',
        });
        expect(result.y).toEqual(
            originRect.top + originRect.height / 2 - overlayRect.height / 2
        );
    });

    it("should return correct y value when originY is neither 'top' nor 'center'", () => {
        const result = exactOverlayY(overlayRect, originRect, containerRect, {
            ...pos,
            originY: 'bottom',
        });
        const startY = originRect.bottom;
        const endY = originRect.top - overlayRect.height;
        expect(result.y).toEqual(pos.overlayY === 'bottom' ? startY : endY);
    });

    it('should return correct y value when containerRect is too small', () => {
        const result = exactOverlayY(
            overlayRect,
            originRect,
            { bottom: 10, left: 0, right: 10, top: 0 },
            pos
        );
        expect(result.y).toEqual(
            pos.overlayY === 'bottom'
                ? -overlayRect.height
                : containerRect.bottom
        );
    });

    it('should return fallback y value when other conditions are not met', () => {
        const result = exactOverlayY(
            { bottom: 10, left: 0, right: 10, top: 0 },
            { bottom: 60, left: 50, right: 60, top: 50 },
            containerRect,
            pos
        );
        expect(result.y).toEqual(originRect.bottom - overlayRect.height);
    });
});
