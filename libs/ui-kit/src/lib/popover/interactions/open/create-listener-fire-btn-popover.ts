import { Type } from '@angular/core';

import { FireUsePopover } from '../../data';

export const createListenerFireBtnPopover = <T>(
    use: FireUsePopover<T>
): FireUsePopover<T> => {
    const { elementRef, renderer } = use;
    let el;

    if (elementRef.nativeElement instanceof Comment) {
        el = elementRef.nativeElement.previousElementSibling;
    } else if (elementRef.nativeElement instanceof Type) {
        el = elementRef.nativeElement;
    }

    renderer.listen(el, 'click', use.onClick);
    return use;
};
