import { FireUsePopover } from '../../data';

export function setOptionsOpenPopover<T>(
    use: FireUsePopover<T>
): FireUsePopover<T> {
    const { elementRef, optionsOpen } = use;
    const el = (elementRef.nativeElement as HTMLElement).previousElementSibling;
    el && (optionsOpen.origin = el as HTMLElement);

    return use;
}
