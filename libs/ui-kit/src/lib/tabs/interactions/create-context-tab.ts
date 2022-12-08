import { Bounden } from '@core-template';
import { pipe } from 'rxjs';

import { UseTab } from '../data';

export type CreateContextUseTab = Bounden<
    UseTab,
    'activeTab' | 'input' | 'tabs' | 'templateRef'
>;

export const createContextUseTab = <T extends CreateContextUseTab>(
    useTab: T
): UseTab => {
    pipe(
        (useTab: T) => {
            useTab.context = {
                $implicit: null,
            };
            // useTab.tabs = [];
            return useTab;
        },
        (useTab: T) => {
            const { activeTab, input, tabs } = useTab;
            if (tabs?.length && activeTab) {
                // set the first tab as active if not set by explicitly
                if (!activeTab && useTab.context) {
                    useTab.activeTab = tabs[0];
                }
                input.tabOrderId = activeTab.orderId;
            }
            return useTab;
        }
    )(useTab);

    return useTab as UseTab;
};
