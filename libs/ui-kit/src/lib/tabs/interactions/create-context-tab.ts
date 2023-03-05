import { UseTab } from '../data';

export const contextUseTab = (useTab: UseTab): UseTab => {
    useTab.context = {
        $implicit: null,
    };
    // useTab.tabs = [];
    const { activeTab, input, tabs } = useTab;

    if (tabs?.length && activeTab) {
        // set the first tab as active if not set by explicitly
        if (!activeTab && useTab.context) {
            useTab.activeTab = tabs[0];
        }
        input.tabOrderId = activeTab.orderId;
    }

    return useTab;
};
