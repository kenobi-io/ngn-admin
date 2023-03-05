import { Injector, Renderer2, TemplateRef } from '@angular/core';
import { Overlay, Use } from '@ngn-template/cdk';
import { Subject } from 'rxjs';

import {
    AfterClosedEventPopover,
    CloseEventKindPopover,
} from './content-use-popover';
import { ContextPopover } from './context-popover';
import { InputOptionsOpenPopover } from './input-options-open-popover';

type ChangeFireUsePopover<T> = {
    context: ContextPopover<T>;
    data: T;
    overlay: Overlay<T>;
    onClick: () => void;
    optionsOpen: InputOptionsOpenPopover<T>;
    afterClosed: Subject<AfterClosedEventPopover<T>>;
};

export type FireUsePopover<T> = Use<T> &
    Partial<ChangeFireUsePopover<T>> & {
        closeEventKind: CloseEventKindPopover;
        renderer: Renderer2;
        templateRef: TemplateRef<ContextPopover<T>>;
        injector: Injector;
    };
