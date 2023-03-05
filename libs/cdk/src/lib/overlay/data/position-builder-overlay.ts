import {
    FlexibleConnectedPositionStrategy,
    GlobalPositionStrategy,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';

import { ViewportRulerScroll } from '../../scroll';
import { ContainerOverlay } from './container-overlay';

/** Builder for overlay position strategy. */
export type PositionBuilderOverlay = {
    viewportRuler: ViewportRulerScroll;
    document: Document;
    platform: Platform;
    overlayContainer: ContainerOverlay;
    global: GlobalPositionStrategy;
    flexibleConnectedTo: FlexibleConnectedPositionStrategy;
};

/// **
// * Creates a global position strategy.
// */
// const global = (): GlobalPositionStrategy => {};
//
/// **
// * Creates a flexible position strategy.
// * @param origin Origin relative to which to position the overlay.
// */
// const flexibleConnectedTo = (
//    origin: FlexibleConnectedPositionStrategyOrigin
// ): FlexibleConnectedPositionStrategy => {};
