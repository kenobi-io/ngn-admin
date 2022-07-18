import { OptionHttp } from './option-http';
import { StrategyHttp } from './strategy-http';
import { UseHttp } from './use-http';

export const findStrategyHttp = <T extends UseHttp>(useHttp: T): T => {
    const { changes, fields, optionHttp } = useHttp;
    useHttp.strategy = fields?.find((strategy) => {
        return (
            strategy.changes.some(
                (field) =>
                    !!(changes as unknown as { optionHttp: OptionHttp })
                        .optionHttp[field] // TODO: testing fields useHttp.changes
            ) &&
            strategy.require.every(
                (field) => !!optionHttp[`${field}`] // TODO: testing fields useHttp.optionHttp
            )
        );
    }) as StrategyHttp | null;
    return useHttp;
};
