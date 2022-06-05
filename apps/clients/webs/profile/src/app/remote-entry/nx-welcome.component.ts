import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Message } from '@ngn-template/api-interfaces';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ngn-nx-welcome',
  templateUrl: 'nx-welcome.component.html',
  styleUrls: ['nx-welcome.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit {
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
