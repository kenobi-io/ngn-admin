import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';

export const HTTP_CLIENT = new InjectionToken<HttpClient>(
    'http client for request',
    {
        factory: () => inject(HttpClient),
    }
);
