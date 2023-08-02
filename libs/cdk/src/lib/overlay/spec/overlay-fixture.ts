import { OverlayPositionBuilder } from '@angular/cdk/overlay';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ElementRef,
    Injector,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Model, Optional } from '@core-template';
import { jest } from '@jest/globals';
import { Observable, Subject, Subscription } from 'rxjs';

import { mockNgZone } from '../../directive/spec/directive.fixture';
import {
    mockLocation,
    mockPlatform,
} from '../../platform/spec/platform.fixture';
import {
    BlockStrategyScroll,
    CloseStrategyScroll,
    DispatcherScroll,
    NoopStrategyScroll,
    RepositionStrategyScroll,
} from '../../scroll';
import {
    ChangesOverlayRef,
    ConfigOverlay,
    ContainerOverlay,
    DispatcherOverlay,
    KeyboardDispatcherOverlay,
    OptionsStrategyScrollOverlay,
    OutsideClickDispatcherOverlay,
    Overlay,
    OverlayRef,
} from '../data';

type DataOverlayMock = { content: string };

const mockDispatcherOverlay: DispatcherOverlay = {
    attachedOverlay: undefined,
    attachedOverlays: [],
    document: document,
    isAttached: true,
};

const createMockDispatcherOverlay = <T>(
    eventType: 'keydown' | 'click',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: any
): T => {
    return eventType === 'click'
        ? {
              ...obj,
              clickListener: jest.fn(),
              pointerDownListener: jest.fn(),
          }
        : {
              ...obj,
              keydownListener: jest.fn(),
          };
};

const createMockOverlayRef = <T>(
    obj: Optional<
        OverlayRef<T>,
        'backdropClickHandler' | 'backdropTransitionendHandler'
    >
): OverlayRef<T> => {
    return {
        ...obj,
        backdropClickHandler: jest.fn(),
        backdropTransitionendHandler: jest.fn(),
    };
};

const createMockOverlay = <T>(
    obj: Optional<
        Overlay<T>,
        'appRef' | 'componentFactoryResolver' | 'injector' | 'positionBuilder'
    >
): Overlay<T> => ({
    ...obj,
    appRef: TestBed.inject(ApplicationRef),
    componentFactoryResolver: TestBed.inject(ComponentFactoryResolver),
    injector: TestBed.inject(Injector),
    positionBuilder: TestBed.inject(OverlayPositionBuilder),
});

export const mockKeyboardDispatcherOverlay: KeyboardDispatcherOverlay =
    createMockDispatcherOverlay('keydown', {
        ...mockDispatcherOverlay,
        kindof: 'KeyboardDispatcherOverlay',
        ngZone: mockNgZone,
    });

export const mockOutsideClickDispatcherOverlay: OutsideClickDispatcherOverlay =
    createMockDispatcherOverlay('click', {
        ...mockDispatcherOverlay,
        cursorOriginalValue: '',
        cursorStyleIsSet: false,
        kindof: 'OutsideClickDispatcherOverlay',
        ngZone: mockNgZone,
        platform: mockPlatform,
        pointerDownEventTarget: {} as EventTarget,
    });

export const dispatcherScroll: DispatcherScroll<string> = {
    ancestorEmitsEvent: new Observable(),
    auditTimeInMs: 50,
    count: 0,
    directive: undefined,
    directives: [],
    document: document,
    elementOrElementRef: new ElementRef(document.body),
    globalSubscription: new Subscription(),
    // platform: mockPlatform,
    registeredEmitsEvent: new Observable(),
    scrollContainers: new Map(),
    scrolled: new Subject(),
    withinElementContained: false,
};

type StrategiesScrollOverlayConfigOverlayMock<T> =
    | BlockStrategyScroll<T>
    | CloseStrategyScroll<T>
    | RepositionStrategyScroll<T>
    | NoopStrategyScroll<T>;

const mockDispatcherScroll: DispatcherScroll<unknown> = {
    auditTimeInMs: 50,
    count: 0,
    // platform: mockPlatform,
    scrollContainers: new Map<any, any>(),
    scrolled: new Subject<any>(),
};

const mockOptionsStrategyScrollOverlay: OptionsStrategyScrollOverlay<DataOverlayMock> =
    {
        block: mockBlockStrategyScroll,
        close: mockCloseStrategyScroll,
        configClose: mockConfigCloseStrategyScroll,
        configReposition: {
            autoClose: true,
            overlayRef: undefined as unknown as OverlayRef<unknown>,
            scrollThrottle: 300,
        },
        dispatcher: mockDispatcherScroll,
        document: document,
        ngZone: mockNgZone,
        noop: {} as NoopStrategyScroll<unknown>,
        reposition: mockRepositionStrategyScroll,
        viewportRulerScroll: mockViewportRulerScroll,
    };

const mockConfigOverlay: ConfigOverlay<
    Model,
    StrategiesScrollOverlayConfigOverlayMock<Model>
> = {
    backdropClass: 'custom-backdrop-class',
    direction: 'ltr',
    disposeOnNavigation: true,
    hasBackdrop: true,
    height: '400px',
    maxHeight: '800px',
    maxWidth: '600px',
    minHeight: '200px',
    minWidth: '200px',
    panelClass: 'custom-overlay-class',
    strategyScroll: mockBlockStrategyScroll,
    width: '300px',
};

const mockChangesOverlayRef: ChangesOverlayRef<unknown> = {
    animationsDisabled: false,
    backdrop: document.createElement('div') as any,
    backdropElement: document.createElement('div') as any,
    backdropTimeout: 0,
    componentEmbeddedRef: document.createElement('div') as any,
    config: mockConfigOverlay,
    detachmentResult: document.createElement('div') as any,
    direction: 'ltr',
    directionality: document.createElement('div') as any,
    host: document.createElement('div') as any,
    hostElement: document.createElement('div') as any,
    keydownEvents: new Subject<KeyboardEvent>(),
    outsidePointerEvents: new Subject<MouseEvent>(),
    overlayElement: document.createElement('div') as any,
    pane: document.createElement('div') as any,
    panelClass: '',
    portal: document.createElement('div') as any,
    portalOutlet: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        disposeFn: () => {},
        isDisposed: false,
        // mapStrategyFnsAttach: new Map(),
        // strategyAttachKind: 'ComponentPortal',
    },
    previousHostParent: document.createElement('div') as any,
    sizeConfig: { height: '100px', width: '100px' },
    toggleClasses: [],
};

const mockContainerOverlay: ContainerOverlay = {
    body: document.createElement('div'),
    document: document,
    platform: mockPlatform,
};

export const mockOverlayRef: OverlayRef<DataOverlayMock> = createMockOverlayRef(
    {
        attachments: new Subject<void>(),
        backdropClick: new Subject<MouseEvent>(),
        detachments: new Subject<void>(),
        document: document,
        keyboardDispatcher: mockKeyboardDispatcherOverlay,
        location: mockLocation,
        locationChanges: new Subscription(),
        ngZone: mockNgZone,
        outsideClickDispatcher: mockOutsideClickDispatcherOverlay,
        ...mockChangesOverlayRef,
    }
);

export const mockOverlay: Overlay<DataOverlayMock> =
    createMockOverlay<DataOverlayMock>({
        config: mockConfigOverlay,
        container: mockContainerOverlay,
        ngZone: mockNgZone,
        optionsStrategyScroll: mockOptionsStrategyScrollOverlay,
        ref: mockOverlayRef,
    });
