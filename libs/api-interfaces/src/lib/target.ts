let start = 0;
const target = {
  port: process?.env['PORT'] ? +process.env['PORT'] : 3330,
  extra: {
    bff: start,
    profile: ++start,
    auth: ++start,
  },
};

export const { port, extra } = target;
