import { Renderer2, SimpleChanges } from '@angular/core';
import { ContextTemplate, Use } from '@ngn-template/access';

import { Tab } from './tab';

export interface UseTab extends Use<Tab> {
    activeTab: Tab;
    changes: SimpleChanges;
    context: ContextTemplate<Tab>;
    input: {
        tabActiveStyle: string;
        tabInactiveStyle: string;
        tabOrderId: string;
        tabTabs: Tab[] | null;
        tabShow: (...params: unknown[]) => unknown | void;
    };
    renderer: Renderer2;
    tabs: Tab[] | null;
}
