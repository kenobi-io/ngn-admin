import { ExcludeOptional } from '@core-template';
import { Observable, Subject, Subscription } from 'rxjs';

import { Overlay } from '../../overlay';
import { Dimension, Point } from '../../platform';
import { mockPlatform } from '../../platform/spec/platform.fixture';
import {
    cdkScrollableMock,
    mockRectViewportRulerScroll,
    mockViewportRulerScroll,
} from '../../scroll/spec';
import {
    ConnectedOverlayPositionChange,
    FallbackPosition,
    FlexibleConnectedPosition,
    FlexibleConnectedStrategyPosition,
    OverlayFit,
} from '../data';

type ModelMock<T> = {
    value: T;
};

export type ContainerRectFlexMock = ExcludeOptional<
    FlexibleConnectedStrategyPosition<ModelMock<string>>,
    'containerRect'
>;

// Mock dimensions
const originRect: Dimension = {
    bottom: 0,
    height: 50,
    left: 20,
    right: 0,
    top: 10,
    width: 100,
};
const containerRect: Dimension = {
    bottom: 0,
    height: 500,
    left: 0,
    right: 0,
    top: 0,
    width: 500,
};

const mockOverlayFit: OverlayFit = {
    fitsInViewportHorizontally: true,
    fitsInViewportVertically: true,
    isCompletelyWithinViewport: true,
    visibleArea: 100,
};

const mockDimension: Dimension = {
    bottom: 0,
    height: 100,
    left: 0,
    right: 0,
    top: 0,
    width: 200,
};

const mockPoint: Point = {
    x: 0,
    y: 0,
};

const mockFallbackPosition: FallbackPosition = {
    originPoint: mockPoint,
    overlayFit: mockOverlayFit,
    overlayPoint: mockPoint,
    overlayRect: mockDimension,
    position: {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top',
    },
};

const mockFlexibleConnectedPosition: FlexibleConnectedPosition = {
    offsetX: 0,
    offsetY: 0,
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top',
    panelClass: 'custom-panel-class',
    weight: 1,
};

// Mock positions
export const center: FlexibleConnectedPosition = {
    originX: 'center',
    originY: 'center',
    overlayX: 'center',
    overlayY: 'center',
};
export const startTop: FlexibleConnectedPosition = {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
};
export const endBottom: FlexibleConnectedPosition = {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
};

export const mockContainerRectFlex: ContainerRectFlexMock = {
    appliedPanelClasses: [],
    boundingBox: document.createElement('div'),
    boundingBoxRect: mockDimension,
    canPush: true,
    containerRect,
    document: document,
    fallback: mockFallbackPosition,
    growAfterOpen: false,
    hasFlexibleDimensions: false,
    isDisposed: false,
    isInitialRender: true,
    isPushed: false,
    lastBoundingBoxSize: { height: 0, width: 0 },
    lastPosition: mockFlexibleConnectedPosition,
    offsetX: 0,
    offsetXAndY: 0,
    offsetY: 0,
    origin: { nativeElement: document.createElement('div') },
    originRect,
    overlay: document.createElement('div') as unknown as Overlay<
        ModelMock<string>
    >,
    overlayRect: mockDimension,
    pane: document.createElement('div'),
    platform: mockPlatform,
    positionChange: new Observable<ConnectedOverlayPositionChange>(),
    positionChanger: new Subject<ConnectedOverlayPositionChange>(),
    positionLocked: false,
    preferredPositions: [],
    previousPushAmount: { x: 0, y: 0 },
    resizeSubscription: new Subscription(),
    scrollables: [cdkScrollableMock],
    styleOverlayX: {},
    styleOverlayY: { bottom: '', top: '' },
    transformOriginSelector: '',
    viewportMargin: 0,
    viewportRect: mockRectViewportRulerScroll,
    viewportRulerScroll: mockViewportRulerScroll,
};
