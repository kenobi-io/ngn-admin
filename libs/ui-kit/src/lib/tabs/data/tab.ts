import { ElementRef } from '@angular/core';

export type Tab = ElementRef<HTMLElement> & {
    orderId: string | null;
};
