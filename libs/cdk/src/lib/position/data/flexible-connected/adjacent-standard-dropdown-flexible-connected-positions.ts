import { FlexibleConnectedPosition } from './flexible-connected-position';

export const STANDARD_DROPDOWN_ADJACENT_FLEXIBLE_CONNECTED_POSITIONS: FlexibleConnectedPosition[] =
    [
        { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
        {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'bottom',
        },
        { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'bottom',
        },
    ];
