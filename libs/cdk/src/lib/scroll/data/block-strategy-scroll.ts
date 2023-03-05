/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {
    RectViewportRulerScroll,
    StartPositionViewportRulerScroll,
    ViewportRulerScroll,
} from './viewport-rule-scroll';

type ChangeBlockStrategyScroll = {
    previousScrollPosition: StartPositionViewportRulerScroll;
};

/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
export type BlockStrategyScroll = Partial<ChangeBlockStrategyScroll> & {
    document: Document;
    isEnabled: boolean;
    previousHTMLStyles: RectViewportRulerScroll;
    window: Window;
    viewportRulerScroll: ViewportRulerScroll;
};
