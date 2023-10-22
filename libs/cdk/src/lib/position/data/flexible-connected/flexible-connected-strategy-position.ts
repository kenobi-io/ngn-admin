/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { FlexibleConnectedPositionStrategyOrigin } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { Observable, Subject, Subscription } from 'rxjs';

import { BoundingBoxSize, Dimension, Point } from '../../../platform';
import { ViewportRulerScrollCapability } from '../../../scroll';
import { StrategyPositionCapability } from '../capability';
import { StrategyPosition } from '../strategy-position';
import {
    ConnectedOverlayPositionChange,
    ConnectionPositionPair,
} from './connected-position';
import { FallbackPosition } from './fallback-position';
import { FlexibleConnectedPosition } from './flexible-connected-position';

type ChangesFlexibleConnectedStrategyPosition = {
    /**
     * Parent element for the overlay panel used to constrain the overlay panel's size to fit
     * within the viewport.
     */
    boundingBox: HTMLElement;
    /** The last position to have been calculated as the best fit position. */
    lastPosition: FlexibleConnectedPosition;
    /** Amount by which the overlay was pushed in each axis during the last time it was positioned. */
    previousPushAmount: Point;
    // Fallback if none of the preferred positions fit within the viewport.
    fallback: FallbackPosition;
    styleOverlayY: { bottom: string; top: string };
    styleOverlayX: Partial<CSSStyleDeclaration>;
    offsetXAndY: number;
    offsetX: number;
    offsetY: number;
    /** Cached container dimensions */
    containerRect: Dimension;
    /** The overlay pane element. */
    pane: HTMLElement;
};

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
export type FlexibleConnectedStrategyPosition<T = unknown> =
    StrategyPosition<T> &
        Partial<ChangesFlexibleConnectedStrategyPosition> &
        ViewportRulerScrollCapability & {
            document: Document;
            /** Whether we're performing the very first positioning of the overlay. */
            isInitialRender: boolean;

            /** Last size used for the bounding box. Used to avoid resizing the overlay after open. */
            lastBoundingBoxSize: BoundingBoxSize;

            /** Whether the overlay was pushed in a previous positioning. */
            isPushed: boolean;

            /** Whether the overlay can be pushed on-screen on the initial open. */
            canPush: boolean;

            /** Whether the overlay can grow via flexible width/height after the initial open. */
            growAfterOpen: boolean;

            /** Whether the overlay's width and height can be constrained to fit within the viewport. */
            hasFlexibleDimensions: boolean;

            /** Whether the overlay position is locked. */
            positionLocked: boolean;

            /** Cached origin dimensions */
            originRect: Dimension;

            /** Cached overlay dimensions */
            overlayRect: Dimension;

            /** Cached viewport dimensions */
            viewportRect: Dimension;

            /** Amount of space that must be maintained between the overlay and the edge of the viewport. */
            viewportMargin: number;

            /** The Scrollable containers used to check scrollable view properties on position change. */
            scrollables: CdkScrollable[];

            /** Ordered list of preferred positions, from most to least desirable. */
            preferredPositions: ConnectionPositionPair[];

            /** The origin element against which the overlay will be positioned. */
            origin: FlexibleConnectedPositionStrategyOrigin;

            /** @internal Observable sequence of position changes. */
            positionChange: Observable<ConnectedOverlayPositionChange>;

            /** Subject that emits whenever the position changes. */
            readonly positionChanger: Subject<ConnectedOverlayPositionChange>;

            /** Subscription to viewport size changes. */
            resizeSubscription: Subscription;

            /** Selector to be used when finding the elements on which to set the transform origin. */
            transformOriginSelector: string;

            /** Keeps track of the CSS classes that the position strategy has applied on the overlay panel. */
            appliedPanelClasses: string[];
            platform: Platform;
        };

export type FlexibleConnectedStrategyPositionCapability<T = unknown> =
    StrategyPositionCapability<T> & {
        strategyPosition?: FlexibleConnectedStrategyPosition<T>;
    };
