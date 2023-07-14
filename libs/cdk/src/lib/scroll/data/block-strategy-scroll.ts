/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { StrategyScroll } from './strategy-scroll';
import {
    RectViewportRulerScroll,
    StartPositionViewportRulerScroll,
} from './viewport-rule-scroll';

/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
export type BlockStrategyScroll<T> = StrategyScroll<T> &
    Partial<{ previousScrollPosition: StartPositionViewportRulerScroll }> & {
        document: Document;
        isEnabled: boolean;
        previousHTMLStyles: RectViewportRulerScroll;
        window: Window;
    };
