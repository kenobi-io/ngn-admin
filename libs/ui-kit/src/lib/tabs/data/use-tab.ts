import { Renderer2, SimpleChanges } from '@angular/core';
import { Context, Use } from '@ngn-template/cdk';

import { Tab } from './tab';

export interface UseTab extends Use<Tab> {
    activeTab: Tab;
    changes: SimpleChanges;
    context: Context<Tab>;
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
