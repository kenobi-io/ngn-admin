import { Environment, port, extra, Prefix } from '@ngn-template/api-interfaces';

export const environment: Environment = {
  production: true,
  prefix: `${Prefix.GLOBAL}/${Prefix.PROFILE}`,
  port: port + extra.profile,
};
