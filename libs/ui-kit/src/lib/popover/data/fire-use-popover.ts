import { Renderer2, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import {
    AfterClosedEventPopover,
    CloseEventKindPopover,
    OptionsOpenPopover,
} from './content-use-popover';
import { ContextPopover } from './context-popover';
import { UsePopover } from './use-popover';

export interface FireUsePopover<T> extends UsePopover<T> {
    afterClosed: Subject<AfterClosedEventPopover<T>>;
    closeEventKind: CloseEventKindPopover;
    optionsOpen: OptionsOpenPopover<T>;
    renderer: Renderer2;
    templateRef: TemplateRef<ContextPopover<T>>;
    onClick: () => void;
}
