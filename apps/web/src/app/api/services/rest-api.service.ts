import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@web/env';
import { Option } from '@api/core';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private path: string;

  constructor(private httpClient: HttpClient) {
    this.path = environment.apiPrefix;
  }

  public get<T>(url: string, option?: Option): Observable<T> {
    return this.httpClient.get<T>(this.path + url, option);
  }

  public post<T, R>(url: string, body: R, option?: Option): Observable<T> {
    return this.httpClient.post<T>(this.path + url, body, option);
  }

  public put<T, R>(url: string, body: R, option?: Option): Observable<T> {
    return this.httpClient.put<T>(this.path + url, body, option);
  }

  public patch<T, R>(url: string, body: R, option?: Option): Observable<T> {
    return this.httpClient.patch<T>(this.path + url, body, option);
  }

  public delete<T>(url: string, option?: Option): Observable<T> {
    return this.httpClient.delete<T>(this.path + url, option);
  }

  public head<T>(url: string, option?: Option): Observable<T> {
    return this.httpClient.head<T>(this.path + url, option);
  }

  public options<T>(url: string, option?: Option): Observable<T> {
    return this.httpClient.options<T>(this.path + url, option);
  }

  public jsonp<T>(url: string, callbackParam: string): Observable<T> {
    return this.httpClient.jsonp<T>(this.path + url, callbackParam);
  }

  public request<T>(method: string, url: string, option?: Option): Observable<T> {
    return this.httpClient.request<T>(method, this.path + url, option);
  }
}
