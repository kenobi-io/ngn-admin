import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Account } from '@core-template';
import { SEARCH_KITS } from '@ngn-template/ui-kit';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, HttpClientModule, SEARCH_KITS],
    selector: 'ngn-account',
    standalone: true,
    styleUrls: ['./account.component.scss'],
    templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
    public hello$!: Observable<Account>;
    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.hello$ = this.http.get<Account>(environment.prefix).pipe(
            map((message) => {
                console.log('profile');
                return message;
            })
        );
    }
}
