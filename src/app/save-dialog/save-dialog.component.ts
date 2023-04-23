import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { ViewChild } from '@angular/core';

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

    @ViewChild("copyTooltip") copyTooltip!: MatTooltip;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    SaveDialogResult = SaveDialogResult;

    get allowCopy(): boolean {
        return !navigator.userAgent.toLowerCase().includes('firefox');
    }

    get allowShare(): boolean {
        return navigator.userAgent.toLowerCase().includes('safari') ||
            navigator.userAgent.toLowerCase().includes('chrome');
    }

    copyDescription() {
        navigator.clipboard.writeText(this.data.text + '\n' + this.data.appLink)
            .then(() => {
                this.copyTooltip.disabled = false;
                this.copyTooltip.show()
                setTimeout(() => {
                    this.copyTooltip.disabled = true;
                }, 1000);
            });
    }
}
