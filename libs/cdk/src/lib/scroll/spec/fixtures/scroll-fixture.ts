import { CdkScrollable } from '@angular/cdk/scrolling';
import { ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { MockNgZone } from '../../../directive/spec';
import { mockPlatform } from '../../../platform/spec';
import {
    DEFAULT_RESIZE_TIME,
    RectViewportRulerScroll,
    StartPositionViewportRulerScroll,
    ViewportRulerScroll,
} from '../../data';

/** Creates an overflow container with a set height and width with margin. */
const createOverflowContainerElement = (): HTMLDivElement => {
    const element = document.createElement('div');
    element.style.position = 'relative';
    element.style.overflow = 'auto';
    element.style.height = '300px';
    element.style.width = '300px';
    element.style.margin = '100px';
    return element;
};

export const cdkScrollableMock: CdkScrollable = new CdkScrollable(
    new ElementRef<HTMLElement>(createOverflowContainerElement()),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    null!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    null!
);

export const mockStartPositionViewportRulerScroll: StartPositionViewportRulerScroll =
    {
        left: 0,
        top: 0,
    };

export const mockRectViewportRulerScroll: RectViewportRulerScroll = {
    bottom: 100,
    height: 100,
    left: 0,
    right: 200,
    top: 0,
    width: 200,
};

export const mockViewportRulerScroll: ViewportRulerScroll = {
    change: new Subject<Event>(),
    document: document,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, no-unused-vars
    listener: (event: Event) => {},
    ngZone: new MockNgZone(),
    platform: mockPlatform,
    rect: mockRectViewportRulerScroll,
    startPosition: mockStartPositionViewportRulerScroll,
    throttleTime: DEFAULT_RESIZE_TIME,
    timeChange: new Observable<Event>(),
    viewportSize: { height: 100, width: 200 },
};
