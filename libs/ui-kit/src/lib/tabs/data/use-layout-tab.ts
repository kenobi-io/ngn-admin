import { SimpleChanges } from '@angular/core';
import { Context, Use } from '@ngn-template/access';

import { Tab } from './tab';

export type ContextTab = Context<Tab> & { tabs: Tab[] };

export interface UseLayoutTab extends Use<Tab> {
    changes: SimpleChanges;
    context: ContextTab;
    input: {
        layoutTabContainer: string;
        layoutTabMenu: string;
        layoutTabList: [] | null;
    };
}
