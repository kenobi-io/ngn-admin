import { Router } from '@angular/router';

import { Use } from '../../directive/use';
import { ContextRouter } from './context-router';

export interface UseRouter extends Use {
    router: Router;
    context: ContextRouter | null;
    fields: string[] | null;
}
