import { Environment, extra, port, Prefix } from '@ngn-template/access';

export const environment: Environment = {
    production: true,
    prefix: `${Prefix.GLOBAL}/${Prefix.BFF}`,
    port: port + extra.bff,
};
