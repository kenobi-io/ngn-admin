export type ImmutableObject<T> = {
    readonly [P in keyof T]: T[P];
};
