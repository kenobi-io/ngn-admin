/*
 * Creates an error to be thrown if the user supplied an invalid tooltip position.
 * @docs-private
 */
export const tooltipInvalidPositionError = (position: string): Error =>
    new Error(`Tooltip position "${position}" is invalid.`);
