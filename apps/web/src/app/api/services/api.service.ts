import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private path: string;

  constructor(private httpClient: HttpClient) {
    this.path = '/api';
  }

  public get<T>(url: string):  Observable<T>{
    return this.httpClient.get<T>(this.path + url);
  }
}
