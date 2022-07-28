import { lapi } from '@relax';

import { UseTab } from '../data';
import { toggleTab } from './toggle-tab';

export const createContextTab = <T extends UseTab>(useTab: T): T => {
    lapi(
        (useTab: T) => {
            const { templateRef } = useTab;
            useTab.context = {
                $implicit: templateRef,
            };
            return useTab;
        },
        (useTab: T) => {
            const { activeTab, tabs } = useTab;
            if (tabs?.length && activeTab) {
                // set the first tab as active if not set by explicitly
                if (!activeTab && useTab.context) {
                    useTab.activeTab = tabs[0];
                }

                // force show the first default tab
                toggleTab(useTab, activeTab.orderId, true);

                // show tab content based on click
                tabs.map((tab) => {
                    tab.nativeElement.addEventListener('click', () => {
                        toggleTab(useTab, tab.orderId);
                    });
                });
            }
            return useTab;
        }
    )(useTab);

    return useTab;
};

// function initTabs() {
//     document.querySelectorAll('[data-tabs-toggle]').forEach((triggerEl) => {
//         const tabElements = [];
//         let defaultTabId = null;
//         triggerEl.querySelectorAll('[role="tab"]').forEach((el) => {
//             const isActive = el.getAttribute('aria-selected') === 'true';
//             const tab = {
//                 id: el.getAttribute('data-tabs-target'),
//                 targetEl: document.querySelector(
//                     el.getAttribute('data-tabs-target')
//                 ),
//                 triggerEl: el,
//             };
//             tabElements.push(tab);

//             if (isActive) {
//                 defaultTabId = tab.id;
//             }
//         });
//         new Tabs(tabElements, {
//             defaultTabId: defaultTabId,
//         });
//     });
// }
