import { Injectable } from '@angular/core';
import { Observable, from, throwError, Subject, Observer, timer } from 'rxjs';
import {
  map,
  catchError,
  finalize,
  share,
  retryWhen,
  tap,
  delayWhen,
} from 'rxjs/operators';
import { Status, StatusCode, ClientReadableStream } from 'grpc-web';
import { Message as MessageJspb } from 'google-protobuf';
import { EventType } from './event-type';

@Injectable({
  providedIn: 'root',
})
export class GrpcApiService {

  public jwtAuthError$ = new Subject<void>();

  constructor() {}

  public unary<T>(promise: Promise<MessageJspb>): Observable<T> {

    return from(promise).pipe(
      map((response: MessageJspb) => response.toObject() as T),
      catchError((error: Status) => {

        if (error.code === StatusCode.UNAUTHENTICATED) {
          this.jwtAuthError$.next();
        }

        return throwError(error);
      })
    );
  }

  public stream<T>(client: ClientReadableStream<T>): Observable<T> {

    let stream: ClientReadableStream<T> = null;
    let subscriptionCounter = 0;

    const data: Observable<T> = new Observable((observer: Observer<T>) => {
      
      if (subscriptionCounter === 0) {
        stream = client;
      }
      subscriptionCounter++;

      stream.on(EventType.data, (response: T | MessageJspb) => {
        const resObj = response as MessageJspb;
        const value: T = resObj.toObject() as T;
        observer.next(value);
      });

      stream.on(EventType.status, (status: Status) => {

        if (status.code === StatusCode.UNAUTHENTICATED) {
          this.jwtAuthError$.next();
        }

        if (status.code !== StatusCode.OK) {
          observer.error(status);
        }
      });
    });

    return data.pipe(
      finalize(() => {

        subscriptionCounter--;
        if (subscriptionCounter === 0) {
          stream.cancel();
        }
      }),
      share(),
      retryWhen((errors) => {
        
        return errors.pipe(
          // TODO: add logger
          tap((val) =>
            console.warn(`Stream will be reconnected in 30 seconds`)
          ),
          // TODO: fix deprecated
          delayWhen((val) => timer(30000))
        )
      })
    );
  }
}