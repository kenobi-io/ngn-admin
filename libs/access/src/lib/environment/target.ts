let start = 0;

const target = {
    extra: {
        auth: ++start,
        bff: start,
        profile: ++start,
    },
    port: process?.env['PORT'] ? +process.env['PORT'] : 3330,
};

export const { extra, port } = target;
