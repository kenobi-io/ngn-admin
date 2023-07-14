import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { HTTP_ACCESSES } from '@ngn-template/access';
import { SEARCH_KITS, SVG_KITS, TAB_KITS } from '@ngn-template/ui-kit';

type User = { name: string };

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        HTTP_ACCESSES,
        PortalModule,
        TAB_KITS,
        SEARCH_KITS,
        SVG_KITS,
    ],
    selector: 'ngn-account',
    standalone: true,
    styleUrls: ['./account.component.scss'],
    templateUrl: './account.component.html',
})
export class AccountComponent {
    User!: User[];
}
