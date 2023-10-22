import { ElementRef } from '@angular/core';
import { condition, mono, tube } from '@core-template';

import {
    ConditionStrategyPositionCapability,
    FlexibleConnectedStrategyPositionCapability,
    MonoStrategyPositionCapability,
} from '../../data';

type RF = MonoStrategyPositionCapability<
    Required<FlexibleConnectedStrategyPositionCapability>
>;

type Data = {
    height: number;
    width: number;
};

type CRF = ConditionStrategyPositionCapability<
    Required<FlexibleConnectedStrategyPositionCapability> & Data
>;

/** @internal Returns the ClientRect of the current origin. */
export const originRect: MonoStrategyPositionCapability<
    FlexibleConnectedStrategyPositionCapability
> = () =>
    mono(({ strategyPosition }) => {
        const value: Data = {
            height: 0,
            width: 0,
        };

        strategyPosition &&
            tube(
                ({ strategyPosition: { origin } }) =>
                    origin instanceof ElementRef,
                assignOriginElementRefBoundingClientRect(),
                ({ strategyPosition: { origin } }) => origin instanceof Element,
                assignOriginElementBoundingClientRect(),
                doesNotTheOriginInstanceof(),
                assignOriginRect()
            )({ strategyPosition, ...value });
    });

const doesNotTheOriginInstanceof: CRF = () =>
    condition(
        ({ strategyPosition: { origin } }) =>
            !(origin instanceof Element) && !(origin instanceof ElementRef)
    );

const assignOriginElementRefBoundingClientRect: RF = () =>
    mono(
        ({ strategyPosition }) =>
            (strategyPosition.originRect = (
                strategyPosition.origin as ElementRef
            ).nativeElement.getBoundingClientRect())
    );

const assignOriginElementBoundingClientRect: RF = () =>
    mono(
        ({ strategyPosition, strategyPosition: { origin } }) =>
            (strategyPosition.originRect = (
                origin as Element
            ).getBoundingClientRect())
    );

const assignOriginRect: RF = () =>
    mono(({ strategyPosition, strategyPosition: { origin } }) => {
        if (!(origin instanceof Element) && !(origin instanceof ElementRef)) {
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
    });
