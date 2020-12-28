export class Account {
  public id: number;
  public balance: number;
}

export type Constructor = new (...args: any[]) => {};

export function createSourceRole<TModel extends Constructor>(
  Model: TModel | any,
  args
) {
  const create = (args): SourceRole  => {
    const roleModel = new SourceRole(args);
    return roleModel;
  }

  class SourceRole extends Model {
    constructor(config?) {
      super();
      Object.assign(this, args || config);
    }
    public withdraw = (amount): void => {
      const text = 'Withdraw: ' + amount;
      console.log(text);
      this.balance -= amount;
      console.log('Balance: ' + this.balance);
    };
  }
  return create(args);
}

export interface IRoleProvider<TModel> {
  assign<Role>(rolePlayer: TModel): Role;
}

export abstract class Role {}

export class RoleProvider<TModel> implements IRoleProvider<TModel> {
  private cacheName = '__methoD__Cache__';
  private model: TModel | any;

  constructor(public role: Role) {}

  private undo(): void {
    const cacheModel = this.model[this.cacheName];

    for (const propName of Object.keys(this.role)) {
      if (
        this.role.hasOwnProperty(propName) &&
        this.model.hasOwnProperty(propName)
      ) {
        delete this.model[propName];
      }
    }

    delete this.model.undo;

    if (cacheModel) {
      for (let propName of Object.keys(cacheModel)) {
        this.model[propName] = cacheModel[propName];
      }
    }
  }

  public assign<Role>(rolePlayer: TModel): Role {
    this.model = rolePlayer;

    for (const propName of Object.keys(this.role)) {
      if (this.role.hasOwnProperty(propName)) {
        if (this.model.hasOwnProperty(propName)) {
          if (!this.model[this.cacheName]) {
            this.model[this.cacheName] = {};
          }
          this.model[this.cacheName][propName] = this.model[propName];
        }
        this.model[propName] = (...args) => {
          return this.role[propName].apply({ ...this.model }, args);
        };
      }
    }
    this.model.undo = this.undo;
    return this.model;
  }
}

export class DestinationeRole implements Role {
  [x: string]: any;
  public deposit = (amount): void => {
    const text = 'Deposit: ' + amount;
    console.log(text);
    this.balance += amount;
    console.log('Balance: ' + this.balance);
  };
}

export abstract class Context {
  [x: string]: any;
  unbind(): this {
    for (let i = 0, len = this.args.length; i < len; i += 1) {
      const arg = this.args[i];
      arg.unbind && arg.unbind();
    }
    return this;
  }
}

export class MoneyTransferContext extends Context {
  constructor() {
    super();
  }

  public transfer(
    sourcePlayer: Account,
    destinationPlayer: Account,
    amount: number
  ): MoneyTransferContext {
    this.args = Object.assign({}, sourcePlayer, destinationPlayer, amount);

    // let source: SourceRole = new SourceRole();
    // let destination: DestinationeRole = new DestinationeRole();
    // let sourcea = new RoleProvider<Account>(new SourceRole()).assign(
    //   sourcePlayer
    // );
    // source = new RoleProvider<Account>(source).assign(sourcePlayer);
    // destination = new RoleProvider<Account>(destination).assign(
    //   destinationPlayer
    // );
    // source.withdraw(amount);
    // source.withdraw(amount);
    // destination.deposit(amount);

    // const source = new MixinRoleModel().create(Account, SourceRole, this.args);
    // source.withdraw(20);

    // let source: SourceRole = new SourceRole();
    // let destination: DestinationeRole = new DestinationeRole();
    const source1 = createSourceRole(Account, sourcePlayer)
    // const sourceMix = Object.assign({ ...source }, sourcePlayer);
    // const destinationMix = Object.assign({ ...destination }, destinationPlayer);
    source1.withdraw(20);
    // sourceMix.withdraw(amount);
    // destinationMix.deposit(amount);
    // console.log(sourceMix.balance);
    // console.log(source.balance);
    console.log("source1.balance", source1.balance);

    return this;
  }
}

export function Main() {
  let sourceAccount: Account = {
    id: 1,
    balance: 100,
  };

  let destinationAccount: Account = {
    id: 2,
    balance: 0,
  };

  new MoneyTransferContext()
    .transfer(sourceAccount, destinationAccount, 25)
    .unbind();
  console.log(sourceAccount);
}



// var assign = function(role) {
//     var cacheName = "__ methpd Cahce";
//     return {
//         to: function(rolePlayer) {
//             var cache, unbind;
//             for (var prop in role) {
//                 if (role.hasOwnProperty(prop)) {
//                     if (rolePlayer.hasOwnProperty(prop)) {
//                         if (!rolePlayer[cacheName]) {
//                             rolePlayer[cacheName] = {};
//                         }
//                         rolePlayer[cacheName][prop] = rolePlayer[prop];
//                     }
//                     rolePlayer[prop] = function() {
//                         return role[prop].apply(rolePlayer, arguments);
//                     };
//                 }
//             }
//             unbind = rolePlayer.unbind;
//             if(unbind) {
//                 cache.unbind = unbind;
//             }
//             rolePlayer.unbind =  function() {
//               var prop, cache = rolePlayer[cacheName];
//               for (prop in role) {
//                 if (role.hasOwnProperty(prop) && rolePlayer.hasOwnProperty(prop)) {
//                     delete rolePlayer[prop];
//                 }
//               }
//               delete rolePlayer.unbind;
//               if (cache) {
//                 for (var prop in cache) {
//                     rolePlayer[prop] = cache[prop];
//                 }
//               }
//             };
//             return rolePlayer;
//         }
//     };
// },
//     createContext = function (context){
//         return function(){
//             var args = arguments,
//                 ctx = context.apply(this,arguments);
//             ctx.unbind = function() {
//               var i,len,arg;
//                 for(i=0, len = args.length; i<len; i += 1) {
//                     arg = args[i];
//                     arg.unbind && arg.unbind();
//                 }
//             };
//         return ctx
//         };
//     }
//     moneyTransfer = createContext(function(sourcePlayer, destinationPlayer, amount) {
//         var source = {
//                 withdraw: function() {
//                     var text = "Withdraw: " + amount;
//                     this.log.push(text);
//                     this.balance -= amount;
//                     console.log("Balance: " + this.balance);
//                 }
//             },
//             destination = {
//                 deposit: function() {
//                     var text = "Deposit: " + amount;
//                     this.log.push(text);
//                     this.balance += amount;
//                     console.log("Balance: " + this.balance);
//                 }
//             };
//         source = assign(source).to(sourcePlayer);
//         destination = assign(destination).to(destinationPlayer);
//         return {
//             transfer: function() {
//                 source.withdraw();
//                 destination.deposit();
//                 return this;
//             }
//         };
//     }),
//     sourceAccount = {
//       log: [],
//       balance: 100
//     },
//     destinationAccount = {
//       log: [],
//       balance: 0
//     };

// moneyTransfer(sourceAccount, destinationAccount, 25).transfer().unbind();
// console.log(sourceAccount);
