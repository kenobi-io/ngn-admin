/* eslint-disable unicorn/no-empty-file */
// import { TemplateRef } from '@angular/core';
//
// import { Tab, UseTab } from '../data';
//
// export const addTab = <T extends UseTab>(useTab: T): T => {
//    const { context, elementRef: elRef, input } = useTab;
//    const nativeElement = elRef?.nativeElement
//        ? elRef.nativeElement
//        : (context?.$implicit as TemplateRef<HTMLElement>).elementRef
//              .nativeElement.nextSibling;
//    const tab: Tab = {
//        nativeElement,
//        orderId: input.tabOrderId,
//    };
//    useTab.tabs?.shift();
//    useTab.tabs?.push(tab);
//    return useTab;
// };
