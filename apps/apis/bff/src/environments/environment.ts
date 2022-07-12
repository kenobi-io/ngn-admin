import { Environment, extra, port, Prefix } from '@ngn-template/access';

export const environment: Environment = {
    port: port + extra.bff,
    prefix: `${Prefix.GLOBAL}/${Prefix.BFF}`,
    production: false,
};
