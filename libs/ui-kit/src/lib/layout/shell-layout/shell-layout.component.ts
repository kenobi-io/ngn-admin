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
    selector: 'ngn-shell-layout',
    standalone: true,
    templateUrl: './shell-layout.component.html',
})
export class ShellLayoutComponent {}
