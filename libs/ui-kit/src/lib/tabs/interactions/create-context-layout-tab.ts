import { Bounden } from '@core-template';
import { pipe } from 'rxjs';

import { UseLayoutTab } from '../data';

export type CreateContextUseLayoutTab = Bounden<
    UseLayoutTab,
    'context' | 'changes' | 'input' | 'templateRef'
>;

export const createContextLayoutTab = <T extends CreateContextUseLayoutTab>(
    useLayoutTab: T
): UseLayoutTab => {
    pipe(
        (useTab: T) => {
            useTab.context = {
                $implicit: null,
                tabs: [],
            };
            return useTab;
        },
        (useTab: T) => {
            // TODO: fix get container, menu (ContentChildren) from tabComponent
            // const { changes, input, tabComponent } = useTab;
            // if (
            //     changes &&
            //     ('layoutTabContainerStyle' in changes ||
            //         'layoutTabMenuStyle' in changes)
            // ) {
            //     tabComponent.container.first.nativeElement.classList.add(
            //         ...input.layoutTabContainerStyle.split(' ')
            //     );
            //     tabComponent.container.last.nativeElement.classList.add(
            //         ...input.layoutTabContainerStyle.split(' ')
            //     );
            // }
            return useTab;
        }
    )(useLayoutTab);

    return useLayoutTab as UseLayoutTab;
};
