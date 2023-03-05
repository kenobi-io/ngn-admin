import { Directive, inject, Input, OnChanges, OnDestroy } from '@angular/core';
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
    addListenerFireBtnPopover,
    contextFireUsePopover,
    FIRE_USE_POPOVER,
    FIRE_USE_POPOVER_PROVIDER,
    FirePopover,
    openFireUsePopover,
    setOptionsOpenPopover,
} from '../../interactions';

@Directive({
    providers: [FIRE_USE_POPOVER_PROVIDER],
    selector: '[firePopover]',
    standalone: true,
})
export class FirePopoverDirective<T>
    implements OnDestroy, OnChanges, FirePopover<T>
{
    @Input() firePopoverInstanceof!: T;
    @Input('firePopoverOptions') options!: InputOptionsOpenPopover<T>;
    use: FireUsePopover<T> = inject<FireUsePopover<T>>(FIRE_USE_POPOVER);

    ngOnChanges(changes: ChangesPopover<T>): void {
        pipe(
            (use: FireUsePopover<T>) =>
                (use.optionsOpen = changes.options.currentValue) && use,
            contextFireUsePopover,
            createViewRef<T, FireUsePopover<T>>,
            addListenerFireBtnPopover
        )(this.use);
    }

    onClick(): void {
        pipe(setOptionsOpenPopover, openFireUsePopover)(this.use);
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
