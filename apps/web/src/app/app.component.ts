import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@api/types';

@Component({
  selector: 'ngn-admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public hello$ = this.http.get<Message>('/api/hello');
  // public message: any;
  constructor(private http: HttpClient) {}
}
