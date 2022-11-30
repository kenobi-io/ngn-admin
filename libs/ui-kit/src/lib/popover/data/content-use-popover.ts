import { TemplateRef, Type } from '@angular/core';

import { ContextPopover } from './context-popover';
import { Popover } from './popover';

export type ContentPopover = TemplateRef<Popover> | Type<Popover> | string;

export type CloseEventKindPopover = 'backdropClick' | 'close';

export type AfterClosedEventPopover<T> = {
    data: T;
    closeEventKind: CloseEventKindPopover;
};

export interface OptionsOpenPopover<T = Popover> {
    [name: string]: OptionsOpenPopover<T>[keyof OptionsOpenPopover<T>];
    data: T;
    template: TemplateRef<ContextPopover<T>>;
    component: Type<T>;
    height: string | number;
    origin: HTMLElement;
    width: string | number;
}

export type KeyofOptionsOpenPopover =
    OptionsOpenPopover[keyof OptionsOpenPopover];
