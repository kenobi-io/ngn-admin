import { Overlay } from '@angular/cdk/overlay';
import {
    ElementRef,
    inject,
    INJECTOR,
    Renderer2,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Bounden } from '@core-template';

import {
    ContextPopover,
    FireUsePopover,
    InputOptionsOpenPopover,
    OptionsOpenPopover,
} from '../data';

type CreateUsePopover<T> = Bounden<
    FireUsePopover<T>,
    | 'elementRef'
    | 'injector'
    | 'optionsOpen'
    | 'overlay'
    | 'renderer'
    | 'templateRef'
    | 'viewContainerRef'
    | 'onClick'
>;

export type DirectiveCreateUsePopover<T> = {
    options: InputOptionsOpenPopover<T>;
    use: CreateUsePopover<T>;
    onClick: () => void;
};

export const createUsePopover = <T, K extends FireUsePopover<T>>(
    directive: DirectiveCreateUsePopover<T>
): K => {
    !directive.use &&
        (directive.use = {
            elementRef: inject(ElementRef<HTMLElement>),
            injector: inject(INJECTOR),
            onClick: directive.onClick.bind(directive),
            optionsOpen: directive.options as OptionsOpenPopover<T>,
            overlay: inject(Overlay),
            renderer: inject(Renderer2),
            templateRef: inject(TemplateRef<ContextPopover<T>>),
            viewContainerRef: inject(ViewContainerRef),
        });
    return directive.use as K;
};
