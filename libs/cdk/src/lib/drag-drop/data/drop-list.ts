/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { DragRef, Point } from './drag-ref';
import { DropListSortStrategy } from './sorting/drop-list-sort-strategy';

const enum AutoScrollVerticalDirection {
    NONE,
    UP,
    DOWN,
}

const enum AutoScrollHorizontalDirection {
    NONE,
    LEFT,
    RIGHT,
}

type RootNode = DocumentOrShadowRoot & {
    elementFromPoint(x: number, y: number): Element | null;
};

// without Ref
export type DropList<T = any> = {
    element: HTMLElement | ElementRef<HTMLElement>;
    disabled: boolean;
    destroyed: Subject<void>;
    dir?: Directionality;
    sortingDisabled: boolean;
    lockAxis: 'x' | 'y';
    autoScrollDisabled: boolean;
    autoScrollStep: number;
    beforeStarted: Subject<void>;
    entered: Subject<{
        item: DragRef;
        container: DropList;
        currentIndex: number;
    }>;
    exited: Subject<{ item: DragRef; container: DropList }>;
    dropped: Subject<{
        item: DragRef;
        currentIndex: number;
        previousIndex: number;
        container: DropList;
        previousContainer: DropList;
        isPointerOverContainer: boolean;
        distance: Point;
        dropPoint: Point;
        event: MouseEvent | TouchEvent;
    }>;
    sorted: Subject<{
        previousIndex: number;
        currentIndex: number;
        container: DropList;
        item: DragRef;
    }>;
    receivingStarted: Subject<{
        receiver: DropList;
        initiator: DropList;
        items: DragRef[];
    }>;
    receivingStopped: Subject<{
        receiver: DropList;
        initiator: DropList;
    }>;
    data: T;
    // Private properties and fields
    isDragging: boolean;
    parentPositions: ParentPositionTracker;
    sortStrategy: DropListSortStrategy<DragRef>;
    clientRect: ClientRect | undefined;
    draggables: DragRef[];
    siblings: DropList[];
    activeSiblings: Set<DropList>;
    viewportScrollSubscription: Subscription;
    verticalScrollDirection: AutoScrollVerticalDirection;
    horizontalScrollDirection: AutoScrollHorizontalDirection;
    scrollNode: HTMLElement | Window;
    stopScrollTimers: Subject<void>;
    cachedShadowRoot: RootNode | null;
    document: Document;
    scrollableElements: HTMLElement[];
    initialScrollSnap: string;

    lists: DropList<T>[];
    scrollableParentsResolved: boolean;
    dropListRef: DropListRef<ICdkDropList<T>>;
    connectedTo: (ICdkDropList<T> | string)[] | ICdkDropList<T> | string;
    orientation: DropListOrientation;
    id: string;
    dragDrop: DragDrop;
    changeDetectorRef: ChangeDetectorRef;
    scrollDispatcher: ScrollDispatcher;
    group?: CdkDropListGroup<ICdkDropList>;
    unsortedItems: Set<CdkDrag>;
};

export type DropListCapability<T = any> = {
    dropList: DropList<T>;
};
