import { VerbsHttp } from './verbs-http';

export type StrategyHttp = {
    type: VerbsHttp;
    changes: string[];
    require: string[];
};
