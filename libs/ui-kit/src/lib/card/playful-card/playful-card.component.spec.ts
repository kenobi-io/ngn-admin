import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayfulCardComponent } from './playful-card.component';

describe('PlayfulCardComponent', () => {
    let component: PlayfulCardComponent;
    let fixture: ComponentFixture<PlayfulCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlayfulCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PlayfulCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
