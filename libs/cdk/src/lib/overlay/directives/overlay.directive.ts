// /* eslint-disable no-use-before-define */
// /**
//  * @license
//  * Copyright Google LLC All Rights Reserved.
//  *
//  * Use of this source code is governed by an MIT-style license that can be
//  * found in the LICENSE file at https://angular.io/license
//  */

// import { Directionality } from '@angular/cdk/bidi';
// import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
// import {
//     ConnectedOverlayPositionChange,
//     ConnectedPosition,
//     FlexibleConnectedPositionStrategy,
//     FlexibleConnectedPositionStrategyOrigin,
//     OverlayConfig,
//     RepositionScrollStrategy,
//     ScrollStrategy,
// } from '@angular/cdk/overlay';
// import { TemplatePortal } from '@angular/cdk/portal';
// import {
//     Directive,
//     EventEmitter,
//     inject,
//     Input,
//     OnChanges,
//     OnDestroy,
//     Output,
//     SimpleChanges,
//     TemplateRef,
//     ViewContainerRef,
// } from '@angular/core';
// import { pipe, Subscription } from 'rxjs';

// import { Subscruse, Use } from '../../directive';
// import { VIEW_CONTAINER_REF_TOKEN, ZONE_TOKEN } from '../../platform';
// import { defaultPositionList, Overlay, OverlayRef } from '../data';
// import { createOverlay } from '../interactions';
// import { OverlayOriginDirective } from './overlay-origin.directive';

// export type UseConnectedOverlay<T> = Pick<
//     Use<T>,
//     'ngZone' | 'viewContainerRef'
// > &
//     Pick<Subscruse<T>, 'subscriptions'> & {
//         attach: EventEmitter<void>;
//         attachSubscription: Subscription;
//         backdropClass?: string | string[];
//         backdropClick: EventEmitter<MouseEvent>;
//         backdropSubscription: Subscription;
//         detach: EventEmitter<void>;
//         detachSubscription: Subscription;
//         disableClose: boolean;
//         dir: Directionality;
//         flexibleDimensions: boolean;
//         growAfterOpen: boolean;
//         hasBackdrop: boolean;
//         height?: number | string;
//         lockPosition: boolean;
//         minHeight?: number | string;
//         minWidth?: number | string;
//         offsetX?: number;
//         offsetY?: number;
//         open: boolean;
//         origin?:
//             | OverlayOriginDirective
//             | FlexibleConnectedPositionStrategyOrigin;
//         overlay?: Overlay<T>;
//         overlayKeydown: EventEmitter<KeyboardEvent>;
//         overlayOutsideClick: EventEmitter<MouseEvent>;
//         // overlay?: OverlayRef;
//         panelClass?: string | string[];
//         position?: FlexibleConnectedPositionStrategy;
//         positionChange: EventEmitter<ConnectedOverlayPositionChange>;
//         positions?: ConnectedPosition[];
//         positionStrategy?: FlexibleConnectedPositionStrategy;
//         positionSubscription: Subscription;
//         push: boolean;
//         scrollStrategy: ScrollStrategy;
//         // scrollStrategyFactory: () => ScrollStrategy;
//         templatePortal: TemplatePortal;
//         transformOriginSelector?: string;
//         viewportMargin: number;
//         width?: number | string;
//     };

// export type CreateConnectedOverlayDirective<T> = Partial<
//     ConnectedOverlayDirective<T>
// >;

// export const setUseConnectedOverlayDirective = <T>(
//     dir: CreateConnectedOverlayDirective<T>
// ): ConnectedOverlayDirective<T> => {
//     const { backdropClass, height, minHeight, minWidth, panelClass, width } =
//         dir;

