import { Bounden } from '@core-template';

import { OptionsOpenPopover } from './content-use-popover';

export type InputOptionsOpenPopover<T> = Bounden<
    OptionsOpenPopover<T>,
    'height' | 'width'
>;
