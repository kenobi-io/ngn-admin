import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

import { changes, WINDOW_TOKEN } from '../../../../platform';
import { BlockStrategyScroll } from '../../../data';
import { VIEWPORT_RULER_SCROLL } from '../../scrollable';

export const CHANGE_BLOCK_STRATEGY_SCROLL =
    new InjectionToken<BlockStrategyScroll>('[CHANGE_BLOCK_STRATEGY_SCROLL]');

/** Attaches this scroll strategy to an overlay. */
export const attachBlockStrategyScroll = (
    strategy: BlockStrategyScroll
): BlockStrategyScroll => strategy;

/** Detaches this scroll strategy to an overlay. */
export const detachBlockStrategyScroll = (
    strategy: BlockStrategyScroll
): BlockStrategyScroll => strategy;

export const createBlockStrategyScroll = (
    change?: Partial<BlockStrategyScroll>
): BlockStrategyScroll => {
    const block: BlockStrategyScroll = {
        document: inject(DOCUMENT),
        isEnabled: false,
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

export const BLOCK_STRATEGY_SCROLL = new InjectionToken<BlockStrategyScroll>(
    '[BLOCK_STRATEGY_SCROLL]',
    {
        factory: () => createBlockStrategyScroll(),
    }
);