//     const createPositionStrategy = (
//         use: UseConnectedOverlay<T>
//     ): UseConnectedOverlay<T> => {
//         const {
//             flexibleDimensions,
//             growAfterOpen,
//             lockPosition,
//             offsetX,
//             offsetY,
//             origin,
//             overlay,
//             positions,
//             push,
//             transformOriginSelector,
//             viewportMargin,
//         } = use;
//         const getFlexibleConnectedPositionStrategyOrigin =
//             (): FlexibleConnectedPositionStrategyOrigin => {
//                 if (origin instanceof OverlayOriginDirective) {
//                     return origin.elementRef;
//                 } else {
//                     return origin;
//                 }
//             };

//         /** Returns the position strategy of the overlay to be set on the overlay config */
//         const positionStrategy = overlay.positionBuilder.flexibleConnectedTo(
//             getFlexibleConnectedPositionStrategyOrigin()
//         );
//         const connectedPositions: ConnectedPosition[] = positions.map(
//             (currentPosition) => ({
//                 offsetX: currentPosition.offsetX || offsetX,
//                 offsetY: currentPosition.offsetY || offsetY,
//                 originX: currentPosition.originX,
//                 originY: currentPosition.originY,
//                 overlayX: currentPosition.overlayX,
//                 overlayY: currentPosition.overlayY,
//                 panelClass: currentPosition.panelClass,
//             })
//         );

//         use.positionStrategy = positionStrategy
//             .setOrigin(getFlexibleConnectedPositionStrategyOrigin())
//             .withPositions(connectedPositions)
//             .withFlexibleDimensions(flexibleDimensions)
//             .withPush(push)
//             .withGrowAfterOpen(growAfterOpen)
//             .withViewportMargin(viewportMargin)
//             .withLockedPosition(lockPosition)
//             .withTransformOriginOn(transformOriginSelector);

//         return use;
//     };

//     const setOverlay = (
//         use: UseConnectedOverlay<T>
//     ): UseConnectedOverlay<T> => {
//         const { dir, hasBackdrop, positionStrategy } = use;
//         // const createOverlayRef = {
//         //    animationMode: inject(ANIMATION_MODULE_TYPE),
//         //    componentFactoryResolver: inject(ComponentFactoryResolver),
//         //    config: {} as OverlayConfig,
//         //    container: inject(OverlayContainer),
//         //    directionality: inject(Directionality),
//         //    document: inject(DOCUMENT),
//         //    injector: inject(Injector),
//         //    keyboardDispatcher: inject(OverlayKeyboardDispatcher),
//         //    location: inject(Location),
//         //    ngZone: inject(NgZone),
//         //    outsideClickDispatcher: inject(OverlayOutsideClickDispatcher),
//         //    positionBuilder: inject(OverlayPositionBuilder),
//         //    scrollStrategies: inject(ScrollStrategyOptions),
//         // };
//         use.overlay && (use.overlay = createOverlayRef);
//         setOverlayConfig(use, hasBackdrop, positionStrategy, dir);
//         use.overlay = createOverlay(createOverlayRef);
//         return use;
//     };

//     const setOverlayConfig = (
//         use: UseConnectedOverlay<T>,
//         hasBackdrop: boolean,
//         positionStrategy: FlexibleConnectedPositionStrategy,
//         dir: Directionality
//     ): OverlayConfig => {
//         use.overlay &&
//             (use.overlay.config = new OverlayConfig({
//                 backdropClass,
//                 direction: dir,
//                 hasBackdrop: hasBackdrop,
//                 height,
//                 minHeight,
//                 minWidth,
//                 panelClass,
//                 positionStrategy: positionStrategy,
//                 scrollStrategy: use.overlay.optionsStrategyScroll.reposition(),
//                 width,
//             }));
//         return use?.overlay;
//     };

//     return pipe(
//         // createPositionStrategy, in onChanges
//         setOverlay
//     )(
//         (dir.use = {
//             attach: new EventEmitter<void>(),
//             attachSubscription: Subscription.EMPTY,
//             // backdropClass: , in onChanges
//             backdropClick: new EventEmitter<MouseEvent>(),
//             backdropSubscription: Subscription.EMPTY,

