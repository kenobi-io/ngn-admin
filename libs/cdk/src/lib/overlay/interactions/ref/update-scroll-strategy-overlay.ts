import { Overlay } from '../../data';

/** Switches to a new scroll strategy. */
export const updateScrollStrategyOverlayRef = <T>(
    overlay: Overlay<T>
): Overlay<T> => {
    // const { kindStrategiesScroll, portalOutlet, strategiesScroll } = overlay;

    // if (strategiesScroll === overlay.strategiesScroll) {
    //     return overlay;
    // }
    // disposeScrollStrategyOverlayRef(overlay);

    // if (hasAttached(portalOutlet?.portal)) {
    //     const { attachStrategiesScroll, enableStrategiesScroll } = {
    //         ...strategiesScroll,
    //     };

    //     strategy<OverlayRef<T>>(
    //         overlay,
    //         attachStrategiesScroll,
    //         kindStrategiesScroll
    //     );
    //     strategy<OverlayRef<T>>(
    //         overlay,
    //         enableStrategiesScroll,
    //         kindStrategiesScroll
    //     );

    //     // strategiesScroll?.attach(overlay);
    //     // strategiesScroll?.enable();
    // }
    return overlay;
};
