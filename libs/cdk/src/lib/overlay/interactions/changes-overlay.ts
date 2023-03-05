// import { pipe } from 'rxjs';
//
// import { createDomPortalOutlet } from '../../portal';
// import { ChangesOverlayRef, Overlay, OverlayRef } from '../data';
// import { changesOverlayRef } from './ref/change-overlay-ref';
//
/// ** Next overlay unique ID. */
// let nextUniqueId = 0; // TODO: legacy approach fix it
//
// export const changesOverlay = function <T>(
//    this: Overlay<T>
//    // createOverlay: ChangesOverlay<T>
// ): Overlay<T> {
//    const { config, directionality } = createOverlay;
//
//    const changesPaneOverlayRef = <T>(overlay: Overlay<T>): Overlay<T> => {
//        const { ref } = overlay;
//        ref.pane = ref.document.createElement('div');
//        ref.pane.id = `cdk-overlay-${nextUniqueId++}`;
//        ref.pane.classList.add('cdk-overlay-pane');
//        ref.host?.appendChild(ref.pane);
//
//        return overlay;
//    };
//
//    const changesHostOverlayRef = <T>(overlay: Overlay<T>): Overlay<T> => {
//        const { container, ref } = overlay;
//        ref.host = document.createElement('div');
//
//        container.ref?.appendChild(ref.host);
//
//        return overlay;
//    };
//
//    const changesPortalOutletOverlayRef = <T>(
//        overlay: Overlay<T>
//    ): Overlay<T> => {
//        const { appRef, componentFactoryResolver, injector, ref } = overlay;
//
//        if (ref.pane) {
//            ref.portalOutlet = createDomPortalOutlet({
//                appRef,
//                componentFactoryResolver,
//                document: ref.document,
//                injector,
//                outletElement: ref.pane,
//            });
//        }
//
//        return overlay;
//    };
//
//    const setDirection = <T>(overlay: Overlay<T>): Overlay<T> => {
//        const { ref } = overlay;
//        !ref.config && (ref.config = config);
//        ref.config.direction = config.direction || directionality?.value;
//
//        return overlay;
//    };
//
//    const setChangesOverlayRef = <T>(overlay: Overlay<T>): Overlay<T> => {
//        const { host, pane, portalOutlet } = overlay.ref;
//
//        if (host && pane && portalOutlet) {
//            overlay.ref = changesOverlayRef.call<
//                OverlayRef<T>,
//                [change: ChangesOverlayRef<T>],
//                OverlayRef<T>
//            >(overlay.ref, {
//                config,
//                host,
//                pane,
//                portalOutlet,
//            });
//        }
//
//        return overlay;
//    };
//
//    return pipe(
//        changesHostOverlayRef,
//        changesPaneOverlayRef,
//        setDirection,
//        changesPortalOutletOverlayRef,
//        setChangesOverlayRef
//    )(this);
// };
