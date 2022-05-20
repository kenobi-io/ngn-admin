export type Descriptor = 'get.elements' | 'set.model';

type PredicateFn = (value: any, index?: number) => boolean;
interface User {
  age: number;
  role: any;
}
enum UserRole {
  Writer,
  Editor,
}
const users: any[] = [
  { username: 'John', age: 25 },
  { username: 'Jane', age: 7 },
  { username: 'Liza', age: 18 },
];
function and(...predicates: PredicateFn[]): PredicateFn {
  return (value) => predicates.every((predicate) => predicate(value));
}
function not(...predicates: PredicateFn[]): PredicateFn {
  return (value) => predicates.every((predicate) => !predicate(value));
}
function or(...predicates: PredicateFn[]): PredicateFn {
  return (value) => predicates.some((predicate) => predicate(value));
}
const isRole = (role: UserRole) => (user: User) => user.role === role;
const isGreaterThan = (age: number) => (user: User) => user.role === age;
const age = 0;
users.filter(
  and(isGreaterThan(17), or(isRole(UserRole.Writer), isRole(UserRole.Editor)))
);

users.filter(and(isGreaterThan(5), isRole(UserRole.Writer)));
