/** @internal Subtracts the amount that an element is overflowing on an axis from its length. */
export const subtractOverflows = (
    length: number,
    ...overflows: number[]
): number => {
    return overflows.reduce((currentValue: number, currentOverflow: number) => {
        return currentValue - Math.max(currentOverflow, 0);
    }, length);
};
