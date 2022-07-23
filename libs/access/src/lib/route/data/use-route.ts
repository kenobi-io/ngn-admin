import { ActivatedRoute } from '@angular/router';

import { Use } from '../../directive/use';
import { ContextRoute } from './context-route';

export interface UseRoute extends Use {
    route: ActivatedRoute;
    context: ContextRoute | null;
    fields: string[] | null;
}
