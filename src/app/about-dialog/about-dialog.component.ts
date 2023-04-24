import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import packageJson from 'package.json'

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss']
})
export class AboutDialogComponent {
 
    readonly wallets = [
        {
            title: 'BTC',
            id: '33CkSPoRNYuRvzb57wNU5LaEHFAUbHzvbC',
        },
        {
            title: 'ETH',
            id: '0xD8c8373BB309314350c83E660D0A94C582481e71',
        },
        {
            title: 'USDT(Tron)',
            id: 'TGSu6UFJBzkgYfs74S9HowrqwDSetRq34W',
        },
        {
            title: 'BNB',
            id: '0xD8c8373BB309314350c83E660D0A94C582481e71',
        },
        {
            title: 'XMR',
            id: '43tgaMx2F4mcTpHnf1xG77AyX9g2ftybU97UXfpn6E5C5EVE5bkTosFdyeec65oBH8Au3SmSZdvBAFkh3uxdGh32HcJc28p',
        },
    ];
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    copy(text: string, tooltip: MatTooltip) {
        navigator.clipboard.writeText(text)
        .then(() => {
            tooltip.disabled = false;
            tooltip.show()
            setTimeout(() => {
                tooltip.disabled = true;
            }, 1000);
        });
    }

    get version(): string {
        return packageJson.version;
    }
}
