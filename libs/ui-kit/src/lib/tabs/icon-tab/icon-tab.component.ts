import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    QueryList,
    ViewEncapsulation,
} from '@angular/core';

import { TabComponent } from '../data';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule],
    selector: 'ngn-icon-tab',
    standalone: true,
    templateUrl: './icon-tab.component.html',
})
export class IconTabComponent implements TabComponent {
    @ContentChildren('container, menu')
    public container!: QueryList<ElementRef>;
}
