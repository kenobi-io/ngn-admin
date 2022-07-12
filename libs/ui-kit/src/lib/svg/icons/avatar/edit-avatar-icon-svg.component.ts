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
    selector: 'ngn-edit-avatar-icon-svg',
    standalone: true,
    templateUrl: './edit-avatar-icon-svg.component.svg',
})
export class EditAvatarIconSvgComponent {}
