import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LAYOUT_KITS } from '@ngn-template/ui-kit';

@Component({
    selector: 'ngn-root',
    standalone: true,
    imports: [CommonModule, RouterModule, LAYOUT_KITS],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'shell';
}
