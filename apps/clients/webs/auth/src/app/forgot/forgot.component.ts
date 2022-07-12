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
    selector: 'ngn-forgot',
    standalone: true,
    styleUrls: ['./forgot.component.scss'],
    templateUrl: './forgot.component.html',
})
export class ForgotComponent {}
