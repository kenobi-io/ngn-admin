import { UseHttp } from '.';

export type Http<T> = {
    httpTypeof: T;
    httpCallback: string;
    httpDelete: string;
    httpGet: string;
    httpHead: string;
    httpJsonp: string;
    httpOptions: string;
    httpPatch: string;
    httpPost: string;
    httpPut: string;
    httpSend: unknown;
    httpWith: unknown;
    use: UseHttp<T>;
};
