import { PortalOutlet } from '../data';

export const invokeDisposeFn = <T>(use: PortalOutlet<T>): PortalOutlet<T> => {
    use.disposeFn?.();
    use.disposeFn = undefined;
    return use;
};
