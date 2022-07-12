import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [BrowserModule, RouterModule],
    selector: 'ngn-root',
    standalone: true,
    template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
