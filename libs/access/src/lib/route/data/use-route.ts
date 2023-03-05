import { ActivatedRoute } from '@angular/router';
import { Use } from '@ngn-template/cdk';

import { ContextRoute } from './context-route';

export interface UseRoute extends Use<ActivatedRoute> {
    route: ActivatedRoute;
    context: ContextRoute;
    fields: string[] | null;
}
