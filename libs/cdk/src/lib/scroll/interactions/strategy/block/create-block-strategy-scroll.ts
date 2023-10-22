import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';
import { Model } from '@core-template';

import { changes, WINDOW_TOKEN, ZONE_TOKEN } from '../../../../platform';
import { BlockStrategyScroll } from '../../../data';
import { VIEWPORT_RULER_SCROLL } from '../../scrollable';

export const createBlockStrategyScroll = <T>(
    change?: Partial<BlockStrategyScroll<T>>
): BlockStrategyScroll<T> => {
    const block: BlockStrategyScroll<T> = {
        document: inject(DOCUMENT),
        isEnabled: false,
        ngZone: inject(ZONE_TOKEN),
        previousHTMLStyles: {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
        },
        viewportRulerScroll: inject(VIEWPORT_RULER_SCROLL),
        window: inject(WINDOW_TOKEN),
    };
    changes(block, change, CHANGE_BLOCK_STRATEGY_SCROLL);

    return block;
};

export const BLOCK_STRATEGY_SCROLL = new InjectionToken<
    BlockStrategyScroll<Model>
>('[BLOCK_STRATEGY_SCROLL]', {
    factory: () => createBlockStrategyScroll(),
});

export const CHANGE_BLOCK_STRATEGY_SCROLL = new InjectionToken<
    BlockStrategyScroll<Model>
>('[CHANGE_BLOCK_STRATEGY_SCROLL]');
