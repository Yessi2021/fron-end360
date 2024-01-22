import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLevelMaturityComponent } from './show-level-maturity.component';

describe('ShowLevelMaturityComponent', () => {
    let component: ShowLevelMaturityComponent;
    let fixture: ComponentFixture<ShowLevelMaturityComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShowLevelMaturityComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ShowLevelMaturityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
