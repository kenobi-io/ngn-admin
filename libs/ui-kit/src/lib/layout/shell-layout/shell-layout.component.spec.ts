import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShellLayoutComponent } from './shell-layout.component';

describe('ShellLayoutComponent', () => {
    let component: ShellLayoutComponent;
    let fixture: ComponentFixture<ShellLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, ShellLayoutComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ShellLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
