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
    selector: 'ngn-contact-icon-svg',
    standalone: true,
    styleUrls: ['contact-icon-svg.component.scss'],
    templateUrl: './contact-icon-svg.component.svg',
})
export class ContactIconSvgComponent {}
