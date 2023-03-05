import { Router } from '@angular/router';
import { Use } from '@ngn-template/cdk';

import { ContextRouter } from './context-router';

export interface UseRouter extends Use<Router> {
    router: Router;
    context: ContextRouter;
    fields: string[] | null;
}
