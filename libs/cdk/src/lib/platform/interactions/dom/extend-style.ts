import { Identity } from '@core-template';

/** Shallow-extends a stylesheet object with another stylesheet object. */
type SourceCSSStyleDeclaration = Partial<CSSStyleDeclaration>;
type ExtendStyle = {
    <T>(
        destination: CSSStyleDeclaration,
        source: SourceCSSStyleDeclaration
    ): Identity<T>;
    (
        destination: CSSStyleDeclaration,
        source: SourceCSSStyleDeclaration,
        isPipe?: boolean
    ): void;
};

export const extendStyle: ExtendStyle = <T>(
    destination: any,
    source: any,
    isPipe = true
): any => {
    const assign = () => {
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                const property = source[key];
                property && (destination[key] = property);
            }
        }
    };
    if (isPipe) {
        return (value: T): T => {
            assign();
            return value;
        };
    }
    assign();
};
