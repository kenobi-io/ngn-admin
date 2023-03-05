import { FlexibleConnectedPosition } from './flexible-connected-position';

export const STANDARD_DROPDOWN_BELOW_FLEXIBLE_CONNECTED_POSITIONS: FlexibleConnectedPosition[] =
    [
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
        },
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
        },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
    ];
