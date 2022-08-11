import { Renderer2, SimpleChanges } from '@angular/core';
import { ContextUse, Use } from '@ngn-template/access';

import { Tab } from './tab';

export interface UseTab extends Use {
    activeTab?: Tab | null;
    changes?: SimpleChanges;
    context: ContextUse | null;
    input: {
        tabActiveStyle: string;
        tabInactiveStyle: string;
        tabOrderId: string;
        tabTabs: Tab[];
        tabShow: (...params: unknown[]) => unknown | void;
    };
    renderer: Renderer2;
    tabs?: Tab[] | null;
}
