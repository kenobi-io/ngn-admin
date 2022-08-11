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
    selector: 'ngn-icon-tab',
    standalone: true,
    styleUrls: ['./icon-tab.component.scss'],
    templateUrl: './icon-tab.component.html',
})
export class IconTabComponent {}
