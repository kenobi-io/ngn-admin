import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, RouterModule],
    selector: 'ngn-auth-entry',
    standalone: true,
    template: '<router-outlet></router-outlet>',
})
export class EntryComponent {}
