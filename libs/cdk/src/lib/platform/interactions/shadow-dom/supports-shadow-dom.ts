/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

let hasShadowDomIsSupported: boolean;

type CreateShadowRoot = {
    createShadowRoot: () => ShadowRoot;
};

/** Checks whether the user's browser support Shadow DOM. */
export function hasSupportsShadowDom(): boolean {
    if (hasShadowDomIsSupported == null) {
        const head = typeof document !== 'undefined' ? document.head : null;
        hasShadowDomIsSupported = !!(
            head &&
            ((head as unknown as CreateShadowRoot).createShadowRoot ||
                head.attachShadow)
        );
    }

    return hasShadowDomIsSupported;
}
