type WindowProcess = Window & { process: { env: { PORT: undefined } } };
let start = 0;
const process = (window as unknown as WindowProcess).process;
const target = {
    extra: {
        auth: ++start,
        bff: start,
        profile: ++start,
    },
    port: process?.env['PORT'] ? +process.env['PORT'] : 3330,
};

export const { extra, port } = target;
