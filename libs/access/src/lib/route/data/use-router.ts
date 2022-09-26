import { Router } from '@angular/router';

import { Use } from '../../directive/use';
import { ContextRouter } from './context-router';

export interface UseRouter extends Use<Router> {
    router: Router;
    context: ContextRouter;
    fields: string[] | null;
}
