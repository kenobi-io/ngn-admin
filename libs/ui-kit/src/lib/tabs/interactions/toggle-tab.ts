import { Tab, UseTab } from '../data';

export const toggleTab = <T extends UseTab>(
    useTab: T,
    forceShow = false
): T => {
    const { activeTab, elRef, input, tabs, templateRef } = useTab;
    // const list = tabs?.filter((tab) => tab.orderId === orderId);
    const nativeElement = elRef?.nativeElement
        ? elRef.nativeElement
        : templateRef?.elementRef.nativeElement.nextSibling;
    const tab: Tab = {
        nativeElement,
        orderId: input.tabOrderId,
    };

    if (tab === activeTab && !forceShow) {
        return useTab;
    }

    tabs?.filter((_tab) => _tab.nativeElement).map((_tab) => {
        if (
            _tab.orderId !== tab.orderId &&
            input['tabActiveStyle'] &&
            input['tabInactiveStyle']
        ) {
            input['tabActiveStyle']
                .split(' ')
                .map((cls) =>
                    useTab.renderer.removeClass(_tab.nativeElement, cls)
                );
            // _tab.nativeElement.classList.remove(

            // );
            input['tabInactiveStyle']
                .split(' ')
                .map((cls) =>
                    useTab.renderer.addClass(_tab.nativeElement, cls)
                );
            // _tab.nativeElement.classList.add(
            //     ...input['tabInactiveStyle'].split(' ')
            // );
            // _tab.nativeElement.classList.add('hidden');
            useTab.renderer.addClass(_tab.nativeElement, 'hidden');
            // _tab.nativeElement.setAttribute('aria-selected', 'false');
            useTab.renderer.setAttribute(
                _tab.nativeElement,
                'aria-selected',
                'false'
            );
        }
    });

    if (
        tabs &&
        input['tabActiveStyle'] &&
        input['tabInactiveStyle'] &&
        tab.nativeElement?.classList &&
        tab.nativeElement &&
        tab.orderId === '4'
    ) {
        // show active tab
        input['tabActiveStyle']
            .split(' ')
            .map((cls) => useTab.renderer.addClass(tab.nativeElement, cls));
        // tab?.nativeElement?.nextSibling?.classList.add(...input['tabActiveStyle'].split(' '));

        input['tabInactiveStyle']
            .split(' ')
            .map((cls) => useTab.renderer.removeClass(tab.nativeElement, cls));
        // tab?.nativeElement?.nextSibling?.classList.remove(
        //     ...input['tabInactiveStyle'].split(' ')
        // );
        useTab.renderer.setAttribute(
            tab.nativeElement,
            'aria-selected',
            'true'
        );
        // tab?.nativeElement?.nextSibling?.setAttribute('aria-selected', 'true');
        useTab.renderer.removeClass(tab.nativeElement, 'hidden');
        // tab?.nativeElement?.nextSibling?.classList.remove('hidden');

        useTab.activeTab = tab;
    }

    // input.tabShow(this, tab);

    return useTab;
};
