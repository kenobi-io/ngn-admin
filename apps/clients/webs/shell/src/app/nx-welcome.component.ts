import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'ngn-nx-welcome',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: 'nx-welcome.component.html',
    styleUrls: ['nx-welcome.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxWelcomeComponent {}