//             detach: new EventEmitter<void>(),
//             detachSubscription: Subscription.EMPTY,
//             dir: inject(Directionality),
//             disableClose: false,
//             flexibleDimensions: false,
//             growAfterOpen: false,
//             hasBackdrop: false,
//             // height: , in onChanges
//             lockPosition: false,
//             // context:,
//             // elementRef:,
//             // optionsEmbeddedViewRef:,
//             // viewRef:,
//             ngZone: inject(ZONE_TOKEN),
//             // minHeight: , in onChanges
//             // minWidth: , in onChanges
//             // offsetX: , in onChanges
//             // offsetY: ,in onChanges
//             open: false,
//             // origin: , in onChanges
//             // overlay: , in onChanges
//             overlayKeydown: new EventEmitter<KeyboardEvent>(),
//             overlayOutsideClick: new EventEmitter<MouseEvent>(),
//             // panelClass: , in onChanges
//             // position: , in onChanges
//             positionChange: new EventEmitter<ConnectedOverlayPositionChange>(),
//             // positions: defaultPositionList,   in onChanges
//             // positionStrategy: , in onChanges
//             positionSubscription: Subscription.EMPTY,
//             push: false,
//             scrollStrategy: use.scrollStrategyFactory(),
//             subscriptions: null,
//             templatePortal: new TemplatePortal(
//                 use.templateRef,
//                 use.viewContainerRef
//             ),
//             templateRef: inject(TemplateRef<T>),
//             viewContainerRef: inject(VIEW_CONTAINER_REF_TOKEN),
//             // transformOriginSelector: , in onChanges
//             viewportMargin: 0,
//             // width: ,
//         })
//     );
// };

// /**
//  * Directive to facilitate declarative creation of an
//  * Overlay using a FlexibleConnectedPositionStrategy.
//  */
// @Directive({
//     exportAs: 'connectedOverlay',
//     selector: '[connectedOverlay]',
// })
// export class ConnectedOverlayDirective<T> implements OnDestroy, OnChanges {
//     /** Origin for the connected overlay. */
//     @Input('connectedOverlayOrigin')
//     origin!: OverlayOriginDirective | FlexibleConnectedPositionStrategyOrigin;
//     /** Registered connected position pairs. */
//     @Input('connectedOverlayPositions') positions!: ConnectedPosition[];
//     /**
//      * This input overrides the positions input if specified. It lets users pass
//      * in arbitrary positioning strategies.
//      */
//     @Input('connectedOverlayPositionStrategy')
//     positionStrategy!: FlexibleConnectedPositionStrategy;
//     /** The width of the overlay panel. */
//     @Input('connectedOverlayWidth') width!: number | string;
//     /** The height of the overlay panel. */
//     @Input('connectedOverlayHeight') height!: number | string;
//     /** The min width of the overlay panel. */
//     @Input('connectedOverlayMinWidth') minWidth!: number | string;
//     /** The min height of the overlay panel. */
//     @Input('connectedOverlayMinHeight') minHeight!: number | string;
//     /** The custom class to be set on the backdrop element. */
//     @Input('connectedOverlayBackdropClass') backdropClass!: string | string[];
//     /** The custom class to add to the overlay pane element. */
//     @Input('connectedOverlayPanelClass') panelClass!: string | string[];
//     /** Margin between the overlay and the viewport edges. */
//     @Input('connectedOverlayViewportMargin') viewportMargin = 0;
//     /** Strategy to be used when handling scroll events while the overlay is open. */
//     @Input('connectedOverlayScrollStrategy') scrollStrategy: ScrollStrategy;
//     /** Whether the overlay is open. */
//     @Input('connectedOverlayOpen') open = false;
//     /** Whether the overlay can be closed by user interaction. */
//     @Input('connectedOverlayDisableClose') disableClose = false;
//     /** CSS selector which to set the transform origin. */
//     @Input('connectedOverlayTransformOriginOn')
//     transformOriginSelector!: string;
//     /** Event emitted when the backdrop is clicked. */
//     @Output() readonly backdropClick = new EventEmitter<MouseEvent>();
//     /** Event emitted when the position has changed. */
//     @Output() readonly positionChange =
//         new EventEmitter<ConnectedOverlayPositionChange>();
//     /** Event emitted when the overlay has been attached. */
//     @Output() readonly attach = new EventEmitter<void>();
//     /** Event emitted when the overlay has been detached. */
//     @Output() readonly detach = new EventEmitter<void>();
//     /** Emits when there are keyboard events that are targeted at the overlay. */
//     @Output() readonly overlayKeydown = new EventEmitter<KeyboardEvent>();
//     /** Emits when there are mouse outside click events that are targeted at the overlay. */
//     @Output() readonly overlayOutsideClick = new EventEmitter<MouseEvent>();
//     use!: UseConnectedOverlay<T>;
//     // private _overlay: OverlayRef;
//     // private _templatePortal: TemplatePortal;
//     // private _hasBackdrop = false;
//     // private _lockPosition = false;
//     // private _growAfterOpen = false;
//     // private _flexibleDimensions = false;
//     // private _push = false;
//     // private _backdropSubscription = Subscription.EMPTY;
//     // private _attachSubscription = Subscription.EMPTY;
//     // private _detachSubscription = Subscription.EMPTY;
//     // private _positionSubscription = Subscription.EMPTY;
//     // private _offsetX: number;
//     // private _offsetY: number;
//     // private _position: FlexibleConnectedPositionStrategy;
//     // private _scrollStrategyFactory: () => ScrollStrategy;

