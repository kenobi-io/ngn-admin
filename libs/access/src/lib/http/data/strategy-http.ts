import { PropertyHttp } from './input-property-http';
import { VerbsHttp } from './verbs-http';

export type StrategyHttp = {
    changes: PropertyHttp[];
    require: PropertyHttp[];
    type: VerbsHttp;
};
