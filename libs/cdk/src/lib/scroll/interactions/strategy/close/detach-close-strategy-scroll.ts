import { CloseStrategyScroll } from '../../../data';
import { disableCloseStrategyScroll } from './disable-close-strategy-scroll';

export const detachCloseStrategyScroll = <T>(
    css: CloseStrategyScroll<T>
): CloseStrategyScroll<T> => {
    disableCloseStrategyScroll(css);
    css.overlay = undefined;

    return css;
};