//     // TODO(jelbourn): inputs for size, scroll behavior, animation, etc.
//     constructor(
//         // private _overlay: Overlay,
//         templateRef: TemplateRef<any>,
//         viewContainerRef: ViewContainerRef
//         // @Inject(CONNECTED_OVERLAY_SCROLL_STRATEGY)
//         // scrollStrategyFactory: any,
//         // @Optional() private _dir: Directionality
//     ) {
//         setUseConnectedOverlayDirective(this);

//         // this._templatePortal = new TemplatePortal(
//         //    templateRef,
//         //    viewContainerRef
//         // );
//         // this._scrollStrategyFactory = scrollStrategyFactory;
//         // this.scrollStrategy = this._scrollStrategyFactory();
//     }

//     /** The offset in pixels for the overlay connection point on the y-axis */
//     @Input('connectedOverlayOffsetY')
//     get offsetY() {
//         return this._offsetY;
//     }
//     set offsetY(offsetY: number) {
//         this._offsetY = offsetY;

//         if (this._position) {
//             this._updatePositionStrategy(this._position);
//         }
//     }

//     /** Whether or not the overlay should attach a backdrop. */
//     @Input('connectedOverlayHasBackdrop')
//     get hasBackdrop(): boolean {
//         return this._hasBackdrop;
//     }
//     set hasBackdrop(value: BooleanInput) {
//         this._hasBackdrop = coerceBooleanProperty(value);
//     }

//     /** Whether or not the overlay should be locked when scrolling. */
//     @Input('connectedOverlayLockPosition')
//     get lockPosition(): boolean {
//         return this._lockPosition;
//     }
//     set lockPosition(value: BooleanInput) {
//         this._lockPosition = coerceBooleanProperty(value);
//     }

//     /** Whether the overlay's width and height can be constrained to fit within the viewport. */
//     @Input('connectedOverlayFlexibleDimensions')
//     get flexibleDimensions(): boolean {
//         return this._flexibleDimensions;
//     }
//     set flexibleDimensions(value: BooleanInput) {
//         this._flexibleDimensions = coerceBooleanProperty(value);
//     }

