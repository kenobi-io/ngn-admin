import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'ngn-auth-entry',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: '<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryComponent {}
