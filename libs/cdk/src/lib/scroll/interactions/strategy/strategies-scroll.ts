import {
    attachBlockStrategyScroll,
    detachBlockStrategyScroll,
} from './block/create-block-strategy-scroll';
import { disableBlockStrategyScroll } from './block/disable-block-strategy-scroll';
import { enableBlockStrategyScroll } from './block/enable-block-strategy-scroll';
import { attachCloseStrategyScroll } from './close/attach-close-strategy-scroll';
import { detachCloseStrategyScroll } from './close/detach-close-strategy-scroll';
import { disableCloseStrategyScroll } from './close/disable-close-strategy-scroll';
import { enableCloseStrategyScroll } from './close/enable-close-strategy-scroll';
import { attachRepositionStrategyScroll } from './reposition/attach-reposition-strategy-scroll';
import { detachRepositionStrategyScroll } from './reposition/detach-reposition-strategy-scroll';
import { disableRepositionStrategyScroll } from './reposition/disable-reposition-strategy-scroll';
import { enableRepositionStrategyScroll } from './reposition/enable-reposition-strategy-scroll';

export type KindStrategiesScroll = 'block' | 'close' | 'reposition';

export type StrategiesScroll = Map<KindStrategiesScroll, <T>(ref: T) => T>;

export const attachStrategiesScroll: StrategiesScroll = new Map()
    .set('block', attachBlockStrategyScroll)
    .set('close', attachCloseStrategyScroll)
    .set('reposition', attachRepositionStrategyScroll);

export const detachStrategiesScroll: StrategiesScroll = new Map()
    .set('block', detachBlockStrategyScroll)
    .set('close', detachCloseStrategyScroll)
    .set('reposition', detachRepositionStrategyScroll);

export const disableStrategiesScroll: StrategiesScroll = new Map()
    .set('block', disableBlockStrategyScroll)
    .set('close', disableCloseStrategyScroll)
    .set('reposition', disableRepositionStrategyScroll);

export const enableStrategiesScroll: StrategiesScroll = new Map()
    .set('block', enableBlockStrategyScroll)
    .set('close', enableCloseStrategyScroll)
    .set('reposition', enableRepositionStrategyScroll);
