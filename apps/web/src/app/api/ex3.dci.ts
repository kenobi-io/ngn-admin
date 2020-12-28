import { Account } from './ex2.dci';

class Account2 extends Account {
  constructor() {
    super();
  }
  balance = 10;
}

export class SourceAccountRole<T extends Account> {

  model: T = { } as T;

  constructor(config: T) {
    Object.assign(this.model, config);
  }

  public withdraw = (amount): void => {
    const text = 'Withdraw: ' + amount;
    console.log(text);
    this.model.balance -= amount;
    console.log('Balance: ' + this.model.balance);
  };
}
export class SourceAccountRole2<T> {

  model: T | any;

  constructor(config: T) {
    Object.assign(this.model, config);
  }

  public withdraw = (amount): void => {
    const text = 'Withdraw: ' + amount;
    console.log(text);
    this.model.balance -= amount;
    console.log('Balance: ' + this.model.balance);
  };
}

export class DestinationAccountRole extends Account {
  constructor(config: Account) {
    super();
    Object.assign(this, config);
  }
  public deposit(amount): void {
    const text = 'Deposit: ' + amount;
    console.log(text);
    this.balance += amount;
    console.log('Balance: ' + this.balance);
  }
}

export class MoneyTransferContext {
  public transfer(
    sourcePlayer: Account2,
    destinationPlayer: Account,
    amount: number
  ): MoneyTransferContext {
    const sourceAccountRole = new SourceAccountRole(sourcePlayer);
    const destinationAccountRole = new DestinationAccountRole(
      destinationPlayer
    );
    sourceAccountRole.withdraw(amount);
    console.log('sourceAccountRole: ', sourceAccountRole);
    destinationAccountRole.deposit(amount);
    console.log('destinationAccountRole: ', destinationAccountRole);

    const nav: Record<number, SourceAccountRole2<Account>> = {

    }

    return this;
  }
}

export function Main() {
  let sourceAccount: Account2 = {
    id: 1,
    balance: 100,
  };

  let destinationAccount: Account = {
    id: 2,
    balance: 0,
  };

  new MoneyTransferContext().transfer(sourceAccount, destinationAccount, 25);
  console.log('the end');
}
