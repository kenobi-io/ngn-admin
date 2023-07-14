/* eslint-disable prefer-const */
import { CARD_KITS } from './lib/card/index';
import { LAYOUT_KITS } from './lib/layout/index';
// import { POPOVER_KITS } from './lib/popover/index';
import { SEARCH_KITS } from './lib/search/index';
import { SVG_KITS } from './lib/svg/index';
import { TAB_KITS } from './lib/tabs/index';

export * from './lib/card/index';
export * from './lib/layout/index';
// export * from './lib/popover/index';
export * from './lib/search/index';
export * from './lib/svg/index';
export * from './lib/tabs/index';

export let KITS = [
    CARD_KITS,
    LAYOUT_KITS,
    // POPOVER_KITS,
    SEARCH_KITS,
    SVG_KITS,
    TAB_KITS,
];
