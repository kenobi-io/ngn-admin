import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
// import { Main } from '../../api/ex3.dci';


@Component({
  selector: 'ngn-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  count = 0;
  test: Observable<object>;
  uns: Subscription;

  constructor(private authService: AuthService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.test = new Observable<HeroById.AsObject>();
  }

  ngOnDestroy(): void {
    this.uns.unsubscribe();
  }

  add() {
    // Main();
    // this.count++;
    // this.test = this.authService.test1();
    
    this.uns = this.authService.test1().subscribe(
      response => console.log('Response: ', response ),
      error => console.log('Error: ', error),
      () => console.log('Complete'),
    );
    //.subscribe((res) => console.log('LoginComponent end: ', res));
    // this.authService.test(1).then((data: Hero) => console.log('Hero => ', data));
  }
}