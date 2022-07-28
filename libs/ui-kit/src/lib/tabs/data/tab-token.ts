/* eslint-disable prefer-const */
import { InjectionToken } from '@angular/core';

import { TabComponent } from './tab-component';

export let TAB_TOKEN = new InjectionToken<TabComponent>('tab-component');
