/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Platform } from '@angular/cdk/platform';

/** Container inside which all overlays will render. */
export type ContainerOverlay = {
    document: Document;
    platform: Platform;
    body?: HTMLDivElement;
};
