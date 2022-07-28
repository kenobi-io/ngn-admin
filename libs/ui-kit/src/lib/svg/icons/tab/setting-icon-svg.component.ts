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
    selector: 'ngn-setting-icon-svg',
    standalone: true,
    templateUrl: './setting-icon-svg.component.svg',
})
export class SettingIconSvgComponent {}
