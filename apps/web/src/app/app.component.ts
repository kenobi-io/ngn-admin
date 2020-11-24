import { Component, OnInit } from '@angular/core';
import { MessageDto } from '@api/types';
import { Observable } from 'rxjs';

import { RestApiService } from './api/services/rest-api.service';

@Component({
  selector: 'ngn-admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public hello$: Observable<MessageDto>;

  constructor(private apiService: RestApiService) { }

  ngOnInit(): void {
  }
}