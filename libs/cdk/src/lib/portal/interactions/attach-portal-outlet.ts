import { strategy } from '@core-template';

import { PortalOutlet } from '../data';

/** Attaches a portal to this outlet. */
export const attachPortalOutlet = <T>(use: PortalOutlet<T>): PortalOutlet<T> =>
    strategy<PortalOutlet<T>>(
        use
        // use.mapStrategyFnsAttach,
        // use.strategyAttachKind
    );
