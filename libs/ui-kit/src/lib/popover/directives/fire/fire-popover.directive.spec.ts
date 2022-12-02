import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';

import { FirePopoverDirective } from './fire-popover.directive';

interface Popover {
    text: string;
}

@Component({
    imports: [FirePopoverDirective],
    selector: 'ngn-test',
    standalone: true,
    template: `
        <!--<ngn-popover> </ngn-popover>-->
        <button
            *firePopover="
                let fire;
                options: {
                    width: '200px',
                    height: '200px',
                    template: tpl
                };
                typeof: Popover
            "
        ></button>
        <ng-template #tpl let-fire> {{ fire }} </ng-template>
    `,
})
class FirePopoverDirectiveTestComponent {
    Popover!: Popover;
}

describe('FirePopoverDirective', <T>() => {
    let component: FirePopoverDirectiveTestComponent;
    let fixture: ComponentFixture<FirePopoverDirectiveTestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, FirePopoverDirectiveTestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FirePopoverDirectiveTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', fakeAsync(() => {
        expect(component).toBeTruthy();
        const popoverBtn = fixture.nativeElement.querySelector('button');
        popoverBtn.click();
        tick();
        fixture.detectChanges();
    }));
});
