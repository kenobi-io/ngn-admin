import {
    getRtlScrollAxisType,
    RtlScrollAxisType,
    supportsScrollBehavior,
} from '@angular/cdk/platform';
import {
    _Bottom,
    _Left,
    _Right,
    _Top,
    _Without,
    ExtendedScrollToOptions,
} from '@angular/cdk/scrolling';
import { mono, tube } from '@core-template';

import {
    ParamsMonoScrollableCapability,
    ScrollableCapability,
} from '../../data';

type PRS = ParamsMonoScrollableCapability<
    Required<ScrollableCapability>,
    { options: ExtendedScrollToOptions } & { isRtl?: boolean }
>;

/**
 * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
 * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
 * left and right always refer to the left and right side of the scrolling container irrespective
 * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
 * in an RTL context.
 * @use options specified the offsets to scroll to.
 */
export const scrollToScrollable: ParamsMonoScrollableCapability<
    ScrollableCapability,
    { options: ExtendedScrollToOptions }
> = ({ options }) =>
    mono(({ scrollable }) => {
        const rtl = { isRtl: false, options };
        scrollable &&
            tube(
                setRtl(rtl),
                startEndAsLeftOffsetRewrite(rtl),
                startEndAsRightOffsetRewrite(rtl),
                topOffsetRewrite(rtl),
                leftAndRightOffsetRewrite(rtl),
                applyOptionsOfScroll(rtl)
            )({ scrollable });
    });

const setRtl: ParamsMonoScrollableCapability<
    Required<ScrollableCapability>,
    { isRtl?: boolean }
> = ({ isRtl }) =>
    mono(({ scrollable }) => {
        scrollable &&
            (isRtl = !!(scrollable?.dir && scrollable.dir.value === 'rtl')) &&
            isRtl;
    });

const startEndAsLeftOffsetRewrite: PRS = ({ isRtl, options }) =>
    mono(
        ({ scrollable }) =>
            options &&
            options.left == undefined &&
            (options.left = isRtl ? options.end : options.start) &&
            scrollable
    );

const startEndAsRightOffsetRewrite: PRS = ({ isRtl, options }) =>
    mono(
        ({ scrollable }) =>
            options &&
            options.right == undefined &&
            (options.right = isRtl ? options.start : options.end) &&
            scrollable
    );

const topOffsetRewrite: PRS = ({ options }) =>
    mono(({ scrollable }) => {
        const { elementRef } = scrollable;
        const { nativeElement } = elementRef;

        if (options?.bottom != undefined) {
            (options as _Without<_Bottom> & _Top).top =
                nativeElement.scrollHeight -
                nativeElement.clientHeight -
                options.bottom;
        }
    });

const leftAndRightOffsetRewrite: PRS = ({ isRtl, options }) =>
    mono(({ scrollable }) => {
        const { elementRef } = scrollable;
        const { nativeElement } = elementRef;

        if (!options) {
            return;
        }

        if (isRtl && getRtlScrollAxisType() != RtlScrollAxisType.NORMAL) {
            if (options.left != undefined) {
                (options as _Without<_Left> & _Right).right =
                    nativeElement.scrollWidth -
                    nativeElement.clientWidth -
                    options.left;
            }

            if (getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
                options.left = options.right;
            } else if (getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
                options.left = options.right ? -options.right : options.right;
            }
        } else {
            if (options.right != undefined) {
                (options as _Without<_Right> & _Left).left =
                    nativeElement.scrollWidth -
                    nativeElement.clientWidth -
                    options.right;
            }
        }
    });

const applyOptionsOfScroll: PRS = ({ options }) =>
    mono(({ scrollable }) => {
        const { nativeElement } = scrollable.elementRef;
        if (supportsScrollBehavior()) {
            nativeElement.scrollTo(options);
        } else if (options) {
            if (options.top != undefined) {
                nativeElement.scrollTop = options.top;
            }
            if (options.left != undefined) {
                nativeElement.scrollLeft = options.left;
            }
        }
    });
