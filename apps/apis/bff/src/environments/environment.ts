import { Environment, port, extra, Prefix } from '@ngn-template/api-interfaces';

export const environment: Environment = {
    production: false,
    prefix: `${Prefix.GLOBAL}/${Prefix.BFF}`,
    port: port + extra.bff,
};
