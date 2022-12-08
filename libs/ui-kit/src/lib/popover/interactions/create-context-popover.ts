/* eslint-disable @typescript-eslint/no-unused-vars */
import { Bounden } from '@core-template';
import { Subject } from 'rxjs';

import { AfterClosedEventPopover, FireUsePopover } from '../data';
import { closePopover } from './close-popover';
import { openPopover } from './open/open-popover';

export type CreateContextUsePopover<T> = Bounden<FireUsePopover<T>, 'data'>;

export const createContextUsePopover = <T, K extends FireUsePopover<T>>(
    use: CreateContextUsePopover<T>
): K => {
    const { afterClosed, context, data } = use;
    // TODO: settings rule of eslint for no-unused-vars
    !afterClosed &&
        (use.afterClosed = new Subject<AfterClosedEventPopover<T>>());
    context
        ? (context.$implicit = data)
        : (use.context = {
              $implicit: data,
              close: closePopover.bind(use),
              open: openPopover.bind(use),
          });
    return use as K;
};
