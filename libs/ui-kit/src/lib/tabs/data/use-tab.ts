import { SimpleChanges } from '@angular/core';
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
        tabShow: (...params: unknown[]) => unknown | void;
    };
    orderId?: string | null;
    tabs?: Tab[] | null;
}
