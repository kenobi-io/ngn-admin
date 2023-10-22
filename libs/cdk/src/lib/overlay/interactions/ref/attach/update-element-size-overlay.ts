import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { mono, tube } from '@core-template';

import {
    MonoOverlayCapability,
    OverlayCapability,
    ParamsMonoOverlayCapability,
} from '../../../data';

type Rec = Record<string | number | symbol, unknown>;

export const updateElementSizeOverlay: MonoOverlayCapability<
    OverlayCapability
> = () =>
    mono(
        ({ overlay }) =>
            overlay &&
            tube(
                updateStyle('width'),
                updateStyle('height'),
                updateStyle('minWidth'),
                updateStyle('minHeight'),
                updateStyle('maxWidth'),
                updateStyle('maxHeight')
            )({ overlay })
    );

const updateStyle: ParamsMonoOverlayCapability<
    Required<OverlayCapability>,
    string
> = (propertyName) =>
    mono(({ overlay: { config, pane } }) => {
        if (config && pane) {
            const configs: Rec = record(config);
            const styles: Rec = record(pane.style);
            const propertyValue = configs[propertyName];
            if (propertyValue) {
                styles[propertyName] = coerceCssPixelValue(propertyValue);
            }
        }
    });
const record = <T>(value: T): Rec => value as Rec;
