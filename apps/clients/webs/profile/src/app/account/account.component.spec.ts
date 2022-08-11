import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SEARCH_KITS, SVG_KITS, TAB_KITS } from '@ngn-template/ui-kit';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
    let component: AccountComponent;
    let fixture: ComponentFixture<AccountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AccountComponent,
                HttpClientTestingModule,
                SEARCH_KITS,
                TAB_KITS,
                SVG_KITS,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
