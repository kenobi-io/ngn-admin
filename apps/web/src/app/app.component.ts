import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RestApiService } from './api/services/rest-api.service';

@Component({
  selector: 'ngn-admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public hello$: Observable<any>;

  constructor(private apiService: RestApiService) { }

  ngOnInit(): void {
  }
}