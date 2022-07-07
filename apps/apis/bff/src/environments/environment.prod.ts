import { Environment, port, extra, Prefix } from '@ngn-template/core';

export const environment: Environment = {
    production: true,
    prefix: `${Prefix.GLOBAL}/${Prefix.BFF}`,
    port: port + extra.bff,
};
