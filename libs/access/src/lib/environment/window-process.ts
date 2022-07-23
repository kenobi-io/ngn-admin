export type WindowProcess = Window & {
    process: { env: { PORT: string | null } };
};
