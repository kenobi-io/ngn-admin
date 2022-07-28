import { SimpleChanges } from '@angular/core';
import { ContextUse, Use } from '@ngn-template/access';

// import { TabComponent } from './tab-component';

export interface UseLayoutTab extends Use {
    changes?: SimpleChanges;
    // tabComponent: TabComponent;
    context: ContextUse | null;
    input: {
        layoutTabContainerStyle: string;
        layoutTabMenuStyle: string;
    };
}
