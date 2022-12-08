import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { HTTP_ACCESSES } from '@ngn-template/access';
import { POPOVER_KITS } from '@ngn-template/ui-kit';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
    let component: AccountComponent;
    let fixture: ComponentFixture<AccountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                AccountComponent,
                HttpClientTestingModule,
                POPOVER_KITS,
                HTTP_ACCESSES,
                PortalModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create AccountComponent', fakeAsync(() => {
        expect(component).toBeTruthy();
        const popoverBtn = fixture.nativeElement.querySelector('button');
        popoverBtn.click();
        tick();
        fixture.detectChanges();
    }));
});
