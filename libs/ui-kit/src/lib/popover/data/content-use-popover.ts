import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef, Type } from '@angular/core';

import { ContextPopover } from './context-popover';
import { Popover } from './popover';

export type ContentPopover = TemplateRef<Popover> | Type<Popover> | string;

export type CloseEventKindPopover = 'backdropClick' | 'close';

export type AfterClosedEventPopover<T> = {
    data: T;
    closeEventKind: CloseEventKindPopover;
};

export interface OptionsOpenPopover<T> {
    [name: string]: OptionsOpenPopover<T>[keyof OptionsOpenPopover<T>];
    data: T;
    template: TemplateRef<ContextPopover<T>>;
    component: ComponentType<T>;
    text: string;
    height: string | number;
    origin: HTMLElement;
    width: string | number;
}

export type KeyofOptionsOpenPopover<T> =
    OptionsOpenPopover<T>[keyof OptionsOpenPopover<T>];
