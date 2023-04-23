// ------------------------------------------------------------------------------------------------------------------
//  _ ______           _ ______     _ _____________          _ ______
//  ___  __/___  ___________  /__________  __ \__(_)___  _________  /
//  __  /  _  / / /_  ___/_  __ \  __ \_  /_/ /_  /__  |/_/  _ \_  / 
//  _  /   / /_/ /_  /   _  /_/ / /_/ /  ____/_  / __>  < /  __/  /  
//  /_/    \__,_/ /_/    /_.___/\____//_/     /_/  /_/|_| \___//_/   
//                                                                 
//  Project: TurboPixel PWA application for make pixel-art like photos
//
//  Author: @Turborium
//
//  Licensed under an MPL2.0
//
//  Copyright (c) Turborium (https://github.com/turborium/TurboPixel)
// -------------------------------------------------------------------------------------------------------------------

// Lasciate ogne speranza, voi ch’entrate

import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Camera, CameraType } from './camera';
import { MatDialog } from '@angular/material/dialog';
import { CameraErrorDialogComponent, CameraErrorDialogResult } from './camera-error-dialog/camera-error-dialog.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { SaveDialogComponent, SaveDialogResult } from './save-dialog/save-dialog.component';

import { PixelEffect } from './pixelator';
import { effects } from './effects';

@Component({
  selector: 'bottom-sheet-effects',
  template: `
    <mat-nav-list>
      <a mat-list-item (click)="openLink(i)" *ngFor="let effect of data.effects; index as i;">
        <span matLine>{{effect.title}}</span>
      </a>
    </mat-nav-list>
  `,
})

export class BottomSheetEffects {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetEffects>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {effects: Array<PixelEffect>}
  ) { }

  openLink(index: number): void {
    this.bottomSheetRef.dismiss(index);
  }
}

