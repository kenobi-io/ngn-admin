import { async, TestBed } from '@angular/core/testing';
import { UiKitModule } from './ui-kit.module';

describe('UiKitModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [UiKitModule],
        }).compileComponents();
    }));

    // TODO: Add real tests here.
    //
    // NB: This particular test does not do anything useful.
    //     It does NOT check for correct instantiation of the module.
    it('should have a module definition', () => {
        expect(UiKitModule).toBeDefined();
    });
});
