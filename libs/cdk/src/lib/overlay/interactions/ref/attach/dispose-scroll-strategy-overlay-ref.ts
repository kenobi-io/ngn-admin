import { casting } from '../../../../directive';
import { OverlayRef } from '../../../data';

export type DisposeScrollStrategyAttach<T> = Partial<OverlayRef<T>>;

/** Cleans up the overlay from the DOM. */
export const disposeScrollStrategyOverlayRef = <T>(
    use: DisposeScrollStrategyAttach<T>
): OverlayRef<T> => {
    return casting(use, () => {
        const { strategiesScroll: scrollStrategy } = use;

        if (scrollStrategy) {
            scrollStrategy.disable();

            if (scrollStrategy.detach) {
                scrollStrategy.detach();
            }
        }
    });
};
