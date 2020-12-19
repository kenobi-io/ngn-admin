import { ThrowStmt } from '@angular/compiler';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { HeroById } from '@api/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Main } from '../../api/ex3.dci';

import { RestApiService } from '../../api/services/rest-api.service';
import { Hero } from '../services/proto/hero/hero_pb';


@Component({
  selector: 'ngn-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  count = 0;
  test: Observable<object>;

  constructor(private authService: AuthService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.test = new Observable<HeroById.AsObject>();
  }

  add() {
    Main();
    // this.count++;
    // this.test = this.authService.test1();
    // this.authService.test(1).then((data: Hero) => console.log('Hero => ', data));
  }
}