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
//  This file "camera.ts" licensed under an MPL1.1
//
//  Copyright (c) Turborium (https://github.com/turborium/TurboPixel)
// -------------------------------------------------------------------------------------------------------------------

/* 
  ***** BEGIN LICENSE BLOCK *****

  The contents of this file are subject to the Mozilla Public License Version 1.1 (the "License");
  you may not use this file except in compliance with the License. 
  You may obtain a copy of the License at http://www.mozilla.org/MPL/

  Software distributed under the License is distributed on an "AS IS" basis,
  WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific
  language governing rights and limitations under the License.

  The Original Code "camera.ts" is the Turborium TurboPixel (https://github.com/turborium/turbopixel).

  The Initial Developer of the Original Code is Peter (@turborium).
  Copyright (c) 2023-2023 Turborium (https://github.com/turborium/)

  Portions created by Contributors. All rights reserved.

  According to MPL1.1 license:
  - When you using the code from this file, you MUST notify the user of your Software that
    the part of Turborium TurboPixel (https://github.com/turborium/turbopixel) code is being used.
  - Also you MUST include this license notice to file uses this source code.

  ***** END LICENSE BLOCK *****
*/

export enum CameraType {
    User,
    Environment,
    Next,
    Current, 
}

export class Camera {
    private deviceIdList: Array<string> = [];
    private deviceId: string = '';
    private video: HTMLVideoElement;
    private canvas: HTMLCanvasElement = document.createElement('canvas');

    get width(): number {
        return this.canvas.width;
    }

    get height(): number {
        return this.canvas.height;
    }

    constructor(video: HTMLVideoElement | null) {
        if (video != null)
            this.video = video;
        else
            this.video = document.createElement('video');
    }

    get hasEnvironmentCamera(): boolean {
        return ('ontouchstart' in document.documentElement); // hack
    }

    getNextDevice(deviceId: string): string {
        let index = this.deviceIdList.indexOf(deviceId);
        if (index == -1)
            return deviceId;
        return this.deviceIdList[(index + 1) % this.deviceIdList.length];
    }

    lazyDeviceIdListInit() {
        return navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
            devices.forEach((device) => {
                if (device.kind == 'videoinput') {
                    this.deviceIdList.push(device.deviceId);
                    console.log(device.deviceId);
                }
            });
        });
    }

    private stopVideo() {
        let src = this.video.srcObject as MediaStream;
        this.video.pause();
        this.video.srcObject = null;

        if (src != null) {
            src.getTracks().forEach((track) => {
                track.stop();
            });
        }
    }

    private startVideo(stream: MediaStream) {
        this.video.playsInline = true;
        this.video.muted = true;
        this.video.srcObject = stream;
        this.video.onloadedmetadata = (event) => {
            this.video.play();
        };
    }

    stop() {
        this.stopVideo();
    }

    start(width: number, height: number, camera: CameraType | string) {
        this.stop();

        this.canvas.width = width;
        this.canvas.height = height;
        
        let constraints: MediaTrackConstraints = {}; 

        // width
        // height
        // aspectRatio
        // if you set size and aspect ratio restrictions in F**kedFox, you can get an empty video stream
        // hack
        if (!navigator.userAgent.toLowerCase().includes('firefox')) {
            // chrome take damaged pictire in low resolution
            // hack
            if ((width >= 320 && height >= 320) || navigator.userAgent.toLowerCase().includes('ios')) {
                constraints.width = width;
                constraints.height = height;
                constraints.aspectRatio = width / height;
            } else {
                if (width >= height) {
                    constraints.height = 320;
                    constraints.width = 320 * (width / height);
                } else {
                    constraints.width = 320;
                    constraints.height = 320 * (height / width);
                }
            }
        }

        // facingMode
        // deviceId
        switch (camera) {
            case CameraType.Environment:
                constraints.facingMode = 'environment';
                break;
            case CameraType.User:
                constraints.facingMode = 'user';
                break;
            case CameraType.Next:
                constraints.deviceId = this.getNextDevice(this.deviceId);
                break;
            case CameraType.Current:
                constraints.deviceId = this.deviceId;
                break;
            default:
                constraints.deviceId = this.deviceId; 
        }

        return navigator.mediaDevices
        .getUserMedia({
            video: constraints,
            audio: false,
        })
        .then((stream) => {
            // lazy init
            if (this.deviceIdList.length == 0) {
                this.lazyDeviceIdListInit()
                .catch((error) => {
                    throw error;
                });
            }

            let track = stream.getVideoTracks()[0];
            this.deviceId = track.getSettings().deviceId || '';

            this.startVideo(stream);

            return stream;
        });
    } 

    getFrame(): ImageData | null {
        if (this.video == null || this.video.videoWidth == 0 || this.video.videoHeight == 0) {
            return null;
        }

        let context = this.canvas.getContext("2d", {willReadFrequently: true})!;

        let w, h = 0;
        let widthHeight = this.video.videoWidth / this.video.videoHeight;
        if (this.canvas.height < (this.canvas.width / widthHeight)) {
          w = this.canvas.width;
          h = this.canvas.width / widthHeight;
        } else {
          h = this.canvas.height;
          w = this.canvas.height * widthHeight;
        }

        context.drawImage(this.video, -(w - this.canvas.width) * 0.5, -(h - this.canvas.height) * 0.5, w, h);

        /*
        context.font = "18px serif";
        context.fillStyle = "red";
        context.fillText(this.video.videoWidth.toString() + 'x' + this.video.videoHeight.toString(), 110, 110);
        */
        
        return context.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    getFrameWithSize(width: number, height: number): ImageData | null {
        if (this.video == null || this.video.videoWidth == 0 || this.video.videoHeight == 0) {
            return null;
        }

        let context = this.canvas.getContext("2d", {willReadFrequently: true})!;

        let w, h = 0;
        let widthHeight = this.video.videoWidth / this.video.videoHeight;
        if (height < (width / widthHeight)) {
          w = width;
          h = width / widthHeight;
        } else {
          h = height;
          w = height * widthHeight;
        }

        context.drawImage(this.video, -(w - width) * 0.5, -(h - height) * 0.5, w, h);

        /*
        context.font = "18px serif";
        context.fillStyle = "red";
        context.fillText(this.video.videoWidth.toString() + 'x' + this.video.videoHeight.toString(), 110, 110);
        */
        //context.strokeStyle = "red";
        //context.strokeRect(0, 0, width, height);
        
        return context.getImageData(0, 0, width, height);
    }
}