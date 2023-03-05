import {
    getRtlScrollAxisType,
    RtlScrollAxisType,
    supportsScrollBehavior,
} from '@angular/cdk/platform';
import { _Bottom, _Left, _Right, _Top, _Without } from '@angular/cdk/scrolling';

import { UseScrollable } from '../../data';

/**
 * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
 * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
 * left and right always refer to the left and right side of the scrolling container irrespective
 * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
 * in an RTL context.
 * @use options specified the offsets to scroll to.
 */
export const scrollToScrollable = <T>(
    use: UseScrollable<T>
): UseScrollable<T> => {
    const el = use.elementRef.nativeElement;
    const isRtl = use.dir && use.dir.value == 'rtl';
    const { options } = use;

    const applyScrollToOptions = (use: UseScrollable<T>): UseScrollable<T> => {
        const { nativeElement } = use.elementRef;
        if (supportsScrollBehavior()) {
            nativeElement.scrollTo(options);
        } else if (options) {
            if (options.top != null) {
                nativeElement.scrollTop = options.top;
            }
            if (options.left != null) {
                nativeElement.scrollLeft = options.left;
            }
        }
        return use;
    };

    if (options) {
        // Rewrite start & end offsets as right or left offsets.
        if (options.left == null) {
            options.left = isRtl ? options.end : options.start;
        }

        if (options.right == null) {
            options.right = isRtl ? options.start : options.end;
        }

        // Rewrite the bottom offset as a top offset.
        if (options.bottom != null) {
            (options as _Without<_Bottom> & _Top).top =
                el.scrollHeight - el.clientHeight - options.bottom;
        }

        // Rewrite the right offset as a left offset.
        if (isRtl && getRtlScrollAxisType() != RtlScrollAxisType.NORMAL) {
            if (options.left != null) {
                (options as _Without<_Left> & _Right).right =
                    el.scrollWidth - el.clientWidth - options.left;
            }

            if (getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
                options.left = options.right;
            } else if (getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
                options.left = options.right ? -options.right : options.right;
            }
        } else {
            if (options.right != null) {
                (options as _Without<_Right> & _Left).left =
                    el.scrollWidth - el.clientWidth - options.right;
            }
        }
    }

    return applyScrollToOptions(use);
};
