import { ElementRef } from '@angular/core';

import { Portal } from './portal';

/**
 * A `DomPortal` is a portal whose DOM element will be taken from its current position
 * in the DOM and moved into a portal outlet, when it is attached. On detach, the content
 * will be restored to its original position.
 */
export interface DomPortal<T = HTMLElement> extends Portal {
    /** DOM node hosting the portal's content. */
    element: T | ElementRef<T>;
}
