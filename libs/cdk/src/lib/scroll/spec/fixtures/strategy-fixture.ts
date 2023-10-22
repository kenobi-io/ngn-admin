import { Subject } from 'rxjs';

import { mockNgZone } from '../../../directive/spec';
import {
    BlockStrategyScroll,
    CloseStrategyScroll,
    RepositionStrategyScroll,
} from '../../data';
import { mockViewportRulerScroll } from './scroll-fixture';

type DataStrategy = { content: string; rect: { height: 200; wight: 100 } };

export const mockBlockStrategyScroll: BlockStrategyScroll<DataStrategy> = {
    document: document,
    isEnabled: true,
    ngZone: mockNgZone,
    previousHTMLStyles: {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
    },
    viewportRulerScroll: mockViewportRulerScroll,
    window: window,
};

export const mockCloseStrategyScroll: CloseStrategyScroll<DataStrategy> = {
    config: {
        overlay: undefined,
        threshold: 100,
    },
    dispatcher: {
        auditTimeInMs: 20,
        count: 0,
        // platform: mockPlatform,
        scrollContainers: new Map(),
        scrolled: new Subject(),
    },
    initialScrollPosition: 0,
    ngZone: mockNgZone,
    overlay: undefined,
    scrollSubscriptions: [],
    viewportRulerScroll: mockViewportRulerScroll,
};

export const mockRepositionStrategyScroll: RepositionStrategyScroll<DataStrategy> =
    {
        dispatcher: {
            auditTimeInMs: 50,
            count: 0,
            // platform: mockPlatform,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scrollContainers: new Map<any, any>(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            scrolled: new Subject<any>(),
        },
        ngZone: mockNgZone,
        viewportRulerScroll: mockViewportRulerScroll,
    };
