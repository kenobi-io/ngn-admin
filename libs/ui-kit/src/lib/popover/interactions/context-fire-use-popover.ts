/* eslint-disable @typescript-eslint/no-unused-vars */
import { Subject } from 'rxjs';

import { AfterClosedEventPopover, FireUsePopover } from '../data';
import { closeFireUsePopover } from './close-fire-use-popover';
import { openFireUsePopover } from './open/open-fire-use-popover';

export const contextFireUsePopover = <T>(
    use: FireUsePopover<T>
): FireUsePopover<T> => {
    const { afterClosed, context, data } = use;
    // TODO: settings rule of eslint for no-unused-vars
    !afterClosed &&
        (use.afterClosed = new Subject<AfterClosedEventPopover<T>>());
    context
        ? (context.$implicit = data)
        : (use.context = {
              $implicit: data,
              close: closeFireUsePopover.bind(use),
              open: openFireUsePopover.bind(use),
          });
    return use;
};
