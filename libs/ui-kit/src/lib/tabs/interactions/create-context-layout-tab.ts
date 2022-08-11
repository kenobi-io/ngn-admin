import { lapi } from '@relax';

import { UseLayoutTab } from '../data';

export const createContextLayoutTab = <T extends UseLayoutTab>(
    useLayoutTab: T
): T => {
    lapi(
        (useTab: T) => {
            const { templateRef } = useTab;
            useTab.context = {
                $implicit: templateRef,
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

    return useLayoutTab;
};