enum State {
  Init,
  Paused,
  Error,
  Work,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit, OnDestroy {

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('image') image!: ElementRef<HTMLElement>;
  @ViewChild('contentwrapper') contentwrapper!: ElementRef<HTMLElement>;
  
  readonly State = State;

  // title of application
  title: string = 'TurboPixel';
  // repo
  repoLink: string = 'https://www.github.com/turborium/TurboPixel';
  //
  appLink: string = 'https://turborium.github.io/turbopixel';
  // current state
  state: State = State.Init;
  // has processed frame
  hasFrame: boolean = false;
  // value of current effect
  effectValue: number = 0.5;
  // current effect
  selectedEffect: number = 0;
 
  effects: Array<PixelEffect> = effects;

  private camera!: Camera;
  private contentwrapperResizeObserver?: ResizeObserver;
  private timer: any = 0;
  private effectMaxWidth: number = 320;
  private effectMaxHeight: number = 320;
  private cachedCanvas = document.createElement('canvas');
  private watermark = new Image();

  constructor(private dialog: MatDialog, private bottomSheet: MatBottomSheet) {

  }

  // <next>
  clickNextEffect() {
    let index = this.selectedEffect != this.effects.length - 1 ? this.selectedEffect + 1 : 0;
    this.changeEffect(index);
  }

  // <before>
  clickBeforeEffect() {
    let index = this.selectedEffect != 0 ? this.selectedEffect - 1 : this.effects.length - 1;
    this.changeEffect(index);
  }

  // <effects>
  clickOpenBottomSheetEffect() {
    this.bottomSheet.open(BottomSheetEffects, {
        data: {
          effects: this.effects,
        }
      })
    .afterDismissed().subscribe((result) => {
      if (result != null)
        this.changeEffect(result);
    });
  }

  // <photo>
  clickTakePhoto() {
    // upscale
    let tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.cachedCanvas.width * 3;
    tempCanvas.height = this.cachedCanvas.height * 3;
    tempCanvas.getContext("2d")!.imageSmoothingEnabled = false;
    tempCanvas.getContext("2d")!.drawImage(
      this.cachedCanvas, 0, 0, tempCanvas.width, tempCanvas.height);

    // get image and name
    const dataUrl = tempCanvas.toDataURL('image/png');
    const fileName = 'Pixel_' + Date.now().toString() + '.png';
    const shareText = '#TurboPixel with \"' +
      // wow MEGA CLEAN CODE
      (this.effects[this.selectedEffect].title.startsWith(' ', 1) ?
        this.effects[this.selectedEffect].title.substring(2) :
        this.effects[this.selectedEffect].title) + 
        '\" palette';

    // save dialog
    const dialogRef = this.dialog.open(SaveDialogComponent, {
      disableClose: false,
      data: {
        image: dataUrl,
        text: shareText,
        appLink: this.appLink
      }
    });
    
    // camera off
    dialogRef.afterOpened().subscribe(() => {
      this.cameraStop();
    });

    // save
    // wow! this is realy-cool code :))
    dialogRef.afterClosed().subscribe(async (result) => {
      try {
        if (result == SaveDialogResult.Download) {
          // save to file
          let link = document.createElement('a');
          link.download = fileName;
          link.href = dataUrl;
          link.click();
        } 
        else if (result == SaveDialogResult.Share) {
          // save to share
          let response = await fetch(dataUrl);
          let blob = await response.blob();
          let file = new File([blob], fileName, {
            type: blob.type,
            lastModified: new Date().getTime(),
          });
          navigator.share({
            files: [file],
          });
        }
        else if (result == SaveDialogResult.Copy) {
          // save to clipboard
          if (navigator.userAgent.toLowerCase().includes('chrome')) {
            // good, but not work in safari
            let response = await fetch(dataUrl);
            let blob = await response.blob();
            let item = new ClipboardItem({'image/png': blob});
            navigator.clipboard.write([item]);
          } else if (navigator.userAgent.toLowerCase().includes('safari')) {
            // for ios
            let makeImagePromise = async () => {
              let response = await fetch(dataUrl);
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
            image.src = dataUrl;
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
      }
      catch (error) {
        // wtf???
        console.log(error);
      }
      finally {
        // camera on
        this.cameraStart(CameraType.Current);
      }
    });
  }

  cameraStart(cameraType: CameraType) {
    this.state = State.Init;
    this.camera.start(
      this.effectMaxWidth,//this.effects[this.selectedEffect].width,
      this.effectMaxHeight,//this.effects[this.selectedEffect].height,
      cameraType
    )
    .then(() => {
      this.state = State.Work;
 
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.updateFrame();
      }, 
      50);
      this.updateFrame();
    })
    .catch((error) => {
      const dialogRef = this.dialog.open(CameraErrorDialogComponent, {
        disableClose: true
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == CameraErrorDialogResult.ReloadPage) {
          window.location.reload();
        } else {
          this.cameraStart(cameraType);
        }
      });
    });
  }

  cameraStop() {
    this.hasFrame = false;
    this.state = State.Paused;
    this.camera.stop();
  }

  clickNextCamera() {
    this.cameraStop();
    this.cameraStart(CameraType.Next);
  }

  changeEffect(effectIndex: number) {
    /*if (this.state != State.Work ||
        this.effects[effectIndex].width != this.camera.width ||
        this.effects[effectIndex].height != this.camera.height) {
      this.cameraStop();
      this.selectedEffect = effectIndex;
      this.cameraStart(CameraType.Current);
    } else {
      this.selectedEffect = effectIndex;
    }*/
    this.hasFrame = false;
    this.selectedEffect = effectIndex;
    this.effectValue = 0.5;
  }

  // mmm... some smell
  updateFrame() {
    this.hasFrame = false;
 
    let frame = this.camera.getFrameWithSize(
      this.effects[this.selectedEffect].width,
      this.effects[this.selectedEffect].height
    );
    if (frame == null) {
      this.canvas.nativeElement.getContext("2d")!.clearRect(
        0, 0,
        this.canvas.nativeElement.width, this.canvas.nativeElement.height
      );
      return;
    }
 
    this.effects[this.selectedEffect].process(frame, this.effectValue);

    // draw frame
    if (this.cachedCanvas.width != frame.width || this.cachedCanvas.height != frame.height) {
      this.cachedCanvas.width = frame.width;
      this.cachedCanvas.height = frame.height;
    }
    this.cachedCanvas.getContext("2d")!.putImageData(frame, 0, 0);

    // watermark
    if (this.watermark.complete && this.watermark.naturalWidth != 0) {
      this.cachedCanvas.getContext("2d")!.drawImage(
        this.watermark,
        this.cachedCanvas.width - this.watermark.width,
        this.cachedCanvas.height - this.watermark.height,
      );
    }

    // draw frame on screen 
    let scaledWidth = frame.width * 2;
    let scaledHeight = frame.height * 2;
    if (this.canvas.nativeElement.width != scaledWidth || this.canvas.nativeElement.height != scaledHeight) {
      this.canvas.nativeElement.width = scaledWidth;
      this.canvas.nativeElement.height = scaledHeight;
    }
    this.canvas.nativeElement.getContext("2d")!.imageSmoothingEnabled = false;
    this.canvas.nativeElement.getContext("2d")!.drawImage(
      this.cachedCanvas, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.hasFrame = true;
  }

  cameraWork() {
    this.state = State.Work;

    this.updateFrame();
  }

  ngAfterViewInit() {
    // refactor me please ...

    // iOS PWA - no scroll
    if (navigator.userAgent.toLowerCase().includes('safari')) {
      window.addEventListener("scroll", (e) => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
          e.preventDefault();
          window.scrollTo(0, 0);
        }
      });
    }

    // only for iOS PWA return from background
    if (navigator.userAgent.toLowerCase().includes('safari')) {
      addEventListener("visibilitychange", (event) => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
          if (document.visibilityState == 'visible') {
            this.cameraStop();
            this.cameraStart(CameraType.Current);
          }
        }
      });
    }

    // layout (arrrrr!)
    this.contentwrapperResizeObserver = new ResizeObserver((entries) => {
      let aspect = this.effects[this.selectedEffect].width / this.effects[this.selectedEffect].height;
      if (entries[0].contentRect.width / aspect < entries[0].contentRect.height)
      {
        this.contentwrapper.nativeElement.style.flexDirection = "row";
        this.image.nativeElement.style.height = ((1 / aspect) * this.contentwrapper.nativeElement.clientWidth).toString() + 'px';
      } else {
        this.contentwrapper.nativeElement.style.flexDirection = "column";
        this.image.nativeElement.style.width = (aspect * this.contentwrapper.nativeElement.clientHeight).toString() + 'px';
      }
    });
    this.contentwrapperResizeObserver.observe(this.contentwrapper.nativeElement);

    // calc max size
    for (let effect of this.effects) {
      if (effect.width > this.effectMaxWidth) 
        this.effectMaxWidth = effect.width;
      if (effect.height > this.effectMaxHeight) 
        this.effectMaxHeight = effect.height;
    }

    this.watermark.src = '/assets/watermark.png';

    // camera 
    this.camera = new Camera(this.video.nativeElement);
    //this.changeEffect(0);
    this.cameraStart(this.camera.hasEnvironmentCamera ? CameraType.Environment : CameraType.User);
  }

  ngOnDestroy() {
    this.contentwrapperResizeObserver?.unobserve(this.contentwrapper.nativeElement);  
  }
}

 