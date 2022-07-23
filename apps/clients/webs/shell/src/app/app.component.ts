import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_ACCESSES, ROUTE_ACCESSES } from '@ngn-template/access';
import { LAYOUT_KITS } from '@ngn-template/ui-kit';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        LAYOUT_KITS,
        HTTP_ACCESSES,
        ROUTE_ACCESSES,
    ],
    selector: 'ngn-root',
    standalone: true,
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent {
    title = 'shell';
}
