import { Injector } from '@angular/core';

export interface OptionsEmbeddedView {
    index: number;
    injector: Injector;
}

export type OptionsEmbeddedViewRef = Partial<OptionsEmbeddedView>;
