// import { tube } from '@core-template';

// import { isOverlayRefDirectionRtl } from '../../../overlay';
// import { FlexibleConnectedPosition } from '../../data';

// /** @internal Sets the transform origin based on the configured selector and the passed-in position.  */
// export const setTransformOrigin =
//     (position: FlexibleConnectedPosition) => () => {
//         if (!this._transformOriginSelector) {
//             return;
//         }

//         const elements: NodeListOf<HTMLElement> =
//             this._boundingBox!.querySelectorAll(this._transformOriginSelector);
//         let xOrigin: 'left' | 'right' | 'center';
//         const yOrigin: 'top' | 'bottom' | 'center' = position.overlayY;

//         if (position.overlayX === 'center') {
//             xOrigin = 'center';
//         } else if (isOverlayRefDirectionRtl()) {
//             xOrigin = position.overlayX === 'start' ? 'right' : 'left';
//         } else {
//             xOrigin = position.overlayX === 'start' ? 'left' : 'right';
//         }

//         for (let i = 0; i < elements.length; i++) {
//             elements[i].style.transformOrigin = `${xOrigin} ${yOrigin}`;
//         }

//         return tube();
//     };
