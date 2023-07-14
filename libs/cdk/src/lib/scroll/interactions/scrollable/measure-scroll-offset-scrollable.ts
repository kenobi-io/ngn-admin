import { getRtlScrollAxisType, RtlScrollAxisType } from '@angular/cdk/platform';
import { Condition, condition, tube, Unary, unary } from '@core-template';

import { Scrollable } from '../../../directive';

type MeasureScrollOffsetScrollable<T> = Scrollable<T> &
    Partial<{
        isRtl: boolean;
        left: 'left';
        right: 'right';
        from: 'top' | 'left' | 'right' | 'bottom' | 'start' | 'end';
        scrollTop: number;
    }>;

type UnaryScrollable<T> = Unary<MeasureScrollOffsetScrollable<T>>;

type ConditionScrollable<T> = Condition<MeasureScrollOffsetScrollable<T>>;

/**
 * Measures the scroll offset relative to the specified edge of the viewport. This method can be
 * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
 * about what scrollLeft means in RTL. The values returned by this method are normalized such that
 * left and right always refer to the left and right side of the scrolling container irrespective
 * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
 * in an RTL context.
 * @use dir, elementRef: { nativeElement }, from
 */
export const measureScrollOffsetScrollable = <T>(): Unary<Scrollable<T>> =>
    unary((scrollable) =>
        tube(
            setScrollOffset(),
            isRtlAndInverted(),
            handleRtlAndInverted(),
            isRtlAndNegated(),
            handleRtlAndNegated(),
            isNormalOrNonRtl(),
            handleNormalOrNonRtl()
        )(scrollable)
    );

const setScrollOffset = <T>(): UnaryScrollable<T> =>
    unary((scrollable) => {
        const { dir, elementRef, left, right } = scrollable;
        const { nativeElement } = elementRef;

        if (scrollable.from === 'top') {
            scrollable.scrollTop = nativeElement.scrollTop;
        }

        if (scrollable.from === 'bottom') {
            scrollable.scrollTop =
                nativeElement.scrollHeight -
                nativeElement.clientHeight -
                nativeElement.scrollTop;
        }

        scrollable.isRtl = dir && dir.value === 'rtl';

        if (scrollable.from === 'start') {
            scrollable.from = scrollable.isRtl ? right : left;
        } else if (scrollable.from === 'end') {
            scrollable.from = scrollable.isRtl ? left : right;
        }
    });

const isRtlAndInverted = <T>(): ConditionScrollable<T> =>
    condition(
        (scrollable) =>
            !!(
                scrollable?.isRtl &&
                getRtlScrollAxisType() === RtlScrollAxisType.INVERTED
            )
    );

const handleRtlAndInverted = <T>(): UnaryScrollable<T> =>
    unary((scrollable) => {
        const { elementRef, left } = scrollable;
        const { nativeElement } = elementRef;

        if (scrollable.from === left) {
            scrollable.scrollTop =
                nativeElement.scrollWidth -
                nativeElement.clientWidth -
                nativeElement.scrollLeft;
        } else {
            scrollable.scrollTop = nativeElement.scrollLeft;
        }
    });

const isRtlAndNegated = <T>(): ConditionScrollable<T> =>
    condition(
        (scrollable) =>
            !!(
                scrollable?.isRtl &&
                getRtlScrollAxisType() === RtlScrollAxisType.NEGATED
            )
    );

const handleRtlAndNegated = <T>(): UnaryScrollable<T> =>
    unary((scrollable) => {
        const { elementRef, left } = scrollable;
        const { nativeElement } = elementRef;

        if (scrollable.from === left) {
            scrollable.scrollTop =
                nativeElement.scrollLeft +
                nativeElement.scrollWidth -
                nativeElement.clientWidth;
        } else {
            scrollable.scrollTop = -nativeElement.scrollLeft;
        }
    });

const isNormalOrNonRtl = <T>(): ConditionScrollable<T> =>
    condition(
        (scrollable) =>
            !scrollable?.isRtl ||
            getRtlScrollAxisType() === RtlScrollAxisType.NORMAL
    );

const handleNormalOrNonRtl = <T>(): UnaryScrollable<T> =>
    unary((scrollable) => {
        const { elementRef, left } = scrollable;
        const { nativeElement } = elementRef;

        if (scrollable.from === left) {
            scrollable.scrollTop = nativeElement.scrollLeft;
        } else {
            scrollable.scrollTop =
                nativeElement.scrollWidth -
                nativeElement.clientWidth -
                nativeElement.scrollLeft;
        }
    });
