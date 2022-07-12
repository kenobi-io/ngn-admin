import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Account } from '@core-template';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, HttpClientModule],
    selector: 'ngn-reg',
    standalone: true,
    styleUrls: ['./reg.component.scss'],
    templateUrl: './reg.component.html',
})
export class RegComponent implements OnInit {
    public hello$!: Observable<Account>;
    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.hello$ = this.http.get<Account>(environment.prefix).pipe(
            map((account) => {
                console.log('auth');
                return account;
            })
        );
    }
}
