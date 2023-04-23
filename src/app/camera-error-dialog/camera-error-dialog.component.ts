import { Component } from '@angular/core';

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
  CameraErrorDialogResult = CameraErrorDialogResult;
}
