import { UnaryFunction } from 'rxjs';

export const casting = <T, K>(use: K, fn: UnaryFunction<T, void>): T => {
    fn(use as unknown as T);
    return use as unknown as T;
};
