import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule],
    selector: 'ngn-slide-over',
    standalone: true,
    styleUrls: ['./slide-over.component.scss'],
    templateUrl: './slide-over.component.html',
})
export class SlideOverComponent {}
