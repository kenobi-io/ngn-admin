import { supportsScrollBehavior } from '@angular/cdk/platform';
import { InjectionToken } from '@angular/core';
import {
    and,
    CapabilityMono,
    Condition,
    condition,
    Mono,
    mono,
    tube,
} from '@core-template';

import { BlockStrategyScroll } from '../../../data';

export const whetherScrollBehaviorSupported = supportsScrollBehavior();

export const disableBlockStrategyScroll = <T>(): Mono<BlockStrategyScroll<T>> =>
    mono((strategy) =>
        tube(
            canDisableStrategy(),
            disableStrategy(),
            and(canRestoreScrollBehavior(), canDisableStrategy()),
            restoreScrollBehavior()
        )(strategy)
    );

const canDisableStrategy = <T>(): Condition<BlockStrategyScroll<T>> =>
    condition((strategy) => !!strategy?.isEnabled);

const disableStrategy = <T>(): Mono<BlockStrategyScroll<T>> =>
    mono((strategy) => {
        const { document, previousHTMLStyles } = strategy;
        const html = document.documentElement;
        const htmlStyle = html.style;

        strategy.isEnabled = false;
        htmlStyle.left = `${previousHTMLStyles.left}`;
        htmlStyle.top = `${previousHTMLStyles.left}`;
        html.classList.remove('cdk-global-scrollblock');

        if (whetherScrollBehaviorSupported) {
            const body = document.body;
            const bodyStyle = body.style;
            bodyStyle.scrollBehavior = 'auto';
            htmlStyle.scrollBehavior = 'auto';
        }
        window.scroll({
            left: previousHTMLStyles.left,
            top: previousHTMLStyles.top,
        });
    });

const canRestoreScrollBehavior = <T>(): Condition<BlockStrategyScroll<T>> =>
    condition(() => whetherScrollBehaviorSupported);

const restoreScrollBehavior = <T>(): Mono<BlockStrategyScroll<T>> =>
    mono((strategy) => {
        const { document } = strategy;
        const html = document.documentElement;
        const htmlStyle = html.style;
        const body = document.body;
        const bodyStyle = body.style;
        const previousHtmlScrollBehavior = htmlStyle.scrollBehavior || '';
        const previousBodyScrollBehavior = bodyStyle.scrollBehavior || '';

        if (whetherScrollBehaviorSupported) {
            htmlStyle.scrollBehavior = previousHtmlScrollBehavior;
            bodyStyle.scrollBehavior = previousBodyScrollBehavior;
        }
    });

export const DISABLE_BLOCK_STRATEGY_SCROLL = new InjectionToken<
    CapabilityMono<BlockStrategyScroll<unknown>>
>('[DISABLE_BLOCK_STRATEGY_SCROLL]', {
    factory: () => disableBlockStrategyScroll,
});