//     /** Whether the overlay can grow after the initial open when flexible positioning is turned on. */
//     @Input('connectedOverlayGrowAfterOpen')
//     get growAfterOpen(): boolean {
//         return this._growAfterOpen;
//     }
//     set growAfterOpen(value: BooleanInput) {
//         this._growAfterOpen = coerceBooleanProperty(value);
//     }

//     /** Whether the overlay can be pushed on-screen if none of the provided positions fit. */
//     @Input('connectedOverlayPush')
//     get push(): boolean {
//         return this._push;
//     }
//     set push(value: BooleanInput) {
//         this._push = coerceBooleanProperty(value);
//     }

//     /** The associated overlay reference. */
//     get overlay(): OverlayRef {
//         return this._overlay;
//     }

//     /** The element's layout direction. */
//     get dir(): Direction {
//         return this._dir ? this._dir.value : 'ltr';
//     }
//     /** The offset in pixels for the overlay connection point on the x-axis */
//     @Input('connectedOverlayOffsetX')
//     get offsetX(): number {
//         return this._offsetX;
//     }
//     set offsetX(offsetX: number) {
//         this._offsetX = offsetX;

//         if (this._position) {
//             this._updatePositionStrategy(this._position);
//         }
//     }

//     ngOnDestroy() {
//         this._attachSubscription.unsubscribe();
//         this._detachSubscription.unsubscribe();
//         this._backdropSubscription.unsubscribe();
//         this._positionSubscription.unsubscribe();

//         if (this._overlay) {
//             this._overlay.dispose();
//         }
//         this.scrollStrategy = this._scrollStrategyFactory();
//     }

//     ngOnChanges(changes: SimpleChanges) {
//         if (this._position) {
//             this._updatePositionStrategy(this._position);
//             this._overlay.updateSize({
//                 height: this.height,
//                 minHeight: this.minHeight,
//                 minWidth: this.minWidth,
//                 width: this.width,
//             });

//             if (changes['origin'] && this.open) {
//                 this._position.apply();
//             }
//         }

//         if (changes['open']) {
//             this.open ? this._attachOverlay() : this._detachOverlay();
//         }

//         pipe((use: UseConnectedOverlay<T>) => {
//             use.offsetY = changes.offsetY.currentValue;

//             if (this._position) {
//                 this._updatePositionStrategy(this._position);
//             }
//         })(this.use);
//     }

//     /** Creates an overlay */
//     private _createOverlay() {
//         if (!this.positions || !this.positions.length) {
//             this.positions = defaultPositionList;
//         }

//         const overlay = (this._overlay = this._overlay.create(
//             this._buildConfig()
//         ));
//         this._attachSubscription = overlay
//             .attachments()
//             .subscribe(() => this.attach.emit());
//         this._detachSubscription = overlay
//             .detachments()
//             .subscribe(() => this.detach.emit());
//         overlay.keydownEvents().subscribe((event: KeyboardEvent) => {
//             this.overlayKeydown.next(event);

//             if (
//                 event.keyCode === ESCAPE &&
//                 !this.disableClose &&
//                 !hasModifierKey(event)
//             ) {
//                 event.preventDefault();
//                 this._detachOverlay();
//             }
//         });

//         this._overlay
//             .outsidePointerEvents()
//             .subscribe((event: MouseEvent) => {
//                 this.overlayOutsideClick.next(event);
//             });
//     }

//     /** Builds the overlay config based on the directive's inputs */
//     private _buildConfig(): OverlayConfig {
//         const positionStrategy = (this._position =
//             this.positionStrategy || this._createPositionStrategy());
//         const overlayConfig = new OverlayConfig({
//             direction: this._dir,
//             hasBackdrop: this.hasBackdrop,
//             positionStrategy,
//             scrollStrategy: this.scrollStrategy,
//         });

//         if (this.width || this.width === 0) {
//             overlayConfig.width = this.width;
//         }

//         if (this.height || this.height === 0) {
//             overlayConfig.height = this.height;
//         }

