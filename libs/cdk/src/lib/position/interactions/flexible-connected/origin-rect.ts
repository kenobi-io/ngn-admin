import { ElementRef } from '@angular/core';
import { Condition, condition, Mono, mono, tube } from '@core-template';

import {
    FlexibleConnectedStrategyPositionCapability,
    UnaryFlexibleConnectedStrategyPosition,
} from '../../data';

type Data<T> = Partial<FlexibleConnectedStrategyPositionCapability<T>> & {
    height: number;
    width: number;
};

/** @internal Returns the ClientRect of the current origin. */
export const originRect: UnaryFlexibleConnectedStrategyPosition = <T>() =>
    mono(({ strategyPosition }) => {
        const value: Data<T> = {
            height: 0,
            ...strategyPosition,
            width: 0,
        };

        tube(
            doesTheOriginInstanceofElementRef(),
            assignOriginElementRefBoundingClientRect(),
            doesTheOriginInstanceofElement(),
            assignOriginElementBoundingClientRect(),
            doesNotTheOriginInstanceof(),
            assignOriginRect()
        )(value);
    });

const doesTheOriginInstanceofElementRef = <T>(): Condition<Data<T>> =>
    condition((model) => model?.strategyPosition?.origin instanceof ElementRef);

const doesTheOriginInstanceofElement = <T>(): Condition<Data<T>> =>
    condition((model) => model?.strategyPosition?.origin instanceof Element);

const doesNotTheOriginInstanceof = <T>(): Condition<Data<T>> =>
    condition(
        (model) =>
            !(model?.strategyPosition?.origin instanceof Element) &&
            !(model?.strategyPosition?.origin instanceof ElementRef)
    );

const assignOriginElementRefBoundingClientRect = <T>(): Mono<
    Partial<FlexibleConnectedStrategyPositionCapability<T>>
> =>
    mono(
        (model) =>
            model.strategyPosition &&
            (model.strategyPosition.originRect = (
                model.strategyPosition?.origin as ElementRef
            ).nativeElement.getBoundingClientRect())
    );

const assignOriginElementBoundingClientRect = <T>(): Mono<
    Partial<FlexibleConnectedStrategyPositionCapability<T>>
> =>
    mono(
        (model) =>
            model.strategyPosition &&
            (model.strategyPosition.originRect = (
                model.strategyPosition?.origin as Element
            ).getBoundingClientRect())
    );

const assignOriginRect = <T>(): Mono<
    Partial<FlexibleConnectedStrategyPositionCapability<T>>
> =>
    mono((model) => {
        const { strategyPosition } = model;
        if (strategyPosition) {
            const { origin } = strategyPosition;
            if (
                !(origin instanceof Element) &&
                !(origin instanceof ElementRef)
            ) {
                const width = origin.width || 0;
                const height = origin.height || 0;
                strategyPosition.originRect = {
                    bottom: origin.y + height,
                    height,
                    left: origin.x,
                    right: origin.x + width,
                    top: origin.y,
                    width,
                };
            }
        }
    });
