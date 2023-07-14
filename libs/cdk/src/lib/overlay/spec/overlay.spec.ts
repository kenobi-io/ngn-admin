import { describe, expect, it } from '@jest/globals';

import { mockOverlay } from './overlay-fixture';

describe('createOverlay', () => {
    it('should create an overlay with default values', () => {
        const overlay = mockOverlay;

        // expect(overlay).toBeInstanceOf(Overlay<any>);
        expect(overlay.appRef).toBeDefined();
        expect(overlay.componentFactoryResolver).toBeDefined();
        expect(overlay.container).toBeUndefined();
        expect(overlay.injector).toBeDefined();
        expect(overlay.optionsStrategyScroll).toBeDefined();
        expect(overlay.positionBuilder).toBeDefined();
        expect(overlay.ref).toBeDefined();
        expect(overlay.config?.hasBackdrop).toBe(false);
        expect(overlay.config?.panelClass).toEqual([]);
        // expect(overlay.config?.scrollStrategy).toBeDefined();
        expect(overlay.config?.width).toBeUndefined();
        expect(overlay.config?.height).toBeUndefined();
        expect(overlay.config?.minWidth).toBeUndefined();
        expect(overlay.config?.minHeight).toBeUndefined();
        expect(overlay.config?.maxWidth).toBeUndefined();
        expect(overlay.config?.maxHeight).toBeUndefined();
        // expect(overlay.config?.positionStrategy).toBeDefined();
        expect(overlay.config?.direction).toBeUndefined();
    });

    it('should create an overlay with custom values', () => {
        mockOverlay.config = {
            direction: 'rtl',
            hasBackdrop: true,
            height: '200px',
            maxHeight: '400px',
            maxWidth: '500px',
            minHeight: '50px',
            minWidth: '100px',
            panelClass: ['my-panel-class'],
            // positionStrategy: null,
            // scrollStrategy: null,
            width: '300px',
            // container: new ContainerOverlay(document.body),
        };
        const overlay = mockOverlay;

        expect(overlay.container).toBeDefined();
        expect(overlay.config?.hasBackdrop).toBe(true);
        expect(overlay.config?.panelClass).toEqual(['my-panel-class']);
        expect(overlay.config?.width).toBe('300px');
        expect(overlay.config?.height).toBe('200px');
        expect(overlay.config?.minWidth).toBe('100px');
        expect(overlay.config?.minHeight).toBe('50px');
        expect(overlay.config?.maxWidth).toBe('500px');
        expect(overlay.config?.maxHeight).toBe('400px');
        // expect(overlay.config?.scrollStrategy).toBeNull();
        // expect(overlay.config?.positionStrategy).toBeNull();
        expect(overlay.config?.direction).toBe('rtl');
    });
});

// describe('Overlay', () => {
//     let overlay: Overlay<any>;
//     let overlayRef: OverlayRef<any>;

//     beforeEach(() => {
//         overlayRef = {} as OverlayRef<any>;
//         const optionsStrategyScroll = {} as OptionsStrategyScrollOverlay<any>;
//         const positionBuilder = {} as OverlayPositionBuilder;
//         const componentFactoryResolver = {} as ComponentFactoryResolver;
//         const injector = {} as Injector;
//         const appRef = {} as ApplicationRef;
//         const zonality = {} as Zonality;
//         const config = {} as ConfigOverlay;
//         const container = {} as ContainerOverlay;
//         const changesOverlayRef = {} as ChangesOverlayRef<any>;
//         overlay = {
//             appRef,
//             componentFactoryResolver,
//             config,
//             container,
//             injector,
//             optionsStrategyScroll,
//             positionBuilder,
//             ref: overlayRef,
//             zonality,
//             ...changesOverlayRef,
//         };
//     });

//     it('should have all properties defined', () => {
//         expect(overlay.ref).toBeDefined();
//         expect(overlay.optionsStrategyScroll).toBeDefined();
//         expect(overlay.positionBuilder).toBeDefined();
//         expect(overlay.componentFactoryResolver).toBeDefined();
//         expect(overlay.injector).toBeDefined();
//         expect(overlay.appRef).toBeDefined();
//         expect(overlay.zonality).toBeDefined();
//         expect(overlay.config).toBeDefined();
//         expect(overlay.container).toBeDefined();
//         expect(overlay.destroyed).toBeUndefined();
//         expect(overlay.backdropClick).toBeUndefined();
//         expect(overlay.backdropClickHandler).toBeUndefined();
//         expect(overlay.backdropTransitionendHandler).toBeUndefined();
//         expect(overlay.keyboardDispatcher).toBeUndefined();
//         expect(overlay.location).toBeUndefined();
//         expect(overlay.locationChanges).toBeUndefined();
//         expect(overlay.attachments).toBeUndefined();
//         expect(overlay.detachments).toBeUndefined();
//     });
// });
