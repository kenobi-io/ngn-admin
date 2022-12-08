/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';
import { Context } from '@ngn-template/cdk';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, OverlayModule],
    selector: 'ngn-popover',
    standalone: true,
    styleUrls: ['./popover.component.scss'],
    templateUrl: './popover.component.html',
})
export class PopoverComponent<T> {
    @Input() componentRef!: ComponentType<T>;
    @Input() componentRefContent!: any[][];
    @Input() templateRef!: TemplateRef<Context<T>>;
    @Input() templateRefContext!: Context<T>;
    @Input() textRef!: string;
}
