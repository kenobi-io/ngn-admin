import { HttpErrorResponse } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { Observable, throwError } from 'rxjs';

export type HttpHandlerError = (error: HttpErrorResponse) => Observable<never>;

export const handleErrorRequest: HttpHandlerError = (
    error: HttpErrorResponse
) => {
    if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
            `Backend returned code ${error.status}, body was: `,
            error.error
        );
    }
    // Return an observable with a user-facing error message.
    return throwError(
        () => new Error('Something bad happened; please try again later.')
    );
};

export const HTTP_HANDLER_ERROR = new InjectionToken<HttpHandlerError>(
    'http handler error for request',
    {
        factory: () => handleErrorRequest,
    }
);
