import { Environment, prefix, port, inc } from '@ngn-template/api-interfaces';

const { global, bff } = prefix;

export const environment: Environment = {
  production: false,
  prefix: `${global}/${bff}`,
  port: port + inc.bff,
};
