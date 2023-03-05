import { ConnectedPosition } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import { configOverlay, createOverlay } from '@ngn-template/cdk';

import { FireUsePopover } from '../../data';
import { strategyAttaching } from './strategy-attaching';

export const processOpen = <T>(fup: FireUsePopover<T>): FireUsePopover<T> => {
    const { injector, optionsOpen } = fup;
    if (optionsOpen) {
        const { height, origin, width } = optionsOpen;
        const positions: ConnectedPosition[] = [
            {
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom',
            },
            {
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
            },
        ];
        fup.overlay = createOverlay(
            configOverlay({
                backdropClass: 'popover-backdrop',
                hasBackdrop: true,
                height,
                positionStrategy: fup.overlay
                    .position()
                    .flexibleConnectedTo(origin)
                    .withPositions(positions)
                    .withFlexibleDimensions(false)
                    .withPush(false),
                scrollStrategy: overlay.scrollStrategies.reposition(),
                width,
            })
        );
        // const popoverRef = new PopoverRef<T>(overlayRef, content, data);
        const injectorRef = Injector.create({
            parent: injector,
            providers: [],
        });
        strategyAttaching({ ...fup, injectorRef });
    }
    return fup;
};
