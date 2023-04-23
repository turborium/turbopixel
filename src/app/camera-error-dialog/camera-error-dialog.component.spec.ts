import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraErrorDialogComponent } from './camera-error-dialog.component';

describe('CameraErrorDialogComponent', () => {
    let component: CameraErrorDialogComponent;
    let fixture: ComponentFixture<CameraErrorDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CameraErrorDialogComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CameraErrorDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
