/* eslint-disable @typescript-eslint/ban-types */
import { ComponentRef, EmbeddedViewRef } from '@angular/core';
import { condition, mono, tube } from '@core-template';
import { take } from 'rxjs';

import { outNgZone } from '../../../../platform';
import {
    ComponentPortal,
    hasAttached,
    Portal,
    PortalCapability,
    // PortalCapability,
    TemplatePortal,
} from '../../../../portal';
import {
    ConditionOverlayCapability,
    MonoOverlayCapability,
    OverlayCapability,
    ParamsMonoOverlayCapability,
} from '../../../data';
import { addOutsideClickDispatcherOverlay } from '../../dispatcher';
import { addKeyboardDispatcherOverlay } from '../../dispatcher/add-keyboard-dispatcher-overlay';
import { backdropAttachOverlayRef } from './backdrop-attach-overlay';
import { detachOverlay } from './detach-overlay';
import { disposeOverlay } from './dispose-overlay';
import { FnsScrollStrategy } from './dispose-scroll-strategy-overlay';
import { setDirectionOverlayRef } from './set-direction-overlay';
import { updateElementSizeOverlay } from './update-element-size-overlay';

type AttachResultPortalCapability = {
    attachResult?:
        | HTMLElement
        | ComponentRef<unknown>
        | EmbeddedViewRef<unknown>;
    portal?: Portal | ComponentPortal<unknown> | TemplatePortal<unknown>;
};

type RolesAttachOverlayRef<T = unknown> = {
    enableScroll: () => (ref: T) => T;
    attachPortalOutlet: ParamsMonoOverlayCapability<
        OverlayCapability,
        AttachResultPortalCapability
    >;
    fnsScrollStrategy: FnsScrollStrategy;
};

type MonoReqOverCap = MonoOverlayCapability<Required<OverlayCapability>>;
type ConReqOverCap = ConditionOverlayCapability<Required<OverlayCapability>>;

type Data<T = unknown> = PortalCapability & Required<OverlayCapability<T>>;

export const attachOverlay: ParamsMonoOverlayCapability<
    OverlayCapability,
    RolesAttachOverlayRef
> = (param) =>
    mono(({ overlay }) => {
        const { attachPortalOutlet, enableScroll, fnsScrollStrategy } = param;
        if (overlay) {
            const { attachResult, portal } = overlay;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            overlay.attachResult = attachResult ? attachResult : ({} as any);
            const data: Data = { overlay, ...overlay };
            tube(
                attachHostIfNeeded(),
                attachPortalOutlet({
                    attachResult: overlay.attachResult,
                    portal,
                }),
                updateHostStackingOrder(),
                updateElementSizeOverlay(),
                setDirectionOverlayRef(),
                enableScroll(),
                updatePositionAfterStable(),
                ({ overlay: { config } }) => config?.hasBackdrop,
                backdropAttachOverlayRef(),
                (_: Data) => {
                    _.overlay.attachments.next();
                    return _;
                },
                addKeyboardDispatcherOverlay(),
                subscribeToLocationChanges(fnsScrollStrategy),
                hasPortalOutletOnDestroy(),
                addOutsideClickDispatcherOverlay(),
                hasAttached(),
                outNgZone(hasAttached(), detachOverlay(), {
                    context,
                    func,
                })
            )(data);
        }
    });

const attachHostIfNeeded: MonoReqOverCap = () =>
    mono(
        ({ overlay: { host, previousHostParent } }) =>
            host &&
            !host.parentElement &&
            previousHostParent &&
            previousHostParent.appendChild(host)
    );

const updateHostStackingOrder: MonoReqOverCap = () =>
    mono(({ overlay: { host } }) => {
        host?.nextSibling && host.parentNode?.appendChild(host);
    });

const updatePositionAfterStable: MonoReqOverCap = () =>
    mono(({ overlay: { ngZone, portalOutlet /* positionStrategy */ } }) => {
        ngZone.onStable.pipe(take(1)).subscribe(() => {
            if (hasAttached(portalOutlet?.portal)) {
                // positionStrategy?.apply();
            }
        });
    });

const subscribeToLocationChanges: ParamsMonoOverlayCapability<
    Required<OverlayCapability>,
    FnsScrollStrategy
> = (fnsScrollStrategy) =>
    mono(({ overlay }) => {
        const { config, location } = overlay;
        if (config?.disposeOnNavigation) {
            overlay.locationChanges = location.subscribe(() =>
                disposeOverlay({ fnsScrollStrategy })({ overlay, ...overlay })
            );
        }
    });

const hasPortalOutletOnDestroy: ConReqOverCap = () =>
    condition(
        ({ overlay: { attachResult } }) =>
            typeof (attachResult as { onDestroy?: Function }).onDestroy ===
            'function'
    );

const context = Promise.resolve();
const func = context.then;
