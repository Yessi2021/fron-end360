import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationServiceComponent } from './translation-service.component';

describe('TranslationServiceComponent', () => {
    let component: TranslationServiceComponent;
    let fixture: ComponentFixture<TranslationServiceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TranslationServiceComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TranslationServiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
