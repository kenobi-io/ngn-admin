import { SimpleChanges } from '@angular/core';

import { OptionsOpenPopover } from './content-use-popover';

export type ChangesPopover<T> = SimpleChanges & {
    options: {
        currentValue: OptionsOpenPopover<T>;
    };
};
