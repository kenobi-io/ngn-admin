import {
    attachStrategiesScroll,
    detachStrategiesScroll,
    disableStrategiesScroll,
    enableStrategiesScroll,
} from '../../../scroll';
import { StrategiesScrollOverlay } from '../../data';

export const strategiesScrollOverlay = (): StrategiesScrollOverlay => {
    const strategies: StrategiesScrollOverlay = {
        attachStrategiesScroll,
        detachStrategiesScroll,
        disableStrategiesScroll,
        enableStrategiesScroll,
    };

    return strategies;
};
