import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

export enum CameraErrorDialogResult {
    TryAgain,
    ReloadPage
};

@Component({
    selector: 'app-camera-error-dialog',
    templateUrl: './camera-error-dialog.component.html',
    styleUrls: ['./camera-error-dialog.component.css']
})
export class CameraErrorDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    CameraErrorDialogResult = CameraErrorDialogResult;
}
