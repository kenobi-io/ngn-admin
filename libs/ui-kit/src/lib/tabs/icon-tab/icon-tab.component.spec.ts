import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabComponent } from './icon-tab.component';

describe('IconTabComponent', () => {
    let component: IconTabComponent;
    let fixture: ComponentFixture<IconTabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IconTabComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(IconTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        component = fixture.debugElement.children[0].componentInstance;
        expect(component).toBeTruthy();
    });
});
