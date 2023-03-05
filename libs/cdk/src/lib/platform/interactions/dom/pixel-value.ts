import { cssUnitPattern } from '../../data';

/**
 * Extracts the pixel value as a number from a value, if it's a number
 * or a CSS pixel string (e.g. `1337px`). Otherwise returns null.
 */
export const pixelValue = (
    input: number | string | null | undefined
): number | undefined => {
    if (typeof input !== 'number' && input != null) {
        const [value, units] = input.split(cssUnitPattern);
        return !units || units === 'px' ? parseFloat(value) : undefined;
    }

    return input || undefined;
};
