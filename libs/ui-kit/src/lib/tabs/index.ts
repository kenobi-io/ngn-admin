/* eslint-disable prefer-const */
import { ContentTabDirective, LayoutTabDirective } from './directives/index';
import { IconTabComponent } from './icon-tab/icon-tab.component';

export { TAB_TOKEN } from './data/index';
export { ContentTabDirective, LayoutTabDirective } from './directives/index';
export { IconTabComponent } from './icon-tab/icon-tab.component';

export let TAB_KITS = [
    IconTabComponent,
    LayoutTabDirective,
    ContentTabDirective,
];
