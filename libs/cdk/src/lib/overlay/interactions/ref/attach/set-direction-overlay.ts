import { mono } from '@core-template';

import { MonoOverlayCapability } from '../../../data';

export const setDirectionOverlayRef: MonoOverlayCapability = () =>
    mono(({ overlay }) => {
        if (overlay) {
            const { config, host } = overlay;
            if (config && host) {
                overlay.direction = config.direction;
                if (!overlay.direction) {
                    overlay.direction = 'ltr';
                }
                overlay.direction =
                    typeof overlay.direction === 'string'
                        ? overlay.direction
                        : overlay.direction.value;
                host.setAttribute('dir', overlay.direction);
            }
        }
    });
