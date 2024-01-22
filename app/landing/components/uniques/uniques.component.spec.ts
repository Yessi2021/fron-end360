import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquesComponent } from './uniques.component';

describe('UniquesComponent', () => {
    let component: UniquesComponent;
    let fixture: ComponentFixture<UniquesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UniquesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UniquesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
