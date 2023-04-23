import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

export enum SaveDialogResult {
  Cancel,
  Download,
  Share,
  Copy,
};

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  SaveDialogResult = SaveDialogResult;

  get allowCopy(): boolean {
    return !navigator.userAgent.toLowerCase().includes('firefox');
  }

  get allowShare(): boolean {
    return navigator.userAgent.toLowerCase().includes('safari') || 
      navigator.userAgent.toLowerCase().includes('chrome');
  }
}
