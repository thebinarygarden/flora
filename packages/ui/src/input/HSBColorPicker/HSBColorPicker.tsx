"use client";
import * as React from 'react';
import {IconBGLogo} from '../../icons';
import {HSBColor, HSBColorPickerProps} from './types';
import {hsbToHex, hexToHsb} from './colorUtils';
import {useColorPicker} from './useColorPicker';

export const HSBColorPicker: React.FC<HSBColorPickerProps> = ({
                                                                  onChangeHex,
                                                                  className = '',
                                                                  initialHex
                                                              }) => {
    const defaultColor = "#299bba";
    const initialColor = initialHex || defaultColor;
    
    // Internal HSB state - maintains precision during interactions
    const [internalHsb, setInternalHsb] = React.useState(hexToHsb(initialColor));

    // Refs
    const saturation2DRef = React.useRef<HTMLDivElement | null>(null);
    const saturationRef = React.useRef<HTMLDivElement | null>(null);
    const hueRef = React.useRef<HTMLDivElement | null>(null);
    const brightnessRef = React.useRef<HTMLDivElement | null>(null);

    // Handle HSB changes from useColorPicker
    const handleHsbChange = React.useCallback((newHsb: HSBColor) => {
        setInternalHsb(newHsb); // Update internal state immediately
        const hexValue = hsbToHex(newHsb.h, newHsb.s, newHsb.b);
        onChangeHex(hexValue); // Send hex to parent
    }, [onChangeHex]);

    // Custom hook for color picker logic
    const {handleMouseDown, handleTouchStart} = useColorPicker({
        internalHsb,
        handleHsbChange,
        saturation2DRef,
        saturationRef,
        hueRef,
        brightnessRef
    });

    // Derived colors (memoized for performance)
    const hueColor = React.useMemo(() => hsbToHex(internalHsb.h, 100, 100), [internalHsb.h]);
    const hexColor = React.useMemo(() => hsbToHex(internalHsb.h, internalHsb.s, internalHsb.b), [internalHsb.h, internalHsb.s, internalHsb.b]);
    const brightnessGradient = React.useMemo(() => `linear-gradient(to bottom, ${hsbToHex(internalHsb.h, internalHsb.s, 100)}, #000000)`, [internalHsb.h, internalHsb.s]);
    const saturationGradient = React.useMemo(() => `linear-gradient(to right, #808080, ${hsbToHex(internalHsb.h, 100, internalHsb.b)})`, [internalHsb.h, internalHsb.b]);

    return (
        <div className={className}>
            {/* Hue Slider */}
            <div
                ref={hueRef}
                className="relative w-full h-6 cursor-pointer rounded overflow-hidden mb-4"
                style={{
                    background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                    border: `1px solid var(--on-background)`,
                    touchAction: 'none'
                }}
                onMouseDown={handleMouseDown('hue')}
                onTouchStart={handleTouchStart('hue')}
            >
                {/* Hue Indicator */}
                <div
                    className="absolute w-3 h-full shadow-sm transform -translate-x-1/2 pointer-events-none rounded bg-white"
                    style={{
                        left: `${(internalHsb.h / 359) * 100}%`,
                        border: `1px solid var(--on-background)`
                    }}
                />
            </div>

            {/* Main Color Picker Area and Bottom Row Combined */}
            <div className="flex flex-col gap-2">
                {/* 2D Grid + Brightness Slider */}
                <div className="flex gap-3">
                    {/* Brightness Slider (Vertical) */}
                    <div
                        ref={brightnessRef}
                        className="relative w-4 cursor-pointer rounded overflow-hidden"
                        style={{
                            background: brightnessGradient,
                            aspectRatio: '1 / 4',
                            border: `1px solid var(--on-background)`,
                            touchAction: 'none'
                        }}
                        onMouseDown={handleMouseDown('brightness')}
                        onTouchStart={handleTouchStart('brightness')}
                    >
                        {/* Brightness Indicator */}
                        <div
                            className="absolute w-full h-2 shadow-sm transform -translate-y-1/2 pointer-events-none rounded bg-white"
                            style={{
                                top: `${100 - internalHsb.b}%`,
                                border: `1px solid var(--on-background)`
                            }}
                        />
                    </div>

                    {/* Saturation/Brightness 2D Picker */}
                    <div
                        ref={saturation2DRef}
                        className="relative flex-1 aspect-square cursor-crosshair rounded overflow-hidden"
                        style={{
                            background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`,
                            border: `1px solid var(--on-background)`,
                            touchAction: 'none'
                        }}
                        onMouseDown={handleMouseDown('saturation-2d')}
                        onTouchStart={handleTouchStart('saturation-2d')}
                    >
                        {/* Saturation/Brightness Indicator */}
                        <div
                            className="absolute w-4 h-4 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{
                                left: `${internalHsb.s}%`,
                                top: `${100 - internalHsb.b}%`,
                                backgroundColor: hexColor,
                                border: `2px solid white`
                            }}
                        />
                    </div>
                </div>

                {/* Bottom Row: Logo + Saturation Slider */}
                <div className="flex items-end gap-3">
                    {/* BG Logo */}
                    <div className="flex items-center justify-center w-4 pointer-events-none" style={{height: '1rem'}}>
                        <div
                            className="flex items-center justify-center w-full h-full rounded"
                        >
                            <IconBGLogo size={48} color={hexColor} strokeWidth={"bolder"}/>
                        </div>
                    </div>

                    {/* Saturation Slider */}
                    <div
                        ref={saturationRef}
                        className="relative flex-1 h-4 cursor-pointer rounded overflow-hidden"
                        style={{
                            background: saturationGradient,
                            border: `1px solid var(--on-background)`,
                            touchAction: 'none'
                        }}
                        onMouseDown={handleMouseDown('saturation')}
                        onTouchStart={handleTouchStart('saturation')}
                    >
                        {/* Saturation Indicator */}
                        <div
                            className="absolute w-2 h-full shadow-sm transform -translate-x-1/2 pointer-events-none rounded bg-white"
                            style={{
                                left: `${internalHsb.s}%`,
                                border: '1px solid var(--on-background)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}