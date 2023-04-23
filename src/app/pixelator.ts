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
//  This file "pixelator.ts" licensed under an MPL1.1
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

  The Original Code "pixelator.ts" is the Turborium TurboPixel (https://github.com/turborium/turbopixel).

  The Initial Developer of the Original Code is Peter (@turborium).
  Copyright (c) 2023-2023 Turborium (https://github.com/turborium/)

  Portions created by Contributors. All rights reserved.

  According to MPL1.1 license:
  - When you using the code from this file, you MUST notify the user of your Software that
    the part of Turborium TurboPixel (https://github.com/turborium/turbopixel) code is being used.
  - Also you MUST include this license notice to file uses this source code.

  ***** END LICENSE BLOCK *****
*/

// the dark side

export interface PixelEffect {
    readonly title: string;
    readonly width: number;
    readonly height: number;
    process(frame: ImageData, value: number): void;
}

export class TestEchoEffect implements PixelEffect {
    title = '◢ Red Echo Test';
    width = 200;
    height = 200;
    process(frame: ImageData, value: number) {
        for (let i = 0; i < frame.data.length; i += 4) {
            let r = frame.data[i + 0];
            let g = frame.data[i + 1];
            let b = frame.data[i + 2];
            
            if (r * 2.8 * value > g * 1.4 + b) {
                g = 0;
                b = 0;
            } else {
                r = (g + b) / 2;
                g = r;
                b = r;
            }

            frame.data[i + 0] = r;
            frame.data[i + 1] = g;
            frame.data[i + 2] = b;
        }
    }
}

export class ChornobylEffect implements PixelEffect {
    title = '◢ Chornobyl';
    width = 320;
    height = 320;
    process(frame: ImageData, value: number) {
        for (let i = 0; i < frame.data.length; i += 4) {
            let r = frame.data[i + 0];
            let g = frame.data[i + 1];
            let b = frame.data[i + 2];
            
            let v = (r + g + b) / 3;

            if (v + (Math.random() * 20 - 10) < 127 + 255 * (value - 0.5)) {
                r = 0;
                g = 0;
                b = 0;
            } else {
                r = 255;
                g = 255;
                b = 255;
            }

            frame.data[i + 0] = r;
            frame.data[i + 1] = g;
            frame.data[i + 2] = b;
        }
    }
}

export class JustRgbEffect implements PixelEffect {
    title = '◢ Just RGB';
    width = 320;
    height = 320;
    process(frame: ImageData, value: number) {
        for (let i = 0; i < frame.data.length; i += 4) {
            let r = frame.data[i + 0];
            let g = frame.data[i + 1];
            let b = frame.data[i + 2];
            
            if (r < 255 * value + (Math.random() * 10 - 5))
                r = 0;
            else
                r = 255;

            if (g < 255 * value + (Math.random() * 10 - 5))
                g = 0;
            else
                g = 255;
                
            if (b < 255 * value + (Math.random() * 10 - 5))
                b = 0;
            else
                b = 255;

            frame.data[i + 0] = r;
            frame.data[i + 1] = g;
            frame.data[i + 2] = b;
        }
    }
}

let clip = (v: number) => {
  return (v < 0) ? 0 : ((v > 255) ? 255 : v);
}

export class BlackWhiteDitherEffect implements PixelEffect {
    title = 'B/W Dither';
    width = 250;
    height = 250;
    process(frame: ImageData, value: number) {
        let currentError: Array<number> = [];
        let nextError: Array<number> = [];
        for (let i = 0; i < frame.width + 2; i++) {
            currentError[i] = 0;
            nextError[i] = 0;
        } 
        let index = 0;
        for (let y = 0; y < frame.height; y++) {
            for (let x = 0; x < frame.width; x++) {
                // calc bright
                let bright = Math.floor(
                    0.299 * frame.data[index + 0] + 
                    0.587 * frame.data[index + 1] + 
                    0.114 * frame.data[index + 2]
                );

                // correct bright
                bright = clip(
                   bright + Math.floor((currentError[x + 1] * (value)) / 16)
                );

                // find closest bright
                let newBright;
                if (bright <= 127) 
                    newBright = 0;
                else
                    newBright = 255;

                // save color
                frame.data[index + 0] = newBright;
                frame.data[index + 1] = newBright;
                frame.data[index + 2] = newBright;

                // calc error
                let error = bright - newBright;
                currentError[x + 2] = currentError[x + 2] + 7 * error;
                nextError[x + 0] = nextError[x + 0] + 3 * error;
                nextError[x + 1] = nextError[x + 1] + 5 * error;
                nextError[x + 2] = nextError[x + 2] + 1 * error;
                
                // next
                index = index + 4;
            }
            for (let i = 0; i < currentError.length; i++) {
                currentError[i] = nextError[i];
                nextError[i] = 0;
            }
        }
    }
}

export class BlackWhiteStuckiDitherEffect implements PixelEffect {
    title = 'B/W Stucki';
    width = 250;
    height = 250;
    process(frame: ImageData, value: number) {
        let currentError: Array<number> = [];
        let nextError: Array<number> = [];
        let nextNextError: Array<number> = [];
        for (let i = 0; i < frame.width + 3; i++) {
            currentError[i] = 0;
            nextError[i] = 0;
            nextNextError[i] = 0;
        } 
        let index = 0;
        for (let y = 0; y < frame.height; y++) {
            for (let x = 0; x < frame.width; x++) {
                // calc bright
                let bright = Math.floor(
                    0.299 * frame.data[index + 0] + 
                    0.587 * frame.data[index + 1] + 
                    0.114 * frame.data[index + 2]
                );

                // correct bright
                bright = clip(
                  bright + Math.floor((currentError[x + 2] * (value)) / 42)
                );

                // find closest bright
                let newBright;
                if (bright <= 127) 
                    newBright = 0;
                else
                    newBright = 255;

                // save color
                frame.data[index + 0] = newBright;
                frame.data[index + 1] = newBright;
                frame.data[index + 2] = newBright;

                // calc error
                let error = bright - newBright;
                currentError[x + 3] = currentError[x + 3] + 8 * error;
                currentError[x + 4] = currentError[x + 4] + 4 * error;
                nextError[x + 0] = nextError[x + 0] + 2 * error;
                nextError[x + 1] = nextError[x + 1] + 4 * error;
                nextError[x + 2] = nextError[x + 2] + 8 * error;
                nextError[x + 3] = nextError[x + 3] + 4 * error;
                nextError[x + 4] = nextError[x + 4] + 2 * error;
                nextNextError[x + 0] = nextNextError[x + 0] + 1 * error;
                nextNextError[x + 1] = nextNextError[x + 1] + 2 * error;
                nextNextError[x + 2] = nextNextError[x + 2] + 4 * error;
                nextNextError[x + 3] = nextNextError[x + 3] + 2 * error;
                nextNextError[x + 4] = nextNextError[x + 4] + 1 * error;
                
                // next
                index = index + 4;
            }
            for (let i = 0; i < currentError.length; i++) {
                currentError[i] = nextError[i];
                nextError[i] = nextNextError[i];
                nextNextError[i] = 0;
            }
        }
    }
}

let bayerMatrix4x4 = [
	[0, 12, 3, 15],
	[8, 4, 11, 7],
	[2, 14, 1, 13],
	[10, 6, 9, 5],
];

export class BayerPaletteEffect implements PixelEffect {
    title = 'Bayer';
    width = 250;
    height = 250;
    palette = new Array<Color>;
    constructor(title: string, width: number, height: number, palette: Array<number>) {
      this.width = width;
      this.height = height;
      this.title = title;
      this.palette = [];
      for (let i = 0; i < palette.length; i++) {
          this.palette.push(new Color(
              (palette[i] >> 16) & 0xFF,
              (palette[i] >>  8) & 0xFF,
              (palette[i] >>  0) & 0xFF,
          ));    
      }
    }
    process(frame: ImageData, value: number) {
        let index = 0;
        for (let y = 0; y < frame.height; y++) {
            for (let x = 0; x < frame.width; x++) {
                // calc bright
                let bright = Math.floor(
                    0.299 * frame.data[index + 0] + 
                    0.587 * frame.data[index + 1] + 
                    0.114 * frame.data[index + 2]
                );

                let bayer = bayerMatrix4x4[y % 4][x % 4];

                let palIndex = Math.floor(
                    (bright * this.palette.length + (bayer - 8) * 16 * value) / 256
                );

                if (palIndex < 0)
                    palIndex = 0;
                else if (palIndex >= this.palette.length)
                    palIndex = this.palette.length - 1;

                frame.data[index + 0] = this.palette[palIndex].R;
                frame.data[index + 1] = this.palette[palIndex].G;
                frame.data[index + 2] = this.palette[palIndex].B;
                
                // next
                index = index + 4;
            }
        }
    }
}

let calcDist = (color1: Color, color2: Color) => {
  let distR = color1.R - color2.R;
  let distG = color1.G - color2.G;
  let distB = color1.B - color2.B;
  return distR * distR * 2 + distG * distG * 3 + distB * distB;
}

export class BayerColorPaletteEffect implements PixelEffect {
  title = 'Bayer';
  width = 250;
  height = 250;
  palette = new Array<Color>;
  levels = new Color(2, 2, 2);
  constructor(title: string, width: number, height: number, palette: Array<number>, levels: Color) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.levels = levels;
    this.palette = [];
    for (let i = 0; i < palette.length; i++) {
        this.palette.push(new Color(
            (palette[i] >> 16) & 0xFF,
            (palette[i] >>  8) & 0xFF,
            (palette[i] >>  0) & 0xFF,
        ));    
    }
  }
  findClosest(color: Color): Color {
    let index = 0;
    let minDist = 255 * 255 * 4; 
    for (let i = 0; i < this.palette.length; i++) {
        let distR = this.palette[i].R - color.R;
        let distG = this.palette[i].G - color.G;
        let distB = this.palette[i].B - color.B;
        let dist = distR * distR * 3 + distG * distG * 4 + distB * distB * 2;
        if (dist < minDist) {
            minDist = dist;  
            index = i;
        } 
    }
    return this.palette[index];
}
  process(frame: ImageData, value: number) {
      let index = 0;
      for (let y = 0; y < frame.height; y++) {
          for (let x = 0; x < frame.width; x++) {
                // calc bright
              let color = new Color(
                frame.data[index + 0],
                frame.data[index + 1], 
                frame.data[index + 2],
              );

              let bayer = bayerMatrix4x4[y % 4][x % 4];

              let levelR = Math.floor((color.R * (this.levels.R + 1) + (bayer - 8) * 16 * value) / 256);
              let levelG = Math.floor((color.G * (this.levels.G + 1) + (bayer - 8) * 16 * value) / 256);
              let levelB = Math.floor((color.B * (this.levels.B + 1) + (bayer - 8) * 16 * value) / 256);

              let fakeColor = new Color(
                  this.levels.R > 1 ? clip(levelR * (255 / (this.levels.R - 1))) : color.R,
                  this.levels.G > 1 ? clip(levelG * (255 / (this.levels.G - 1))) : color.G,
                  this.levels.B > 1 ? clip(levelB * (255 / (this.levels.B - 1))) : color.B,
              );

              let newColor = this.findClosest(fakeColor); 

              frame.data[index + 0] = newColor.R;
              frame.data[index + 1] = newColor.G;
              frame.data[index + 2] = newColor.B;
              
              // next
              index = index + 4;
          }
      }
  }
}

export class GrayDitherEffect implements PixelEffect {
    title = 'Gray Dither';
    width = 256;
    height = 256;
    process(frame: ImageData, value: number) {
        let currentError: Array<number> = [];
        let nextError: Array<number> = [];
        for (let i = 0; i < frame.width + 2; i++) {
            currentError[i] = 0;
            nextError[i] = 0;
        } 
        let index = 0;
        for (let y = 0; y < frame.height; y++) {
            for (let x = 0; x < frame.width; x++) {
                // calc bright
                let bright = Math.floor(
                    0.299 * frame.data[index + 0] + 
                    0.587 * frame.data[index + 1] + 
                    0.114 * frame.data[index + 2]
                );

                // correct bright
                bright = clip(
                   bright + Math.floor(currentError[x + 1] * (value) / 16)
                );

                // find closest bright
                let newBright;
                if (bright < 64) 
                    newBright = 0;
                else if (bright < 128)
                    newBright = 85;
                else if (bright < 192)  
                    newBright = 170;
                else
                    newBright = 255;

                // save color
                frame.data[index + 0] = newBright;
                frame.data[index + 1] = newBright;
                frame.data[index + 2] = newBright;

                // calc error
                let error = bright - newBright;
                currentError[x + 2] = currentError[x + 2] + 7 * error;
                nextError[x + 0] = nextError[x + 0] + 3 * error;
                nextError[x + 1] = nextError[x + 1] + 5 * error;
                nextError[x + 2] = nextError[x + 2] + 1 * error;
                
                // next
                index = index + 4;
            }
            for (let i = 0; i < currentError.length; i++) {
                currentError[i] = nextError[i];
                nextError[i] = 0;
            }
        }
    }
}

export class Color {
    R: number = 0;
    G: number = 0;
    B: number = 0;
    constructor(R: number, G: number, B: number) {
      this.R = R;
      this.G = G;
      this.B = B;
    }
}

export class RGBDitherEffect implements PixelEffect {
    title = 'RGB Dither';
    width = 256;
    height = 256;
    process(frame: ImageData, value: number) {
        let currentError: Array<Color> = [];
        let nextError: Array<Color> = [];
        for (let i = 0; i < frame.width + 2; i++) {
            currentError[i] = new Color(0, 0, 0);
            nextError[i] = new Color(0, 0, 0);
        } 
        let index = 0;
        for (let y = 0; y < frame.height; y++) {
            for (let x = 0; x < frame.width; x++) {
                // calc bright
                let bright = Math.floor(
                    0.299 * frame.data[index + 0] + 
                    0.587 * frame.data[index + 1] + 
                    0.114 * frame.data[index + 2]
                );

                let color = new Color(
                    frame.data[index + 0] + Math.floor((currentError[x + 1].R * value) / 16),
                    frame.data[index + 1] + Math.floor((currentError[x + 1].G * value) / 16),
                    frame.data[index + 2] + Math.floor((currentError[x + 1].B * value) / 16),
                );

                let closetColor = new Color(0, 0, 0);
                // find closest 
                if (color.R < 128) 
                    closetColor.R = 0;
                else
                    closetColor.R = 255;
                if (color.G < 128) 
                    closetColor.G = 0;
                else
                    closetColor.G = 255;
                if (color.B < 128) 
                    closetColor.B = 0;
                else
                    closetColor.B = 255;

                // save color
                frame.data[index + 0] = closetColor.R;
                frame.data[index + 1] = closetColor.G;
                frame.data[index + 2] = closetColor.B;

                // calc error
                let error = new Color(
                    color.R - closetColor.R,
                    color.G - closetColor.G,
                    color.B - closetColor.B,
                );
                currentError[x + 2].R = currentError[x + 2].R + 7 * error.R;
                currentError[x + 2].G = currentError[x + 2].G + 7 * error.G;
                currentError[x + 2].B = currentError[x + 2].B + 7 * error.B;
                nextError[x + 0].R = nextError[x + 0].R + 3 * error.R;
                nextError[x + 0].G = nextError[x + 0].G + 3 * error.G;
                nextError[x + 0].B = nextError[x + 0].B + 3 * error.B;
                nextError[x + 1].R = nextError[x + 1].R + 5 * error.R;
                nextError[x + 1].G = nextError[x + 1].G + 5 * error.G;
                nextError[x + 1].B = nextError[x + 1].B + 5 * error.B;
                nextError[x + 2].R = nextError[x + 2].R + 1 * error.R;
                nextError[x + 2].G = nextError[x + 2].G + 1 * error.G;
                nextError[x + 2].B = nextError[x + 2].B + 1 * error.B;
                
                // next
                index = index + 4;
            }
            for (let i = 0; i < currentError.length; i++) {
                currentError[i] = nextError[i];
                nextError[i] = new Color(0, 0, 0);
            }
        }
    }
}

export class PaletteDitherEffect implements PixelEffect {
    title = 'Palette Dither';
    width = 256;
    height = 256;
    palette: Array<Color> = [
      new Color(0, 0, 0),
      new Color(255, 255, 255),
      new Color(255, 0, 0),
    ];
    constructor(width: number, height: number, title: string, palette: Array<number>) {
        this.width = width;
        this.height = height;
        this.title = title;
        this.palette = [];
        for (let i = 0; i < palette.length; i++) {
            this.palette.push(new Color(
                (palette[i] >> 16) & 0xFF,
                (palette[i] >>  8) & 0xFF,
                (palette[i] >>  0) & 0xFF,
            ));    
        }
    }
    findClosest(color: Color): Color {
        let index = 0;
        let minDist = 255 * 255 * 4; 
        for (let i = 0; i < this.palette.length; i++) {
            let distR = this.palette[i].R - color.R;
            let distG = this.palette[i].G - color.G;
            let distB = this.palette[i].B - color.B;
            let dist = distR * distR * 2 + distG * distG * 3 + distB * distB;
            if (dist < minDist) {
                minDist = dist;  
                index = i;
            } 
        }
        return this.palette[index];
    }
    process(frame: ImageData, value: number) {
        let currentError: Array<Color> = [];
        let nextError: Array<Color> = [];
        for (let i = 0; i < frame.width + 2; i++) {
            currentError[i] = new Color(0, 0, 0);
            nextError[i] = new Color(0, 0, 0);
        } 
        let index = 0;
        for (let y = 0; y < frame.height; y++) {
            for (let x = 0; x < frame.width; x++) {
                let color = new Color(
                    clip(frame.data[index + 0] + Math.floor((currentError[x + 1].R * value) / 16)),
                    clip(frame.data[index + 1] + Math.floor((currentError[x + 1].G * value) / 16)),
                    clip(frame.data[index + 2] + Math.floor((currentError[x + 1].B * value) / 16)),
                );

                let closetColor = this.findClosest(color);

                // save color
                frame.data[index + 0] = closetColor.R;
                frame.data[index + 1] = closetColor.G;
                frame.data[index + 2] = closetColor.B;

                // calc error
                let error = new Color(
                    color.R - closetColor.R,
                    color.G - closetColor.G,
                    color.B - closetColor.B,
                );
                currentError[x + 2].R = currentError[x + 2].R + 7 * error.R;
                currentError[x + 2].G = currentError[x + 2].G + 7 * error.G;
                currentError[x + 2].B = currentError[x + 2].B + 7 * error.B;
                nextError[x + 0].R = nextError[x + 0].R + 3 * error.R;
                nextError[x + 0].G = nextError[x + 0].G + 3 * error.G;
                nextError[x + 0].B = nextError[x + 0].B + 3 * error.B;
                nextError[x + 1].R = nextError[x + 1].R + 5 * error.R;
                nextError[x + 1].G = nextError[x + 1].G + 5 * error.G;
                nextError[x + 1].B = nextError[x + 1].B + 5 * error.B;
                nextError[x + 2].R = nextError[x + 2].R + 1 * error.R;
                nextError[x + 2].G = nextError[x + 2].G + 1 * error.G;
                nextError[x + 2].B = nextError[x + 2].B + 1 * error.B;
                
                // next
                index = index + 4;
            }
            for (let i = 0; i < currentError.length; i++) {
                currentError[i] = nextError[i];
                nextError[i] = new Color(0, 0, 0);
            }
        }
    }
}

export class PaletteStickiEffect implements PixelEffect {
    title = 'Palette Dither';
    width = 256;
    height = 256;
    palette: Array<Color> = [
      new Color(0, 0, 0),
      new Color(255, 255, 255),
      new Color(255, 0, 0),
    ];
    constructor(title: string, width: number, height: number, palette: Array<number>) {
        this.width = width;
        this.height = height;
        this.title = title;
        this.palette = [];
        for (let i = 0; i < palette.length; i++) {
            this.palette.push(new Color(
                (palette[i] >> 16) & 0xFF,
                (palette[i] >>  8) & 0xFF,
                (palette[i] >>  0) & 0xFF,
            ));    
        }
    }
    findClosest(color: Color): Color {
        let index = 0;
        let minDist = 255 * 255 * 255; 
        for (let i = 0; i < this.palette.length; i++) {
            let distR = this.palette[i].R - color.R;
            let distG = this.palette[i].G - color.G;
            let distB = this.palette[i].B - color.B;
            let dist = distR * distR * 2 + distG * distG * 3 + distB * distB;
            if (dist < minDist) {
                minDist = dist;  
                index = i;
            } 
        }
        return this.palette[index];
    }
    process(frame: ImageData, value: number) {
        value = value * 0.7;
        let currentError: Array<Color> = [];
        let nextError: Array<Color> = [];
        let nextNextError: Array<Color> = [];
        for (let i = 0; i < frame.width + 4; i++) {
            currentError[i] = new Color(0, 0, 0);
            nextError[i] = new Color(0, 0, 0);
            nextNextError[i] = new Color(0, 0, 0); 
        } 
        let index = 0;
        for (let y = 0; y < frame.height; y++) {
            for (let x = 0; x < frame.width; x++) {
                let color = new Color(
                    clip(frame.data[index + 0] + Math.floor((currentError[x + 2].R * value) / 42)),
                    clip(frame.data[index + 1] + Math.floor((currentError[x + 2].G * value) / 42)),
                    clip(frame.data[index + 2] + Math.floor((currentError[x + 2].B * value) / 42)),
                );

                let closetColor = this.findClosest(color);

                // save color
                frame.data[index + 0] = closetColor.R;
                frame.data[index + 1] = closetColor.G;
                frame.data[index + 2] = closetColor.B;

                // calc error
                let error = new Color(
                    color.R - closetColor.R,
                    color.G - closetColor.G,
                    color.B - closetColor.B,
                );

                // 1
                currentError[x + 3].R = currentError[x + 3].R + 8 * error.R;
                currentError[x + 3].G = currentError[x + 3].G + 8 * error.G;
                currentError[x + 3].B = currentError[x + 3].B + 8 * error.B;
                // 2
                currentError[x + 4].R = currentError[x + 4].R + 4 * error.R;
                currentError[x + 4].G = currentError[x + 4].G + 4 * error.G;
                currentError[x + 4].B = currentError[x + 4].B + 4 * error.B;
                // 3
                nextError[x + 0].R = nextError[x + 0].R + 2 * error.R;
                nextError[x + 0].G = nextError[x + 0].G + 2 * error.G;
                nextError[x + 0].B = nextError[x + 0].B + 2 * error.B;
                // 4
                nextError[x + 1].R = nextError[x + 1].R + 4 * error.R;
                nextError[x + 1].G = nextError[x + 1].G + 4 * error.G;
                nextError[x + 1].B = nextError[x + 1].B + 4 * error.B;
                // 5
                nextError[x + 2].R = nextError[x + 2].R + 8 * error.R;
                nextError[x + 2].G = nextError[x + 2].G + 8 * error.G;
                nextError[x + 2].B = nextError[x + 2].B + 8 * error.B;
                // 6
                nextError[x + 3].R = nextError[x + 3].R + 4 * error.R;
                nextError[x + 3].G = nextError[x + 3].G + 4 * error.G;
                nextError[x + 3].B = nextError[x + 3].B + 4 * error.B;
                // 7
                nextError[x + 4].R = nextError[x + 4].R + 2 * error.R;
                nextError[x + 4].G = nextError[x + 4].G + 2 * error.G;
                nextError[x + 4].B = nextError[x + 4].B + 2 * error.B;
                // 8
                nextNextError[x + 0].R = nextNextError[x + 0].R + 1 * error.R;
                nextNextError[x + 0].G = nextNextError[x + 0].G + 1 * error.G;
                nextNextError[x + 0].B = nextNextError[x + 0].B + 1 * error.B;
                // 9
                nextNextError[x + 1].R = nextNextError[x + 1].R + 2 * error.R;
                nextNextError[x + 1].G = nextNextError[x + 1].G + 2 * error.G;
                nextNextError[x + 1].B = nextNextError[x + 1].B + 2 * error.B;
                // 10
                nextNextError[x + 2].R = nextNextError[x + 2].R + 4 * error.R;
                nextNextError[x + 2].G = nextNextError[x + 2].G + 4 * error.G;
                nextNextError[x + 2].B = nextNextError[x + 2].B + 4 * error.B;
                // 11
                nextNextError[x + 3].R = nextNextError[x + 3].R + 2 * error.R;
                nextNextError[x + 3].G = nextNextError[x + 3].G + 2 * error.G;
                nextNextError[x + 3].B = nextNextError[x + 3].B + 2 * error.B;
                // 12
                nextNextError[x + 4].R = nextNextError[x + 4].R + 1 * error.R;
                nextNextError[x + 4].G = nextNextError[x + 4].G + 1 * error.G;
                nextNextError[x + 4].B = nextNextError[x + 4].B + 1 * error.B;

                // next
                index = index + 4;
            }
            for (let i = 0; i < currentError.length; i++) {
                currentError[i] = nextError[i];
                nextError[i] = nextNextError[i];
                nextNextError[i] = new Color(0, 0, 0);
            }
        }
    }
}
