import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';

import { TooltipComponentBase } from './directives/tooltip.directive';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule],
    selector: 'tooltip',
    standalone: true,
    styleUrls: ['./tooltip.component.scss'],
    templateUrl: './tooltip.component.html',
})
export class TooltipComponent {}

/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '(mouseleave)': '_handleMouseLeave($event)',
        // Forces the element to have a layout in IE and Edge. This fixes issues where the element
        // won't be rendered if the animations are disabled or there is no web animations polyfill.
        '[style.zoom]': 'isVisible() ? 1 : null',
        'aria-hidden': 'true',
    },
    selector: 'mat-tooltip-component',
    styleUrls: ['tooltip.css'],
    templateUrl: 'tooltip.html',
})
export class TooltipComponent extends TooltipComponentBase {
    /* Whether the tooltip text overflows to multiple lines */
    _isMultiline = false;

    /** Reference to the internal tooltip element. */
    @ViewChild('tooltip', {
        // Use a static query here since we interact directly with
        // the DOM which can happen before `ngAfterViewInit`.
        static: true,
    })
    _tooltip: ElementRef<HTMLElement>;
    _showAnimation = 'mat-mdc-tooltip-show';
    _hideAnimation = 'mat-mdc-tooltip-hide';

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        private _elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject(ANIMATION_MODULE_TYPE) animationMode?: string
    ) {
        super(changeDetectorRef, animationMode);
    }

    protected override _onShow(): void {
        this._isMultiline = this._isTooltipMultiline();
        this._markForCheck();
    }

    /** Whether the tooltip text has overflown to the next line */
    private _isTooltipMultiline() {
        const rect = this._elementRef.nativeElement.getBoundingClientRect();
        return rect.height > MIN_HEIGHT && rect.width >= MAX_WIDTH;
    }
}
