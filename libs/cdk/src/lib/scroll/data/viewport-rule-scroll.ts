/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Platform } from '@angular/cdk/platform';
import { Observable, Subject } from 'rxjs';

import { Zonality } from '../../directive';

/** Time in ms to throttle the resize events by default. */
export const DEFAULT_RESIZE_TIME = 20;

/** Object that holds the scroll position of the viewport in each direction. */
export interface StartPositionViewportRulerScroll {
    top: number;
    left: number;
}

type SizeViewportRulerScroll = {
    height: number;
    width: number;
};

export type RectViewportRulerScroll = {
    top: number;
    left: number;
    bottom: number;
    right: number;
    height: number;
    width: number;
};

type ChangesViewportRulerScroll = {
    rect: RectViewportRulerScroll;
    startPosition: StartPositionViewportRulerScroll;
    // outputSize: Readonly<SizeViewportRulerScroll>;
    timeChange: Observable<Event>;
    /** Cached viewport dimensions. */
    viewportSize: SizeViewportRulerScroll;
};

/**
 * Simple utility for getting the bounds of the browser viewport.
 * @docs-private
 */
export type ViewportRulerScroll = Zonality &
    Partial<ChangesViewportRulerScroll> & {
        /** Stream of viewport change events. */
        readonly change: Subject<Event>;
        changeListenerViewportRulerScroll: (event: Event) => void;
        /** Used to reference correct document/window */
        document: Document;
        platform: Platform;
        throttleTime: number;
    };
