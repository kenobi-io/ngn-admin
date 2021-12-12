import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AddUserDirective } from './add-user.directive';
import { AddUseHostComponent } from './fixtures';

describe('AddUserDirective', () => {
  let fixture: ComponentFixture<AddUseHostComponent>;
  let component: AddUseHostComponent;
  let directive: AddUserDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserDirective, AddUseHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUseHostComponent);
    const directiveFixture = TestBed.createComponent(AddUserDirective);
    fixture.detectChanges();
    component = fixture.componentInstance;
    directive = directiveFixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });

  it('should', fakeAsync(() => {
    spyOn(directive, 'submitHandler');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    expect(directive.submitHandler).toHaveBeenCalled();
  }));
});
