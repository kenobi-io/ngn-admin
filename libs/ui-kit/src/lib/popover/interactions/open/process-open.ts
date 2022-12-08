import { ConnectedPosition, OverlayConfig } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';

import { UsePopover } from '../../data';
import { FireUsePopover } from '../../data/fire-use-popover';
import { strategyAttaching } from './strategy-attaching';

export const processOpen = <T>(use: FireUsePopover<T>): UsePopover<T> => {
    const { injector, optionsOpen, overlay } = use;
    const { /*container,*/ height, origin, width } = optionsOpen;
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
    use.overlayRef = overlay.create(
        new OverlayConfig({
            backdropClass: 'popover-backdrop',
            hasBackdrop: true,
            height,
            positionStrategy: overlay
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
    strategyAttaching({ ...use, /*container,*/ injectorRef });
    return use as UsePopover<T>;
};
