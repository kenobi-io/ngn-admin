import { Environment, prefix, port, inc } from '@ngn-template/api-interfaces';

const { global, profile } = prefix;

export const environment: Environment = {
  production: false,
  prefix: `${global}/${profile}`,
  port: port + inc.profile,
};
