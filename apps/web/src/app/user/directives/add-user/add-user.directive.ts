import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { RestApiService } from '@web/api';
import { User } from '../../user';

@Directive({
  selector: '[addUser]',
})
export class AddUserDirective {
  private count: number;

  @Input()
  public addUser: any;
  @Output()
  public counter = new EventEmitter();

  constructor(private elementRef: ElementRef, api: RestApiService) {
    this.count = 0;
  }

  @HostListener('submit', ['$event'])
  onSubmit(form: Event) {
    chain<User>()
      .addUser({
        getUser: () => {
          const target = form.target as HTMLFormElement;
          const inputs: HTMLInputElement[] = target.elements as any;
          let user: User = {} as any;
          if (target.name === 'user') {
            form.preventDefault();

            // console.log('global: ', myLib.checkCat());
            // ''.fancyFormat({ fancinessLevel: 5 });

            for (let i = 0; i < inputs.length; i++) {
              if (inputs[i].nodeName === 'INPUT' && inputs[i].type === 'text') {
                user[inputs[i].name] = inputs[i].value;
              }
            }
          }
          return user;
        },
      })
      .addUser({ descriptors: ['get.elements', 'set.user'], params: [form] });
    // .addCar({ 'get.data.from', server, 'set.car');
  }
}
