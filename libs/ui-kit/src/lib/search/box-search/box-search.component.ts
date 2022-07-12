import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';

import { SVG_KITS } from '../../svg';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, SVG_KITS],
    selector: 'ngn-box-search',
    standalone: true,
    styleUrls: ['./box-search.component.scss'],
    templateUrl: './box-search.component.html',
})
export class BoxSearchComponent {}
