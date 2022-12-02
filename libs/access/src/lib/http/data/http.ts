import { UseHttp } from '../data';

export type Http<T> = {
    httpInstanceof: T;
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
