import { PixelEffect, EffectKind } from "./pixelator";

export function iconCharForEffect(effect: PixelEffect): string {
    switch (effect.kind) {
        case EffectKind.OrderedDither: return '1';
        case EffectKind.BayerDither: return '2';
        case EffectKind.StuckiDither: return '3';
        case EffectKind.FloydSteinbergDither: return '4';
        case EffectKind.Other: return '5';
    }
    return '';
}