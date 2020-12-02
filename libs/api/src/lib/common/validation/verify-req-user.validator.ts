import { Validator } from 'fluentvalidation-ts';
import { VerifyReqUser } from '@api/core';

export class VerifyReqUserValidator extends Validator<VerifyReqUser> {
  constructor() {

    super();
    
    this.ruleFor('email')
      .emailAddress()
      .maxLength(50)
      .withMessage('Incorrect email');

    this.ruleFor('password')
      .notEmpty()
      .maxLength(128)
      .must((value: string) => typeof  value === 'string')
      .withMessage('Please enter your name');
  }
}
