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
    selector: 'ngn-dashboard-icon-svg',
    standalone: true,
    templateUrl: './dashboard-icon-svg.component.svg',
})
export class DashboardIconSvgComponent {}
