import { Injector } from '@angular/core';

import { FireUsePopover } from '../../data';
import { componentAttach } from './component-attach';
import { templateAttach } from './template-attach';

export const strategyAttaching = <T>(
    dataOfAttach: FireUsePopover<T> & {
        injectorRef: Injector;
    }
): void => {
    const { injectorRef, optionsOpen, overlay, viewContainerRef } =
        dataOfAttach;
    // TODO: handlers content case.
    const { component, template } = optionsOpen;
    overlay &&
        (component
            ? componentAttach(component, injectorRef, overlay, viewContainerRef)
            : template
            ? templateAttach(
                  null,
                  injectorRef,
                  overlay,
                  template,
                  viewContainerRef
              )
            : void 0);
};
