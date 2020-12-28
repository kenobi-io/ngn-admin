import { Account, Constructor, Context, Role } from './ex2.dci';

// const MixAssign = (target: typeof Role, source) => {
//   return new MixinRole().create(Account, source);
// };

type GConstructor<T = {}> = new (...args: any[]) => T;
type Positionable = GConstructor<Account>;

export function SourceRole<TModel extends Positionable>(Model: TModel, CallBack) {
    return class CallBack extends Model {
    //   constructor(a: any[]) {
    //     // super();
    //     // Object.assign(this, config);
    //   }
      public withdraw = (amount): void => {
        const text = 'Withdraw: ' + amount;
        console.log(text);
        this.balance -= amount;
        console.log('Balance: ' + this.balance);
      };
    };
  }
}

export class MoneyTransferContext extends Context {
    
  public source: Role;
  
  constructor() {
    super();
  }

  public transfer(
    sourcePlayer: Account,
    destinationPlayer: Account,
    amount: number
  ): MoneyTransferContext {
    // const source = new MixinRole().create(Account, sourcePlayer);
    // const destination = new MixinRole().create(Account, destinationPlayer);
    // const s: SourceRole 

    // source.withdraw(amount);
    // destination.withdraw(amount);

    // console.log('source.balance', source.balance);
    // console.log('destination.balance', destination.balance);

    return this;
  }
}

export function Ex1Main() {
  let sourceAccount: Account = {
    id: 1,
    balance: 100,
  };

  let destinationAccount: Account = {
    id: 2,
    balance: 0,
  };

  new MoneyTransferContext().transfer(sourceAccount, destinationAccount, 25);
  console.log(sourceAccount);
}

// @Safe({ returnValue: 100 })
// calculate(obj: object): unknown {
//   return obj['value'];
// }
export function Safe<T>(params: SafeDecoratorParams<T> = {}): Function {
    return
    function(
        target: object, 
        propertyKey: string, 
        descriptor: TypedPropertyDescriptor<Function>
        ): TypedPropertyDescriptor<Function> {

      const originalMethod = descriptor.value;
      const logLevel = params.logLevel || SafeDecoratorLogLevel.Default;
      descriptor.value = function SafeWrapper(): SafeDecoratorParams<T> | false {
        try {
          return originalMethod.apply(this, arguments);
        } catch (error) {
          if (logLevel === SafeDecoratorLogLevel.Console) { console.error(error); }
          if (logLevel === SafeDecoratorLogLevel.Sentry) {
            if (!this.errorHandler) {
              throw new Error(
                "Class with 'Safe' decorator and logLevel 2 should have 'errorHandler' class property with 'ErrorHandler' class."
              );
            } else {
              this.errorHandler.handleError(error);
            }
          }
          return params.returnValue !== undefined ? params.returnValue : false;
        }
      };
      return descriptor;
    };
  }


//   @TakeUntilDestroy
//   export class HelloComponent implements OnInit, OnDestroy {
export function TakeUntilDestroy(constructor: Function): void {
    const originalDestroy = constructor.prototype.ngOnDestroy;
    if (typeof originalDestroy !== 'function') {
      console.warn(`${constructor.name} is using @TakeUntilDestroy but does not implement OnDestroy`);
    }
    constructor.prototype.componentDestroy = function(): object {
      this._takeUntilDestroy$ = this._takeUntilDestroy$ || new Subject();
      return this._takeUntilDestroy$.asObservable();
    };
    constructor.prototype.ngOnDestroy = function(...args): void {
      if (typeof originalDestroy === 'function') {
        originalDestroy.apply(this, args);
      }
      if (this._takeUntilDestroy$) {
        this._takeUntilDestroy$.next();
        this._takeUntilDestroy$.complete();
      }
    };
  }



// Each mixin is a traditional ES class
class Jumpable {
    jump() {}
  }
  
  class Duckable {
    duck() {}
  }
  
  // Including the base
  export class Sprite extends Duckable {
      constructor(config) {
          super();
          Object.assign(this, config);
      }
    x = 0;
    y = 0;
  }
  
  // Then you create an interface which merges
  // the expected mixins with the same name as your base
  export interface Sprite extends Jumpable, Duckable {}

  applyMixins(Sprite, [Jumpable, Duckable]);

let player = new Sprite({id : 0});
player.jump();
console.log(player.x, player.y);

// This can live anywhere in your codebase:
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name)
      );
    });
  });
