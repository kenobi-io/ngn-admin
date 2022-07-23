// import { OptionHttp } from './option-http';

import { StrategyHttp, UseHttp } from '../data';

export const findStrategyHttp = <T extends UseHttp>(useHttp: T): T => {
    const { changes, fields, input } = useHttp;
    useHttp.strategy = fields?.find((strategy) => {
        return (
            strategy.changes.some((field) => changes && !!changes[field]) &&
            strategy.require.every((field) => !!input[`${field}`])
        );
    }) as StrategyHttp | null;
    return useHttp;
};
