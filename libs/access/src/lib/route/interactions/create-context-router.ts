import { UseRouter } from '../data';

export const createContextRouter = <T extends UseRouter>(useRouter: T): T => {
    const { router } = useRouter;
    useRouter.context = {
        $implicit: router,
        data: null,
        set errorHandler(error: never) {
            this.$implicit.errorHandler(error);
        },
        get events() {
            return this.$implicit.events;
        },
        get navigated() {
            return this.$implicit.navigated;
        },
        get routeReuseStrategy() {
            return this.$implicit.routeReuseStrategy;
        },
        get routerState() {
            return this.$implicit.routerState;
        },
        get titleStrategy() {
            return this.$implicit.titleStrategy;
        },
        get url() {
            return this.$implicit.url;
        },
        get urlHandlingStrategy() {
            return this.$implicit.urlHandlingStrategy;
        },
    };
    return useRouter;
};
