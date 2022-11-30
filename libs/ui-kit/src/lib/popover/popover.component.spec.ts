import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverComponent } from './popover.component';

describe('PopoverComponent', <T>() => {
    let component: PopoverComponent<T>;
    let fixture: ComponentFixture<PopoverComponent<T>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PopoverComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PopoverComponent<T>);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