//         if (this.minWidth || this.minWidth === 0) {
//             overlayConfig.minWidth = this.minWidth;
//         }

//         if (this.minHeight || this.minHeight === 0) {
//             overlayConfig.minHeight = this.minHeight;
//         }

//         if (this.backdropClass) {
//             overlayConfig.backdropClass = this.backdropClass;
//         }

//         if (this.panelClass) {
//             overlayConfig.panelClass = this.panelClass;
//         }

//         return overlayConfig;
//     }

//     /** Updates the state of a position strategy, based on the values of the directive inputs. */
//     private _updatePositionStrategy(
//         positionStrategy: FlexibleConnectedPositionStrategy
//     ) {
//         const positions: ConnectedPosition[] = this.positions.map(
//             (currentPosition) => ({
//                 offsetX: currentPosition.offsetX || this.offsetX,
//                 offsetY: currentPosition.offsetY || this.offsetY,
//                 originX: currentPosition.originX,
//                 originY: currentPosition.originY,
//                 overlayX: currentPosition.overlayX,
//                 overlayY: currentPosition.overlayY,
//                 panelClass: currentPosition.panelClass || undefined,
//             })
//         );

//         return positionStrategy
//             .setOrigin(this._getFlexibleConnectedPositionStrategyOrigin())
//             .withPositions(positions)
//             .withFlexibleDimensions(this.flexibleDimensions)
//             .withPush(this.push)
//             .withGrowAfterOpen(this.growAfterOpen)
//             .withViewportMargin(this.viewportMargin)
//             .withLockedPosition(this.lockPosition)
//             .withTransformOriginOn(this.transformOriginSelector);
//     }

//     private _getFlexibleConnectedPositionStrategyOrigin(): FlexibleConnectedPositionStrategyOrigin {
//         if (this.origin instanceof OverlayOriginDirective) {
//             return this.origin.elementRef;
//         } else {
//             return this.origin;
//         }
//     }

//     /** Attaches the overlay and subscribes to backdrop clicks if backdrop exists */
//     private _attachOverlay() {
//         if (!this._overlay) {
//             this._createOverlay();
//         } else {
//             // Update the overlay size, in case the directive's inputs have changed
//             this._overlay.getConfig().hasBackdrop = this.hasBackdrop;
//         }

//         if (!this._overlay.hasAttached()) {
//             this._overlay.attach(this._templatePortal);
//         }

//         if (this.hasBackdrop) {
//             this._backdropSubscription = this._overlay
//                 .backdropClick()
//                 .subscribe((event) => {
//                     this.backdropClick.emit(event);
//                 });
//         } else {
//             this._backdropSubscription.unsubscribe();
//         }

//         this._positionSubscription.unsubscribe();

//         // Only subscribe to `positionChanges` if requested, because putting
//         // together all the information for it can be expensive.
//         if (this.positionChange.observers.length > 0) {
//             this._positionSubscription = this._position.positionChanges
//                 .pipe(takeWhile(() => this.positionChange.observers.length > 0))
//                 .subscribe((position) => {
//                     this.positionChange.emit(position);

//                     if (this.positionChange.observers.length === 0) {
//                         this._positionSubscription.unsubscribe();
//                     }
//                 });
//         }
//     }

//     /** Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists */
//     private _detachOverlay() {
//         if (this._overlay) {
//             this._overlay.detach();
//         }

//         this._backdropSubscription.unsubscribe();
//         this._positionSubscription.unsubscribe();
//     }
// }

// /** @docs-private */
// export function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(
//     overlay: Overlay
// ): () => RepositionScrollStrategy {
//     return () => overlay.scrollStrategies.reposition();
// }

// /// ** @docs-private */
// // export const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
// //    deps: [Overlay],
// //    provide: CONNECTED_OVERLAY_SCROLL_STRATEGY,
// //    useFactory: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY,
// // };
