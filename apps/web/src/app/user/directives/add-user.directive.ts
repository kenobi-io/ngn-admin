import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Directive({
  selector: 'button[addUser]',
})
export class AddUserDirective {
  private count: number;
  public addUser: EventEmitter<number>;

  constructor(private elementRef: ElementRef) {
    this.count = 0;
  }

  @HostListener('submit', ['$event'])
  submitHandler(event: Event) {
    event.preventDefault();
    console.log('count: ', this.count);
  }
}
