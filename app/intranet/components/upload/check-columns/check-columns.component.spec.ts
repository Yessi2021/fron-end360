import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckColumnsComponent } from './check-columns.component';

describe('CheckColumnsComponent', () => {
    let component: CheckColumnsComponent;
    let fixture: ComponentFixture<CheckColumnsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CheckColumnsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CheckColumnsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
