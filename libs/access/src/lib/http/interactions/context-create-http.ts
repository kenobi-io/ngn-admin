/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseHttp } from '../data';

export const contextCreateHttp = <T extends UseHttp>(useHttp: T): T => {
    let { context } = useHttp;
    context = {
        $implicit: null,
        get data() {
            return this.$implicit;
        },
    };

    return useHttp;
};