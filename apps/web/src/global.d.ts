/// <reference path="./app/user/directives/add-user/add-user.ts" />
import { Observable } from 'rxjs';

export {};
declare global {
  declare var chain: <T>(model?: T) => Platform.Chainable<T>;
  declare namespace Platform {
    function setChain(
      _chain: <T>(model?: T) => Chainable<T>,
      addCommands: <T>(_chain: <T>(model?: T) => Chainable<T>) => void
    ): <T>(model?: T) => Chainable<T>;
    declare var _localChainVariable: Chainable<T>;
    interface Chainable<T> {
      model: T;
      observable: Observable<T>;
      [x: string]: any;
      add(name: string, fn: Function, option?: any[]): void;
    }
  }
}
