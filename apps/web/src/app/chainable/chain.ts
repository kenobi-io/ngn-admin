import { Observable } from 'rxjs';

export namespace Platform {
  let _localChainVariable: Chainable<any>;

  const start = (
    _chain: <T>(model?: T) => Chainable<T>,
    addCommands: (_chain: <T>(model?: T) => Chainable<T>) => void
  ) => {
    _chain(new Chainable() as any);
    addCommands(_chain);
  };

  export function setChain<T>(
    _chain: <T>(model?: T) => Chainable<T>,
    addCommands: (_chain: <T>(model?: T) => Chainable<T>) => void
  ): <T>(model?: T) => Chainable<T> {
    // const ch = new Chainable();
    _chain = <T>(model?: T): Chainable<T> => {
      if (_localChainVariable) {
        return _localChainVariable;
      }
      if (model) {
        _localChainVariable = new Chainable(model) as any;
        return _localChainVariable;
      }
      _localChainVariable = new Chainable(null) as any;
      return _localChainVariable;
    };
    start(_chain, addCommands);
    window.chain = _chain as any;
    return _chain;
  }

  export class Chainable<T> {
    model: T;
    observable: Observable<T>;
    [x: string]: any;
    constructor(_model?: T) {
      this.model = _model;
    }
    add(name: string, fn: Function, option?: OptionChainable[]): void {
      this[name] = fn;
    }
  }
  export class Descriptor {}

  export class OptionChainable {}
}

export type Pch<T> = Platform.Chainable<T>;
