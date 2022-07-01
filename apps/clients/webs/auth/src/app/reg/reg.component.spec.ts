import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegComponent } from './reg.component';

describe('RegComponent', () => {
    let component: RegComponent;
    let fixture: ComponentFixture<RegComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegComponent, HttpClientTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(RegComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
