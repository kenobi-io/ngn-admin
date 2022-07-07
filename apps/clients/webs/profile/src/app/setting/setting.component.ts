import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'ngn-setting',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingComponent {}
