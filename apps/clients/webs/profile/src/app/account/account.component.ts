import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Message } from '@ngn-template/api-interfaces';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
    selector: 'ngn-account',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
    public hello$!: Observable<Message>;
    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.hello$ = this.http.get<Message>(environment.prefix).pipe(
            map((message) => {
                console.log('profile');
                return message;
            })
        );
    }
}
