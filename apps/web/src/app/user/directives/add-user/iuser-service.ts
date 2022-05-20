import { Observable } from 'rxjs';
export interface IUserService<T> {
  getUser(url: string): Observable<T>;
}
