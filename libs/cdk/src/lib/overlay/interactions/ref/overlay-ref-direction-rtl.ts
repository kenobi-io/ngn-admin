import { FlexibleConnectedStrategyPosition as Fcsp } from '../../../position/data';

/** Whether the we're dealing with an RTL context */
export const isOverlayRefDirectionRtl = <T>({ overlay }: Fcsp<T>): boolean =>
    overlay ? overlay.ref.direction === 'rtl' : false; // TODO: refactoring by analogy all const { ... } = ...
