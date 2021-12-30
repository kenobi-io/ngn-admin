import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserDirective } from './directives/add-user/add-user.directive';

// Array.prototype.mapToNumbers = () => console.log('!!!!!!!!!');

@NgModule({
  declarations: [AddUserDirective],
  imports: [CommonModule],
  exports: [AddUserDirective],
})
export class UserModule {}
