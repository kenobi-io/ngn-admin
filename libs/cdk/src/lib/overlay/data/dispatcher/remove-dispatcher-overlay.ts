import { FunctionMono, SplicerTube } from '@core-template';

import { DispatcherOverlayCapability } from './dispatcher-overlay';

export type OutOrKeyEventDispatcherOverlay<
    T = unknown,
    Capability extends
        DispatcherOverlayCapability<T> = DispatcherOverlayCapability<T>,
> = Capability & Partial<SplicerTube<T>>;

export type DetachDispatcherOverlay<T = unknown> = FunctionMono<
    OutOrKeyEventDispatcherOverlay<T>
>;
