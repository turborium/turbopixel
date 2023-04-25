import { Component, OnDestroy } from '@angular/core';
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

export interface SaveDialogData {
    imageUrl: string;
    fileName: string;
    description: string;
};



@Component({
    selector: 'app-save-dialog',
    templateUrl: './save-dialog.component.html',
    styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent implements OnDestroy  {

    @ViewChild("copyTooltip") copyTooltip!: MatTooltip;

    shareIframe!: HTMLIFrameElement;
 

    constructor(@Inject(MAT_DIALOG_DATA) public data: SaveDialogData) {
        


        // WHY USED IFRAME FOR SHARE?
        // SEE THIS: 
        // https://stackoverflow.com/questions/64055853/navigator-share-only-working-once-in-ios-second-click-throws-error-request-is
        // https://developer.apple.com/forums/thread/662629
        // WEB IS AWESOME TECHNOLOGY
        let iframeBlob = new Blob(['<!DOCTYPE html><html>'], {type: "text/html"});
        this.shareIframe = document.createElement("iframe");
        this.shareIframe.src = URL.createObjectURL(iframeBlob);
        this.shareIframe.style.display = "none";
        document.documentElement.appendChild(this.shareIframe);
    }

    ngOnDestroy() {
        // I'm not sure but I hope it works well
        document.documentElement.removeChild(this.shareIframe);
    }

    SaveDialogResult = SaveDialogResult;

    get allowCopy(): boolean {
        return !navigator.userAgent.toLowerCase().includes('firefox');
    }

    get allowShare(): boolean {
        return navigator.userAgent.toLowerCase().includes('safari') ||
            navigator.userAgent.toLowerCase().includes('chrome');
    }

    async copyDescription() {
        await navigator.clipboard.writeText(this.data.description);

        this.copyTooltip.disabled = false;
        this.copyTooltip.show()
        setTimeout(() => {
            this.copyTooltip.disabled = true;
        }, 1000);
    }

    async clickSave() {
        // YES, BROWSWER API HASN'T SAVE FILE API 
        let link = document.createElement('a');
        link.download = this.data.fileName;
        link.href = this.data.imageUrl;
        link.click();
    }

    async clickCopy() {
        if (navigator.userAgent.toLowerCase().includes('chrome')) {
            // good, but not work in chrome
            let response = await fetch(this.data.imageUrl);
            let blob = await response.blob();
            navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
        } else if (navigator.userAgent.toLowerCase().includes('safari')) {
            // workaround for safari
            let makeImagePromise = async () => {
                let response = await fetch(this.data.imageUrl);
                return await response.blob();
            }
            navigator.clipboard.write([
                new ClipboardItem({
                    "image/png": makeImagePromise(),
                }),
            ]);
        } else {
            // bad code
            let image = document.createElement('img');
            image.src = this.data.imageUrl;
            let div = document.createElement('div');
            div.contentEditable = 'true';
            div.appendChild(image);
            document.body.appendChild(div);
            try {
                div.focus();
                window.getSelection()!.selectAllChildren(div);
                document.execCommand('Copy');// HACK
            }
            finally {
                document.body.removeChild(div);
            }
        }
    }

    async clickShare() {
        let response = await fetch(this.data.imageUrl);
        let blob = await response.blob();
        let file = new File([blob], this.data.fileName, {
            type: blob.type,
            lastModified: new Date().getTime(),
        });

        try {
            await this.shareIframe.contentWindow!.navigator.share({
                files: [file],
            });
            this.shareIframe.contentWindow!.location.reload(); 
        } 
        catch(error) {
            console.log(error);
        } 
        finally {
            // see links above
            this.shareIframe.contentWindow!.location.reload();
        }
    }
}
