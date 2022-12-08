import { Injector } from '@angular/core';

import { FireUsePopover } from '../../data/fire-use-popover';
import { componentAttach } from './component-attach';
import { templateAttach } from './template-attach';

export const strategyAttaching = <T>(
    dataOfAttach: FireUsePopover<T> & {
        injectorRef: Injector;
        /*container: HTMLElement;*/
    }
): void => {
    const {
        /*container,*/
        /*context,*/ injectorRef,
        optionsOpen,
        overlayRef,
        viewContainerRef,
    } = dataOfAttach;
    // TODO: handlers content case.
    const { component, /*content, */ template } = optionsOpen;
    overlayRef &&
        (component
            ? componentAttach(
                  component,
                  injectorRef,
                  overlayRef,
                  viewContainerRef
              )
            : template
            ? templateAttach(
                  null,
                  injectorRef,
                  overlayRef,
                  template,
                  viewContainerRef
              )
            : void 0);
};
