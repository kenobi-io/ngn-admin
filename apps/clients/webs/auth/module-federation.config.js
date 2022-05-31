module.exports = {
  name: 'auth-web',
  exposes: {
    './Module': 'apps/clients/webs/auth/src/app/remote-entry/entry.module.ts',
  },
};
