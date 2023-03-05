import { getRtlScrollAxisType, RtlScrollAxisType } from '@angular/cdk/platform';

import { UseScrollable } from '../../data';

/**
 * Measures the scroll offset relative to the specified edge of the viewport. This method can be
 * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
 * about what scrollLeft means in RTL. The values returned by this method are normalized such that
 * left and right always refer to the left and right side of the scrolling container irrespective
 * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
 * in an RTL context.
 * @use dir, elementRef: { nativeElement }, from
 */
export const measureScrollOffsetScrollable = <T>(
    use: UseScrollable<T>
): UseScrollable<T> => {
    const LEFT = 'left';
    const RIGHT = 'right';
    const {
        dir,
        elementRef: { nativeElement },
    } = use;
    // const nativeElement = use.elementRef.nativeElement;
    if (use.from == 'top') {
        use.scrollTop = nativeElement.scrollTop;
    }
    if (use.from == 'bottom') {
        use.scrollTop =
            nativeElement.scrollHeight -
            nativeElement.clientHeight -
            nativeElement.scrollTop;
    }

    // Rewrite start & end as left or right offsets.
    const isRtl = dir && dir.value == 'rtl';
    if (use.from == 'start') {
        use.from = isRtl ? RIGHT : LEFT;
    } else if (use.from == 'end') {
        use.from = isRtl ? LEFT : RIGHT;
    }

    if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
        // For INVERTED, scrollLeft is (scrollWidth - clientWidth) when scrolled all the way left and
        // 0 when scrolled all the way right.
        if (use.from == LEFT) {
            use.scrollTop =
                nativeElement.scrollWidth -
                nativeElement.clientWidth -
                nativeElement.scrollLeft;
        } else {
            use.scrollTop = nativeElement.scrollLeft;
        }
    } else if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
        // For NEGATED, scrollLeft is -(scrollWidth - clientWidth) when scrolled all the way left and
        // 0 when scrolled all the way right.
        if (use.from == LEFT) {
            use.scrollTop =
                nativeElement.scrollLeft +
                nativeElement.scrollWidth -
                nativeElement.clientWidth;
        } else {
            use.scrollTop = -nativeElement.scrollLeft;
        }
    } else {
        // For NORMAL, as well as non-RTL contexts, scrollLeft is 0 when scrolled all the way left and
        // (scrollWidth - clientWidth) when scrolled all the way right.
        if (use.from == LEFT) {
            use.scrollTop = nativeElement.scrollLeft;
        } else {
            use.scrollTop =
                nativeElement.scrollWidth -
                nativeElement.clientWidth -
                nativeElement.scrollLeft;
        }
    }

    return use;
};
