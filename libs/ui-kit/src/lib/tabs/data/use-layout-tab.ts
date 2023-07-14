import { SimpleChanges } from '@angular/core';
import { Context, Ref } from '@ngn-template/cdk';

import { Tab } from './tab';

export type ContextTab = Context<Tab> & { tabs: Tab[] };

export interface UseLayoutTab extends Ref<Tab> {
    changes: SimpleChanges;
    context: ContextTab;
    input: {
        layoutTabContainer: string;
        layoutTabMenu: string;
        layoutTabList: [] | null;
    };
}
