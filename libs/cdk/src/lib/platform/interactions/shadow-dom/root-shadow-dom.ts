import { hasSupportsShadowDom } from './supports-shadow-dom';

/** Gets the shadow root of an element, if supported and the element is inside the Shadow DOM. */
export function rootShadowDom(element: HTMLElement): ShadowRoot | null {
    if (hasSupportsShadowDom()) {
        const rootNode = element.getRootNode ? element.getRootNode() : null;

        // Note that this should be caught by `supportsShadowDom`, but some
        // teams have been able to hit this code path on unsupported browsers.
        if (
            typeof ShadowRoot !== 'undefined' &&
            ShadowRoot &&
            rootNode instanceof ShadowRoot
        ) {
            return rootNode;
        }
    }

    return null;
}
