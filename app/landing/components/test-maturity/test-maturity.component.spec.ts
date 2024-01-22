import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMaturityComponent } from './test-maturity.component';

describe('TestMaturityComponent', () => {
    let component: TestMaturityComponent;
    let fixture: ComponentFixture<TestMaturityComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestMaturityComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestMaturityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
