import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkColumnsComponent } from './link-columns.component';

describe('LinkColumnsComponent', () => {
    let component: LinkColumnsComponent;
    let fixture: ComponentFixture<LinkColumnsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LinkColumnsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LinkColumnsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
