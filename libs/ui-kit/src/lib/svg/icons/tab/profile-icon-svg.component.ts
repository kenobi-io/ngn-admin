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
    selector: 'ngn-profile-icon-svg',
    standalone: true,
    templateUrl: './profile-icon-svg.component.svg',
})
export class ProfileIconSvgComponent {}
