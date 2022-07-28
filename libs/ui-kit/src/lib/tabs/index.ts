/* eslint-disable prefer-const */
import { LayoutTabDirective, TabDirective } from './directives/index';
import { IconTabComponent } from './icon-tab/icon-tab.component';

export { TAB_TOKEN } from './data/index';
export { LayoutTabDirective, TabDirective } from './directives/index';
export { IconTabComponent } from './icon-tab/icon-tab.component';

export let TAB_KITS = [IconTabComponent, LayoutTabDirective, TabDirective];
