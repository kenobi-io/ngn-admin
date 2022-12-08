import { Directive, Input, OnChanges, OnDestroy } from '@angular/core';
import {
    clearViewContainerRef,
    createViewRef,
    destroyViewRef,
} from '@ngn-template/cdk';
import { pipe } from 'rxjs';

import {
    ChangesPopover,
    ContextPopover,
    FireUsePopover,
    InputOptionsOpenPopover,
} from '../../data';
import {
    createContextUsePopover,
    createListenerFireBtnPopover,
    createUsePopover,
    openPopover,
    setOptionsOpenPopover,
} from '../../interactions';

@Directive({ selector: '[firePopover]', standalone: true })
export class FirePopoverDirective<T> implements OnDestroy, OnChanges {
    @Input() firePopoverInstanceof!: T;
    @Input('firePopoverOptions') options!: InputOptionsOpenPopover<T>;
    use!: FireUsePopover<T>;

    constructor() {
        createUsePopover(this);
    }

    ngOnChanges(changes: ChangesPopover<T>): void {
        pipe(
            (use: FireUsePopover<T>) =>
                (use.optionsOpen = changes.options.currentValue) && use,
            createContextUsePopover,
            createViewRef<T, FireUsePopover<T>>,
            createListenerFireBtnPopover
        )(this.use);
    }

    onClick(): void {
        pipe(setOptionsOpenPopover, openPopover)(this.use);
    }

    ngOnDestroy(): void {
        pipe(clearViewContainerRef, destroyViewRef)(this.use);
    }

    static ngTemplateContextGuard<T>(
        dir: FirePopoverDirective<T>,
        ctx: unknown
    ): ctx is ContextPopover<T> {
        return true;
    }
}
