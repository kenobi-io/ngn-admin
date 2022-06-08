import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'ngn-forgot',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotComponent {}
