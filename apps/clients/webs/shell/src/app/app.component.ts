import { Component } from '@angular/core';
import { Message } from '@ngn-template/api-interfaces';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'ngn-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'shell';
    hello$ = this.http.get<Message>(environment.prefix);
    constructor(private http: HttpClient) {}
}
