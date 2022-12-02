import { Directive, Input, OnChanges, OnDestroy } from '@angular/core';
import {
    clearViewContainerRef,
    createViewRef,
    destroyViewRef,
    unsubscribesFinal,
} from '@ngn-template/access';
import { pipe } from 'rxjs';

import {
    ChangesPopover,
    ContextPopover,
    FireUsePopover,
    InputOptionsOpenPopover,
} from '../../data';
import {
    createContextPopover,
    createListenerFireBtnPopover,
    createUsePopover,
    openPopover,
    setOptionsOpenPopover,
} from '../../interactions';

@Directive({ selector: '[firePopover]', standalone: true })
export class FirePopoverDirective<T> implements OnDestroy, OnChanges {
    @Input('firePopoverOptions') options!: InputOptionsOpenPopover<T>;
    @Input() firePopoverInstanceof!: T;
    use!: FireUsePopover<T>;

    constructor() {
        createUsePopover(this);
    }

    ngOnChanges(changes: ChangesPopover<T>): void {
        pipe(
            (use: FireUsePopover<T>) =>
                (use.optionsOpen = changes.options.currentValue),
            createContextPopover,
            createViewRef<T, FireUsePopover<T>>,
            createListenerFireBtnPopover
        )(this.use);
    }

    onClick() {
        pipe(setOptionsOpenPopover, openPopover)(this.use);
    }

    ngOnDestroy() {
        pipe(
            unsubscribesFinal,
            clearViewContainerRef,
            destroyViewRef
        )(this.use);
    }

    static ngTemplateContextGuard<T>(
        dir: FirePopoverDirective<T>,
        ctx: unknown
    ): ctx is ContextPopover<T> {
        return true;
    }
}
