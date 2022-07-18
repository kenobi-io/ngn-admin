import { StrategyHttp } from './strategy-http';

export const CONFIG_STRATEGY_HTTP: StrategyHttp[] = [
    {
        changes: ['httpDelete', 'httpWith'],
        require: ['httpDelete'],
        type: 'delete',
    },
    {
        changes: ['httpGet', 'httpWith'],
        require: ['httpGet'],
        type: 'get',
    },
    {
        changes: ['httpHead', 'httpWith'],
        require: ['httpHead'],
        type: 'head',
    },
    {
        changes: ['httpJsonp', 'httpCallback'],
        require: ['httpJsonp', 'httpCallback'],
        type: 'jsonp',
    },
    {
        changes: ['httpOptions', 'httpWith'],
        require: ['httpOptions'],
        type: 'options',
    },
    {
        changes: ['httpPatch', 'httpSend', 'httpWith'],
        require: ['httpPatch'],
        type: 'patch',
    },
    {
        changes: ['httpPost', 'httpSend', 'httpWith'],
        require: ['httpPost'],
        type: 'post',
    },
    {
        changes: ['httpPut', 'httpSend', 'httpWith'],
        require: ['httpPut'],
        type: 'put',
    },
];
