import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, HttpClientModule],
    selector: 'ngn-setting',
    standalone: true,
    styleUrls: ['./setting.component.scss'],
    templateUrl: './setting.component.html',
})
export class SettingComponent {}
