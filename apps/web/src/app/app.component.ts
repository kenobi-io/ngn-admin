import { Component, OnInit } from '@angular/core';
import { MessageDto } from '@api/types';
import { Observable } from 'rxjs';

import { ApiService } from './api/services/api.service';

@Component({
  selector: 'ngn-admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public hello$: Observable<MessageDto>;
  
  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.hello$ = this.apiService.get<MessageDto>('/api/hello');
  }
}
