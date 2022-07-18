/* eslint-disable @typescript-eslint/no-unused-vars */
import { Use } from '../../directive/use';

export const contextCreateHttp = <T extends Use>(use: T): T => {
    let { context } = use;
    context = {
        $implicit: null,
        get data() {
            return this.$implicit;
        },
    };

    return use;
};
