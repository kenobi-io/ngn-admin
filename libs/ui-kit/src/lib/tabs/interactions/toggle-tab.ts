import { Tab, UseTab } from '../data';

export const toggleTab = <T extends UseTab>(
    useTab: T,
    orderId: string | null,
    forceShow = false
): T => {
    const { activeTab, input, tabs } = useTab;
    const list = tabs?.filter((tab) => tab.orderId === orderId);
    const tab: Tab | null = list ? list[0] : null;

    if (tab === activeTab && !forceShow) {
        return useTab;
    }

    tabs?.map((item) => {
        if (item !== tab) {
            item.nativeElement.classList.remove(
                ...input['tabActiveStyle'].split(' ')
            );
            item.nativeElement.classList.add(
                ...input['tabInactiveStyle'].split(' ')
            );
            item.nativeElement.classList.add('hidden');
            item.nativeElement.setAttribute('aria-selected', 'false');
        }
    });

    // show active tab
    tab?.nativeElement.classList.add(...input['tabActiveStyle'].split(' '));
    tab?.nativeElement.classList.remove(
        ...input['tabInactiveStyle'].split(' ')
    );
    tab?.nativeElement.setAttribute('aria-selected', 'true');
    tab?.nativeElement.classList.remove('hidden');

    useTab.activeTab = tab;

    input.tabShow(this, tab);

    return useTab;
};
