import {
    getRtlScrollAxisType,
    RtlScrollAxisType,
    supportsScrollBehavior,
} from '@angular/cdk/platform';
import { _Bottom, _Left, _Right, _Top, _Without } from '@angular/cdk/scrolling';
import { CapabilityMono, Mono, mono, tube } from '@core-template';

import { ExtendedScrollToOptions, Scrollable } from '../../../directive';

type ScrollToScrollable = CapabilityMono<
    Scrollable<unknown> & { isRtl?: boolean; options?: ExtendedScrollToOptions }
>;

/**
 * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
 * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
 * left and right always refer to the left and right side of the scrolling container irrespective
 * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
 * in an RTL context.
 * @use options specified the offsets to scroll to.
 */
export const scrollToScrollable = <T>(): Mono<Scrollable<T>> =>
    mono((scrollable) =>
        tube(
            setRtl(),
            startEndAsLeftOffsetRewrite(),
            startEndAsRightOffsetRewrite(),
            topOffsetRewrite(),
            leftAndRightOffsetRewrite(),
            applyOptionsOfScroll()
        )(scrollable)
    );

const setRtl: ScrollToScrollable = () =>
    mono((scrollable) => {
        scrollable &&
            (scrollable.isRtl = !!(
                scrollable?.dir && scrollable.dir.value === 'rtl'
            ));
    });

const applyOptionsOfScroll: ScrollToScrollable = () =>
    mono((scrollable) => {
        const { nativeElement } = scrollable.elementRef;
        if (supportsScrollBehavior()) {
            nativeElement.scrollTo(scrollable.options);
        } else if (scrollable.options) {
            if (scrollable.options.top != undefined) {
                nativeElement.scrollTop = scrollable.options.top;
            }
            if (scrollable.options.left != undefined) {
                nativeElement.scrollLeft = scrollable.options.left;
            }
        }
    });

const startEndAsLeftOffsetRewrite: ScrollToScrollable = () =>
    mono((scrollable) => {
        const { isRtl, options } = scrollable;
        options &&
            options.left == undefined &&
            (options.left = isRtl ? options.end : options.start);
    });

const startEndAsRightOffsetRewrite: ScrollToScrollable = () =>
    mono((scrollable) => {
        const { isRtl, options } = scrollable;
        options &&
            options.right == undefined &&
            (options.right = isRtl ? options.start : options.end);
    });

const topOffsetRewrite: ScrollToScrollable = () =>
    mono((scrollable) => {
        const { elementRef, options } = scrollable;
        const { nativeElement } = elementRef;

        if (options?.bottom != undefined) {
            (options as _Without<_Bottom> & _Top).top =
                nativeElement.scrollHeight -
                nativeElement.clientHeight -
                options.bottom;
        }
    });

const leftAndRightOffsetRewrite: ScrollToScrollable = () =>
    mono((scrollable) => {
        const { elementRef, isRtl, options } = scrollable;
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
