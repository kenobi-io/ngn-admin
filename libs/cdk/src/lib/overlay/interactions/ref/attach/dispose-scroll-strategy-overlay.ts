import { Mono, tube, unary } from '@core-template';
import { UnaryFunction } from 'rxjs';

import { StrategyScrollCapability } from '../../../../scroll';

export type FnsScrollStrategy = {
    disable: () => Mono<StrategyScrollCapability>;
    detach: () => Mono<StrategyScrollCapability>;
};

export type ParamsFnsScrollStrategy = {
    fnsScrollStrategy: FnsScrollStrategy;
};

/** Disposes of a scroll strategy. */
export const disposeStrategyScrollOverlay /* : ParamsUnaryStrategyScrollCapability<
    unknown,
    StrategyScrollCapability,
    FnsScrollStrategy
> */ = <
    P,
    R extends StrategyScrollCapability,
    Param extends FnsScrollStrategy,
>({
    detach,
    disable,
}: Param): UnaryFunction<P, R> =>
    unary<P, R>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ strategyScroll }: any) =>
            strategyScroll && tube(disable(), detach())({ strategyScroll })
    );
