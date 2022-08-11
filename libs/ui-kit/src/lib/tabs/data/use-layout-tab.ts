import { SimpleChanges } from '@angular/core';
import { ContextUse, Use } from '@ngn-template/access';

import { Tab } from './tab';

// import { TabComponent } from './tab-component';

export interface UseLayoutTab extends Use {
    changes?: SimpleChanges;
    // tabComponent: TabComponent;
    context: (ContextUse & { tabs: Tab[] }) | null;
    input: {
        layoutTabContainer: string;
        layoutTabMenu: string;
    };
}
