import { WindowProcess } from '@ngn-template/access';

(window as unknown as WindowProcess).process = {
    env: {
        PORT: '3330',
    },
};

import('./bootstrap').catch((err) => console.error(err));
