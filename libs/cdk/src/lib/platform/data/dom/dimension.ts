/** Equivalent of `ClientRect` without some of the properties we don't care about. */
export type Dimension = Omit<DOMRect, 'x' | 'y' | 'toJSON'>;
