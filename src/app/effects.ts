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
//  This file "effects.ts" licensed under an MPL1.1
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

  The Original Code "effects.ts" is the Turborium TurboPixel (https://github.com/turborium/turbopixel).

  The Initial Developer of the Original Code is Peter (@turborium).
  Copyright (c) 2023-2023 Turborium (https://github.com/turborium/)

  Portions created by Contributors. All rights reserved.

  According to MPL1.1 license:
  - When you using the code from this file, you MUST notify the user of your Software that
    the part of Turborium TurboPixel (https://github.com/turborium/turbopixel) code is being used.
  - Also you MUST include this license notice to file uses this source code.

  ***** END LICENSE BLOCK *****
*/

import {
    Color,
    TestEchoEffect,
    BayerDitheringEffect,
    BayerPowerDitheringEffect,
    StuckiDitheringEffect,
    PaletteDitherEffect,
    RGBDitherEffect,
    JustRgbEffect,
    BlackWhiteStuckiDitherEffect,
    PixelEffect,
    ChornobylEffect,
    BlackWhiteDitherEffect,
    GrayDitherEffect
} from './pixelator';

export const effects: Array<PixelEffect> = [
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Pastel View',
        220,
        220,
        [
            0xFFf0dab1,
            0xFFe39aac,
            0xFFc45d9f,
            0xFF634b7d,
            0xFF6461c2,
            0xFF2ba9b4,
            0xFF93d4b5,
            0xFFf0f6e8,
            0xFF131b3d,
        ],
        new Color(3, 6, 2)
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'Bayer Mono 4',
       220,
       220,
       [
           0xFF000000,
           0xFF676767,
           0xFFb6b6b6,
           0xFFFFFFFF,
       ]
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Cosmo Vors',
        256,
        256,
        [
            0xFF3c1c4a,
            0xFF574084,
            0xFF655ec0,
            0xFF5a78e3,
            0xFF549fff,
            0xFF4fd8ff,
            0xFF7fffff,
            0xFFbfffff,
            0xFFffffff,
            0xFFffdaef,
            0xFFffa8df,
            0xFFef60bf,
            0xFFe716ac,
            0xFF991674,
            0xFF5c024a,
            0xFF100005,
        ]
    ),
    // -------------------------------------------------------------------  
    new BayerDitheringEffect(
        'Ani View',
       256,
       256,
       [
           // https://lospec.com/palette-list/mulfok32
           0xFF5ba675,
           0xFF6bc96c,
           0xFFabdd64,
           0xFFfcef8d,
           0xFFffb879,
           0xFFea6262,
           0xFFcc425e,
           0xFFa32858,
           0xFF751756,
           0xFF390947,
           0xFF611851,
           0xFF873555,
           0xFFa6555f,
           0xFFc97373,
           0xFFf2ae99,
           0xFFffc3f2,
           0xFFee8fcb,
           0xFFd46eb3,
           0xFF873e84,
           0xFF1f102a,
           0xFF4a3052,
           0xFF7b5480,
           0xFFa6859f,
           0xFFd9bdc8,
           0xFFffffff,
           0xFFaee2ff,
           0xFF8db7ff,
           0xFF6d80fa,
           0xFF8465ec,
           0xFF834dc4,
           0xFF7d2da0,
           0xFF4e187c,
       ],
       new Color(3, 5, 6)
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'Pocket Console',
       160,
       160,
       [
           0xFF202020,
           0xFF5e6745,
           0xFFaeba89,
           0xFFe3eec0,
       ]
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'T800 Flex',
        256,
        256,
        [
            0xFF000000,
            0xFFFFFFFF,
            0xFFFF0000,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Hot Chocolate',
        220,
        220,
        [
            0xFF210011,
            0xFF4d1f00,
            0xFFf06923,
            0xFFf0f9e3,
            0xFFebaaa0,
        ],
        new Color(4, 3, 3)//new Color(3, 3, 2)
    ),
    // -------------------------------------------------------------------
    new JustRgbEffect('Just RGB'),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'Frozen Photo',
        180,
        180,
        [
            0xFF000000,
            0xFF201533,
            0xFF252446,
            0xFF203562,
            0xFF1e579c,
            0xFF0098db,
            0xFF0ce6f2,
            0xFFffffff,
        ]
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Classic PC II',
        200,
        200,
        [
            0xFFffffff,
            0xFFffff00,
            0xFFff6500,
            0xFFdc0000,
            0xFFff0097,
            0xFF360097,
            0xFF0000ca,
            0xFF0097ff,
            0xFF00a800,
            0xFF006500,
            0xFF653600,
            0xFF976536,
            0xFFb9b9b9,
            0xFF868686,
            0xFF454545,
            0xFF000000,
        ]
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Magenta Odd',
        220,
        220,
        [
            0xFF902068,
            0xFFf81868,
            0xFFffa880,
            0xFFff7000,
            0xFFa80010,
            0xFFffa800,
            0xFF5800a8,
            0xFF6828ff,
            0xFFffffff,
            0xFFe0d0ff,
            0xFFa070c8,
            0xFF683090,
            0xFF481868,
            0xFF000000,
        ],
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'Liquid Chrome',
        320,
        320,
        [
            0xFF08141e,
            0xFF0f2a3f,
            0xFF20394f,
            0xFF4e495f,
            0xFF997577,
            0xFFf6d6bd,
            0xFFc3a38a,
            0xFF816271,
            0xFF4e495f,
        ]
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Ton 60',
        180,
        180,
        [
            0xFFffb780,
            0xFFdf6d5c,
            0xFFb42a43,
            0xFF871638,
            0xFF470d2f,
            0xFFfdf3c9,
            0xFFffe789,
            0xFFffc15c,
            0xFFd66b4d,
            0xFF5e2039,
            0xFFc9e17a,
            0xFF85d25a,
            0xFF33ab47,
            0xFF15674a,
            0xFF093a3c,
            0xFF8acbe8,
            0xFF6c89e1,
            0xFF5642ca,
            0xFF261c65,
            0xFF160b2d,
            0xFFd8abd0,
            0xFFbe7ec5,
            0xFF6c4594,
            0xFF422770,
            0xFF1c122d,
            0xFFf9cec8,
            0xFFe38f9e,
            0xFFc7628a,
            0xFF9a3f72,
            0xFF431e39,
            0xFFc79e9e,
            0xFF8e5f64,
            0xFF583445,
            0xFF3c2230,
            0xFF1c0f18,
            0xFFaa9ccc,
            0xFF5f558d,
            0xFF454070,
            0xFF24213e,
            0xFF121222,
            0xFFa3d8b3,
            0xFF5cb68a,
            0xFF2b8074,
            0xFF1c585e,
            0xFF0e2836,
            0xFFdbbf9e,
            0xFFca977c,
            0xFFae6a52,
            0xFF72363e,
            0xFF471930,
            0xFFe4e2ea,
            0xFFcdc9d8,
            0xFFa49fb6,
            0xFF86809a,
            0xFF5b556f,
            0xFF453f56,
            0xFF322e42,
            0xFF221f2d,
            0xFF13111a,
            0xFF09080d,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Old Sunset',
        300,
        300,
        [
            0xFF1e1610,
            0xFFd3ad8b,
            0xFFfcce8d,
            0xFFf3ede3,
            0xFFf95142,
            0xFFff8f46,
            0xFFf2bb4e,
            0xFF84a3a5,
            0xFF4d7c71,
            0xFF405987,
            0xFF1f2f49,
        ],
        new Color(4, 4, 4)
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'BK0010',
        256,
        256,
        [
            0xFF000000,
            0xFF0000FF,
            0xFFFF0000,
            0xFF00FF00,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
         'Yellow Night',
        256,
        256,
        [
            0xFF000000,
            0xFF000000,
            0xFFffff20,
        ]
    ),
    // -------------------------------------------------------------------
    new PaletteDitherEffect(
        160,
        160,
        'XRGB Dither',
        [
            0xFF000000,
            0xFFFF0000,
            0xFF00FF00,
            0xFF0000FF,
            0xFFFFFFFF,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Green Tree',
       240,
       240,
       [
            0xFF1d4010,
            0xFF358879,
            0xFF46a65c,
            0xFF56c157,
            0xFFbeed84,
            0xFFe9fcaf,
            0xFFfffff0,
            0xFFf38760,
            0xFFcd3647,
            0xFF811c4e,
            0xFF6e2c1a,
            0xFF100605,
       ],
       new Color(4, 2, 4)
    ),
    // -------------------------------------------------------------------
    new PaletteDitherEffect(
        300,
        300,
        'Dither Norm',
        [
            0xFF0f0f1b,
            0xFF565a75,
            0xFFc6b7be,
            0xFFfafbf6,
        ]
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Mono Stucki',
        256,
        256,
        [
            0xFF000000,
            0xFFFFFFFF,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
         'Fruit Five',
        240,
        240,
        [
            0xFF000000,
            0xFFb63dff,
            0xFFea5d15,
            0xFF10a4e3,
            //0xFF43c300,
            0xFFffffff,
        ],
        new Color(3, 3, 3)
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Pico-8',
       128,
       128,
       [
           0xFF000000,
           0xFF1D2B53,
           0xFF7E2553,
           0xFF008751,
           0xFFAB5236,
           0xFF5F574F,
           0xFFC2C3C7,
           0xFFFFF1E8,
           0xFFFF004D,
           0xFFFFA300,
           0xFFFFEC27,
           0xFF00E436,
           0xFF29ADFF,
           0xFF83769C,
           0xFFFF77A8,
           0xFFFFCCAA,
       ],
       new Color(4, 4, 4),//3, 3, 3)
    ),
   // -------------------------------------------------------------------
   new BayerPowerDitheringEffect(
        'Coral 4',
        220,
        220,
        [
            0xFF1b0326,
            0xFF7a1c4b,
            0xFFba5044,
            0xFFeff9d6,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Artistic Dance',
       256,
       256,
       [
           0xFFff0546,
           0xFF9c173b,
           0xFF660f31,
           0xFF450327,
           0xFF270022,
           0xFF17001d,
           0xFF09010d,
           0xFF0ce6f2,
           0xFF0098db,
           0xFF1e579c,
       ],
       new Color(3, 6, 2)
    ),
    // -------------------------------------------------------------------  
    new BayerDitheringEffect(
        'Classic C64',
        192,
        192,
        [
            // https://lospec.com/palette-list/commodore64
            0xFF000000,
            0xFF626262,
            0xFF898989,
            0xFFadadad,
            0xFFffffff,
            0xFF9f4e44,
            0xFFcb7e75,
            0xFF6d5412,
            0xFFa1683c,
            0xFFc9d487,
            0xFF9ae29b,
            0xFF5cab5e,
            0xFF6abfc6,
            0xFF887ecb,
            0xFF50459b,
            0xFFa057a3,
        ],
        new Color(5, 5, 4)
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Elephant',
        240,
        240,
        [
            // https://lospec.com/palette-list/nintendo-entertainment-system
            0xFF000000,
            0xFFfcfcfc,
            0xFFf8f8f8,
            0xFFbcbcbc,
            0xFF7c7c7c,
            0xFFa4e4fc,
            0xFF3cbcfc,
            0xFF0078f8,
            0xFF0000fc,
            0xFFb8b8f8,
            0xFF6888fc,
            0xFF0058f8,
            0xFF0000bc,
            0xFFd8b8f8,
            0xFF9878f8,
            0xFF6844fc,
            0xFF4428bc,
            0xFFf8b8f8,
            0xFFf878f8,
            0xFFd800cc,
            0xFF940084,
            0xFFf8a4c0,
            0xFFf85898,
            0xFFe40058,
            0xFFa80020,
            0xFFf0d0b0,
            0xFFf87858,
            0xFFf83800,
            0xFFa81000,
            0xFFfce0a8,
            0xFFfca044,
            0xFFe45c10,
            0xFF881400,
            0xFFf8d878,
            0xFFf8b800,
            0xFFac7c00,
            0xFF503000,
            0xFFd8f878,
            0xFFb8f818,
            0xFF00b800,
            0xFF007800,
            0xFFb8f8b8,
            0xFF58d854,
            0xFF00a800,
            0xFF006800,
            0xFFb8f8d8,
            0xFF58f898,
            0xFF00a844,
            0xFF005800,
            0xFF00fcfc,
            0xFF00e8d8,
            0xFF008888,
            0xFF004058,
            0xFFf8d8f8,
            0xFF787878,
        ],
        new Color(5, 5, 6)
    ),
    // -------------------------------------------------------------------
    new ChornobylEffect('Chornobyl'),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Evening Forest',
        240,
        240,
        [
            0xFF0f0012,
            0xFF004f3f,
            0xFF009e4a,
            0xFF1cba33,
            0xFFFFFFEA,
            0xFFffed87,
            0xFF330033,
            0xFFb3122d,
            0xFFcc2929,
            0xFFe6653a,
            //0xFFffbb5c,
            0xFF330066,
            0xFF1a0099,
            0xFF1433cc,
            0xFF30d2f2,
            0xFF4cffb4,
        ],
        new Color(5, 4, 4)
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Oil Stucki',
        256,
        256,
        [
            0xFFfbf5ef,
            0xFFf2d3ab,
            0xFFc69fa5,
            0xFF8b6d9c,
            0xFF494d7e,
            0xFF272744,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Undeground Worms',
        256,
        256,
        [
            0xFFf3e3ca,
            0xFFd8c072,
            0xFFbeaa87,
            0xFFb89251,
            0xFF9f866c,
            0xFF8f6444,
            0xFF714235,
            0xFF4b362a,
            0xFF282737,
            0xFF384869,
            0xFF3f6b92,
            0xFF5c94b1,
            0xFF69b6c2,
            0xFF96e4e4,
            0xFF7ecc9e,
            0xFF65a972,
            0xFF4c8549,
            0xFF4d5c3b,
            0xFF444347,
            0xFF61606c,
            0xFF7b7995,
            0xFF9997a9,
            0xFFb6b9be,
            0xFFfeffef,
            0xFFe0b2c9,
            0xFFc390b7,
            0xFFb16b6b,
            0xFFa162a7,
            0xFF9e4141,
            0xFF6b5286,
        ],
        new Color(6, 6, 4)
    ),
   // -------------------------------------------------------------------
   new BayerPowerDitheringEffect(
        'Photo Paper',
       320,
       320,
       [
           0xFF211e20,
           0xFF555568,
           0xFFa0a08b,
           0xFFe9efec,
       ]
   ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Half 32',
        230,
        230,
        [
            0xFFbe4a2f,
            0xFFd77643,
            0xFFead4aa,
            0xFFe4a672,
            0xFFb86f50,
            0xFF733e39,
            0xFF3e2731,
            0xFFa22633,
            0xFFe43b44,
            0xFFf77622,
            0xFFfeae34,
            0xFFfee761,
            0xFF63c74d,
            0xFF3e8948,
            0xFF265c42,
            0xFF193c3e,
            0xFF124e89,
            0xFF0099db,
            0xFF2ce8f5,
            0xFFffffff,
            0xFFc0cbdc,
            0xFF8b9bb4,
            0xFF5a6988,
            0xFF3a4466,
            0xFF262b44,
            0xFF181425,
            0xFFff0044,
            0xFF68386c,
            0xFFb55088,
            0xFFf6757a,
            0xFFe8b796,
            0xFFc28569,
        ],
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'Lotty',
        200,
        200,
        [
            0xFF260d34,  
            0xFF452459,   
            0xFF87286a,
            0xFFd03791,
            0xFFfe6c90,
            0xFFffffff,
        ]
    ),
    // -------------------------------------------------------------------  
    new BayerDitheringEffect(
        'Dual Base',
       220,
       220,
       [
           0xFF000000,
           0xFFb17912,
           0xFFffbb2a,
           0xFF013f85,
           0xFF010565,
           0xFF430800,
       ],
       new Color(5, 5, 8)
   ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Moda 12',
        128,
        128,
        [
            0xFF323b2f,
            0xFF424d3c,
            0xFF626e60,
            0xFF778476,
            0xFFa0a896,
            0xFFb7bb9f,
            0xFFdadab8,
            0xFFe0e4c7,
            0xFFe9f6e3,
            0xFFf9fff0,
            0xFF293425,
            0xFF8f9a8b,
        ],
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'T-800',
        256,
        256,
        [
            0xFF000000,
            0xFF880011,
            0xFFFF0022,
            0xFFFFFFFF,
        ]
    ),
    // -------------------------------------------------------------------
    new PaletteDitherEffect(
        256,
        256,
        'Magenta Dither',
        [
            0xFF040026,
            0xFF004bc0,
            0xFF0097ec,
            0xFF00f3fc,
            0xFFffbcff,
            0xFFd569f6,
            0xFF6c1fd3,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Fun Orange',
       160,
       160,
       [
           0xFF2b0f54,
           0xFFab1f65,
           0xFFff4f69,
           0xFFfff7f8,
           0xFFff8142,
           0xFFffda45,
           0xFF3368dc,
           0xFF49e7ec,
       ],
       new Color(4, 3, 3)
   ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Morning Coffee',
        300,
        300,
        [
            0xFF385074,
            0xFF4670a2,
            0xFF70819d,
            0xFF86a2b8,
            0xFFc0d1de,
            0xFFb2a08a,
            0xFFd9b48a,
            0xFFfeeb9f,
            0xFFffebbc,
            0xFFf0d1a5,
            0xFF968981,
            0xFF7f7574,
            0xFF484850,
            0xFF313848,
            0xFF1c283e,
            0xFF0b1321,
        ],
    ),
    // -------------------------------------------------------------------  
    new BayerDitheringEffect(
        'Cuber Summer',
        256,
        256,
        [
            // https://lospec.com/palette-list/cybergum6
            0xFF3a2b3b,
            0xFF2d4a54,
            0xFF0c7475,
            0xFFbc4a9b,
            0xFFeb8d9c,
            0xFFffd8ba,
        ],
        new Color(9, 3, 5)
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Impulse',
        256,
        256,
        [
            0xFF9f3c91,
            0xFF452060,
            0xFF291546,
            0xFF070c1d,
            0xFF3d1430,
            0xFF632240,
            0xFF913a52,
            0xFFbc5960,
            0xFFe2b570,
            0xFFeee98a,
            0xFFb7d974,
            0xFF5da75d,
            0xFF39755c,
            0xFF285454,
            0xFF1f394d,
            0xFF191b3f,
            0xFF192d50,
            0xFF286080,
            0xFF3fa0a4,
            0xFF86e0ce,
            0xFFe3f5f1,
            0xFF81afb5,
            0xFF446374,
            0xFF32495f,
            0xFF182e41,
        ],
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Vic 20',
        160,
        160,
        [
            0xFF000000,
            0xFFffffff,
            0xFFa8734a,
            0xFFe9b287,
            0xFF772d26,
            0xFFb66862,
            0xFF85d4dc,
            0xFFc5ffff,
            0xFFa85fb4,
            0xFFe99df5,
            0xFF559e4a,
            0xFF92df87,
            0xFF42348b,
            0xFF7e70ca,
            0xFFbdcc71,
            0xFFffffb0,
        ]
    ),
    // -------------------------------------------------------------------
    new PaletteDitherEffect(
        320,
        320,
        'Mono Dither',
        [
            0xFF000000,
            0xFFFFFFFF,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'Dream Star',
        220,
        220,
        [
            0xFF3c42c4,
            0xFF6e51c8,
            0xFFa065cd,
            0xFFce79d2,
            0xFFd68fb8,
            0xFFdda2a3,
            0xFFeac4ae,
            0xFFf4dfbe,
        ]
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Slom',
        200,
        200,
        [
            0x1e1d39,
            0x402751,
            0x7a367b,
            0xa23e8c,
            0xc65197,
            0xdf84a5,
            0x341c27,
            0x602c2c,
            0x884b2b,
            0xbe772b,
            0xde9e41,
            0xe8c170,
        ],
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Win16 Classic',
        320,
        320,
        [
            0xFF000000,
            0xFF7e7e7e,
            0xFFbebebe,
            0xFFffffff,
            0xFF7e0000,
            0xFFfe0000,
            0xFF047e00,
            0xFF06ff04,
            0xFF7e7e00,
            0xFFffff04,
            0xFF00007e,
            0xFF0000ff,
            0xFF7e007e,
            0xFFfe00ff,
            0xFF047e7e,
            0xFF06ffff,
        ],
        new Color(3, 3, 3)
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Cherry',
        200,
        200,
        [
            0x16171a,
            0x7f0622,
            0xd62411,
            0xff8426,
            0xffd100,
            0xfafdff,
            0xff80a4,
            0xff2674,
            0x94216a,
            0x430067,
        ],
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Lime Night',
        200,
        200,
        [
            0xFF372134,
            0xFF474476,
            0xFF4888b7,
            0xFF6dbcb9,
            0xFF8cefb6,
        ],
    ),
    // -------------------------------------------------------------------  
    new BayerDitheringEffect(
        'Daytime Sleep',
        200,
        200,
        [
            // https://lospec.com/palette-list/daydream-20
            0xFF430f43,
            0xFF472561,
            0xFF205973,
            0xFF248077,
            0xFF2d9a77,
            0xFF5ec688,
            0xFFaae68f,
            0xFF64154d,
            0xFF8e184b,
            0xFFba3155,
            0xFFd9505e,
            0xFFe3744f,
            0xFFf29e64,
            0xFFffc477,
            0xFFffdd96,
            0xFFfff4b0,
            0xFFc22e35,
            0xFFd24f38,
            0xFFdf6939,
            0xFFed9b4a,
        ],
        new Color(4, 4, 6)
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Control Cherry',
        200,
        200,
        [
            0xFFEED5EE,
            0xFF54cea7,
            0xFF2ba4a6,
            0xFF0c6987,
            0xFF054b84,
            0xFF0d2147,
            0xFFffb0bf,
            0xFFff82bd,
            0xFFd74ac7,
            0xFFa825ba,
            0xFF682b9c,
            0xFF050010,
        ],
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'Suggar World',
        180,
        180,
        [
            0xFF302387,
            0xFFff3796,
            0xFF00faac,
            0xFFfffdaf,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
         'Cherry View ',//●
        220,
        220,
        [
            0xFFFFEEFF,
            0xFFFF0033,
            0xFFFF88FF,
            0xFF880000,
            0xFF000000,
            0xFFFFFFFF,
            0xFFFF00FF,
            0xFF880088,
            0xFF8800FF,
            0xFF5500EE,
        ],
        new Color(4, 4, 4)
    ),
    // ------------------------------------------------------------------- 
    new BayerDitheringEffect(
        'Lo-Fi Pixels',
        200,
        200,
        [
            0xFF28282e,
            0xFF6c5671,
            0xFFd9c8bf,
            0xFFf98284,
            0xFFb0a9e4,
            0xFFaccce4,
            0xFFb3e3da,
            0xFFfeaae4,
            0xFF87a889,
            0xFFe9f59d,
            0xFFffe6c6,
            0xFFdea38b,
            0xFFffc384,
            0xFFfff7a0,
            0xFFfff7e4,
        ],
        new Color(5, 7, 6)
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Final 14',
        200,
        200,
        [
            0xFFffffff,
            0xFFffdd84,
            0xFFec955b,
            0xFF883a56,
            0xFFd95959,
            0xFFfc83c7,
            0xFFaa5ec3,
            0xFF443c7e,
            0xFF566ed0,
            0xFF7bb1eb,
            0xFF98eb77,
            0xFF3eca6b,
            0xFF49868b,
            0xFF10101d,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'Summer Tea',
        180,
        180,
        [
            0xFF0d2b45,
            0xFF203c56,
            0xFF544e68,
            0xFF8d697a,
            0xFFd08159,
            0xFFffaa5e,
            0xFFffd4a3,
            0xFFffecd6,
        ]
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Simple Case',
        128,
        128,
        [
            0xFFffffff,
            0xFFffd588,
            0xFF72cb48,
            0xFFb2d4d4,
            0xFFc45544,
            0xFFcc9155,
            0xFF0a8a71,
            0xFF66aaf7,
            0xFF7f3355,
            0xFF000000,
            0xFF114c77,
            0xFF8891aa,
        ],
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'Bayer Mono',
       220,
       220,
       [
           0xFF000000,
           0xFFFFFFFF,
       ]
    ),
    // ------------------------------------------------------------------- 
    new BayerDitheringEffect(
        'Classic CGA',
        240,
        240,
        [
            0xFF000000,
            0xFFff55ff,
            0xFF55ffff,
            0xFFffffff,
        ],
        new Color(4, 3, 4)
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Crazy Santa',
        300,
        300,
        [
            0xFF1a0d0f,
            0xFF331416,
            0xFF4d1717,
            0xFF73201d,
            0xFF8c2a23,
            0xFFa63229,
            0xFFcc4733,
            0xFFe56545,
            0xFFf28861,
            0xFFf2aa85,
            0xFFf2ceb6,
            0xFFffffff,
            0xFFd8f2c2,
            0xFFb8f291,
            0xFF98d977,
            0xFF7acc5c,
            0xFF5db347,
            0xFF50993d,
            0xFF3a802d,
            0xFF2f6624,
            0xFF234d1b,
            0xFF1f401a,
            0xFF1b3317,
            0xFF162613,
        ],
        new Color(10, 10, 2)
    ),
    // -------------------------------------------------------------------
    new PaletteDitherEffect(
        230,
        230,
        'T800 Dither',
        [
            0xFF000000,
            0xFFFF0000,
            0xFFFFFFFF,
        ]
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Small Town',
        256,
        256,
        [
            0xFF050010,
            0xFF17283c,
            0xFF7d6fb8,
            0xFFc986f6,
            0xFFf9c4ad,
            0xFFfef6f2,
            0xFFf6623e,
        ],
        new Color(8, 8, 8)
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Rock 16',
        160,
        160,
        [
            0xFF140c00,
            0xFF690804,
            0xFFde2c2c,
            0xFFfa5555,
            0xFF382400,
            0xFFa1858d,
            0xFFd0b2ba,
            0xFFfacaca,
            0xFF002000,
            0xFF405544,
            0xFF617561,
            0xFF99b295,
            0xFF0c3044,
            0xFF556d89,
            0xFF7595b6,
            0xFFdeeeff,
        ]
    ),
    // ------------------------------------------------------------------- 
    new BayerDitheringEffect(
        'Warm Light',
       200,
       200,
       [
           0xFF000000,
           0xFF00b6ff,
           0xFFff6c00,
           0xFFff0000,
           0xFF0000ff,
           0xFF009100,
           0xFF6cff00,
           0xFFffff00,
           0xFFff00ff,
           0xFF914700,
           0xFFcc4f00,
           0xFFffb691,
           0xFF476c6c,
           0xFFffffff,
           0xFFdadab6,
           0xFF6c91b6,
       ],
       new Color(5, 4, 3)
   ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Dusty Place',
        256,
        256,
        [
            // https://lospec.com/palette-list/r-place
            0xFFFFFFFF,
            0xFFE4E4E4,
            0xFF888888,
            0xFF222222,
            0xFFFFA7D1,
            0xFFE50000,
            0xFFE59500,
            0xFFA06A42,
            0xFFE5D900,
            0xFF94E044,
            0xFF02BE01,
            0xFF00D3DD,
            0xFF0083C7,
            0xFF0000EA,
            0xFFCF6EE4,
            0xFF820080,
        ],
        new Color(4, 3, 3),
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'MDR 2',
        200,
        200,
        [
            0xFF44d193,
            0xFF18a55a,
            0xFF167d3b,
            0xFF226331,
            0xFF05270c,
            0xFF001930,
            0xFF194063,
            0xFF0e4c82,
            0xFF1179b1,
            0xFF34b0dc,
            0xFF70eeff,
        ]
    ),
    // -------------------------------------------------------------------
    new StuckiDitheringEffect(
        'Pastel Hi',
        256,
        256,
        [
            0xFFe7ebf8,
            0xFFadb1e0,
            0xFFb06bb5,
            0xFF6d2ea4,
            0xFFaae474,
            0xFF14ada0,
            0xFF597acd,
            0xFF7dc9de,
            0xFFfff7a7,
            0xFFffbe6c,
            0xFFff6773,
            0xFFbb027a,
            0xFFf8c8af,
            0xFFa17374,
            0xFF2e5b86,
            0xFF0c2a47,
        ],
    ),
    // -------------------------------------------------------------------
    new BayerDitheringEffect(
        'Just 16',
        220,
        220,
        [
            0xFF1a1c2c,
            0xFF5d275d,
            0xFFb13e53,
            0xFFef7d57,
            0xFFffcd75,
            0xFFa7f070,
            0xFF38b764,
            0xFF257179,
            0xFF29366f,
            0xFF3b5dc9,
            0xFF41a6f6,
            0xFF73eff7,
            0xFFf4f4f4,
            0xFF94b0c2,
            0xFF566c86,
            0xFF333c57,
        ],
        new Color(3, 3, 3)
    ),
    // -------------------------------------------------------------------
    new BayerPowerDitheringEffect(
        'Psycho',
        200,
        200,
        [
            0xFF10101d,
            0xFF49868b,
            0xFF3eca6b,
            0xFF98eb77,
            0xFF7bb1eb,
            0xFF566ed0,
            0xFF443c7e,
            0xFFaa5ec3,
            0xFFfc83c7,
            0xFFd95959,
            0xFF883a56,
            0xFFec955b,
            0xFFffdd84,
            0xFFffffff,
        ]
    ),
    // -------------------------------------------------------------------
    new TestEchoEffect('Test Echo R'),
];