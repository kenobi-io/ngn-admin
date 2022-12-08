import { using } from '../../directive';
import { Attach } from './attach';

export type DisposeScrollStrategyAttach<T> = Partial<Attach<T>>;

/** Cleans up the overlay from the DOM. */
export const disposeScrollStrategyAttach = <T>(
    use: DisposeScrollStrategyAttach<T>
): Attach<T> => {
    return using(use, () => {
        const { scrollStrategy } = use;

        if (scrollStrategy) {
            scrollStrategy.disable();

            if (scrollStrategy.detach) {
                scrollStrategy.detach();
            }
        }
    });
};
