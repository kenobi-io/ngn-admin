import { Http } from './http';

export type PropertyHttp =
    | 'httpDelete'
    | 'httpGet'
    | 'httpHead'
    | 'httpJsonp'
    | 'httpOptions'
    | 'httpPatch'
    | 'httpPost'
    | 'httpPut'
    | 'httpSend'
    | 'httpCallback'
    | 'httpWith';

export type InputPropertyHttp = Pick<Http<string>, PropertyHttp>;
