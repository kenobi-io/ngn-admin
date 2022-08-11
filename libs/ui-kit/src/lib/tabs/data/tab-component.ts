import { ElementRef, QueryList } from '@angular/core';

export interface TabComponent {
    containers: QueryList<ElementRef>;
}
