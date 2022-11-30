import { Bounden } from '@core-template';

import { UseHttp } from '../data';

export type FindStrategyHttp<T> = Bounden<
    UseHttp<T>,
    'changes' | 'fields' | 'input'
>;

export const findStrategyHttp = <T>(use: FindStrategyHttp<T>): UseHttp<T> => {
    const { changes, fields, input } = use;
    !use.strategy &&
        (use.strategy = fields.find((strategy) => {
            return (
                strategy.changes.some((field) => changes && !!changes[field]) &&
                strategy.require.every((field) => !!input[`${field}`])
            );
        }));
    return use as UseHttp<T>;
};
