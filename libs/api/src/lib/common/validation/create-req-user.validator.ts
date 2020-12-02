import { Validator } from 'fluentvalidation-ts';
import { CreateReqUser } from '@api/core';

export class CreateReqUserValidator extends Validator<CreateReqUser> {
  constructor() {

    super();
    
    this.ruleFor('email')
      .emailAddress()
      .withMessage('Incorrect email');
      
    this.ruleFor('name')
      .notEmpty()
      .withMessage('Please enter your name');

    this.ruleFor('password')
      .notEmpty()
      .notNull()
      .maxLength(128)
      .must((value: string) => typeof  value === 'string')
      .withMessage('Please enter your name');

    this.ruleFor('avatar')
      .notEmpty()
      .must((value: string) => typeof  value === 'string')
      .maxLength(500)
      .withMessage('Please enter your name');
  }
}
