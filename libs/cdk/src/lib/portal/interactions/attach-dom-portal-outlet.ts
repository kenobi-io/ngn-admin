import { DomPortal, DomPortalOutlet } from '../data';

/**
 * Attaches a DOM portal by transferring its content into the outlet.
 * @param use Portal to be attached.
 */
export const attachDomPortalOutlet = <T>(
    use: DomPortalOutlet<T>
): DomPortalOutlet<T> => {
    const { document, outletElement, portal } = use;
    const element = (portal as DomPortal).element as HTMLElement;
    // Anchor used to save the element's previous position so
    // that we can restore it when the portal is detached.
    const anchorNode = document?.createComment('dom-portal');
    anchorNode && element.parentNode?.insertBefore(anchorNode, element);
    use.appendedPortal = outletElement?.appendChild(element);
    use.attachedPortal = portal;
    use.disposeFn = () => {
        // We can't use `replaceWith` here because IE doesn't support it.
        if (anchorNode?.parentNode) {
            anchorNode.parentNode.replaceChild(element, anchorNode);
        }
    };

    return use;
};
