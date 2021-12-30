import { addUser } from './user';
import { Pch } from './chainable/chain';

export function addCommands(ch: <T>(model?: T) => Pch<T>): void {
  ch().add('addUser', addUser);
}
