"use client";
import * as React from 'react';
import {IconBGLogo} from '../../icons';
import {useTheme} from '../../theme';
import {HSBColorPickerProps} from './types';
import {hsbToHex, hsbToRgb} from './colorUtils';
import {useColorPicker} from './useColorPicker';

export const HSBColorPicker: React.FC<HSBColorPickerProps> = ({
                                                                  value,
                                                                  onChange,
                                                                  className = ''
                                                              }) => {
    const {theme} = useTheme();

    // Refs
    const saturation2DRef = React.useRef<HTMLDivElement | null>(null);
    const saturationRef = React.useRef<HTMLDivElement | null>(null);
    const hueRef = React.useRef<HTMLDivElement | null>(null);
    const brightnessRef = React.useRef<HTMLDivElement | null>(null);

    // Custom hook for color picker logic
    const {handleMouseDown} = useColorPicker({
        value,
        onChange,
        saturation2DRef,
        saturationRef,
        hueRef,
        brightnessRef
    });

    // Derived colors
    const currentColor = hsbToHex(value.h, value.s, value.b);
    const hueColor = hsbToHex(value.h, 100, 100);
    const rgbColor = hsbToRgb(value.h, value.s, value.b);

    const [copied, setCopied] = React.useState(false);
    const [copiedValue, setCopiedValue] = React.useState<string | null>(null);

    const copyToClipboard = (text: string, valueType: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setCopiedValue(valueType);
        setTimeout(() => {
            setCopied(false);
            setCopiedValue(null);
        }, 500);
    };

    const copyHexToClipboard = () => {
        copyToClipboard(currentColor, 'HEX');
    };

    return (
        <div className={className}>
            {/* Color Preview */}
            <div className="mb-6">
                <div
                    className={`w-full h-16 rounded-lg shadow-sm cursor-pointer ${copied ? 'ring-2 ring-green-500' : ''}`}
                    style={{
                        backgroundColor: currentColor,
                        border: `2px solid ${theme.onBackground}`,
                        transition: copied ? 'box-shadow 200ms' : 'none'
                    }}
                    onClick={copyHexToClipboard}
                />
                <div className="flex justify-between items-center mt-3">
                    <div 
                        className={`text-sm font-mono cursor-pointer transition-all duration-200 hover:bg-onSurface hover:bg-opacity-10 px-2 py-1 rounded ${copiedValue === 'HEX' ? 'text-green-500' : 'text-onSurface opacity-60'}`}
                        onClick={() => copyToClipboard(currentColor, 'HEX')}
                    >
                        HEX: {currentColor}
                    </div>
                    <div 
                        className={`text-sm cursor-pointer transition-all duration-200 hover:bg-onSurface hover:bg-opacity-10 px-2 py-1 rounded ${copiedValue === 'HSB' ? 'text-green-500' : 'text-onSurface opacity-60'}`}
                        onClick={() => copyToClipboard(`hsb(${value.h}, ${value.s}%, ${value.b}%)`, 'HSB')}
                    >
                        HSB: {value.h}, {value.s}%, {value.b}%
                    </div>
                    <div 
                        className={`text-sm cursor-pointer transition-all duration-200 hover:bg-onSurface hover:bg-opacity-10 px-2 py-1 rounded ${copiedValue === 'RGB' ? 'text-green-500' : 'text-onSurface opacity-60'}`}
                        onClick={() => copyToClipboard(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`, 'RGB')}
                    >
                        RGB: {rgbColor.r}, {rgbColor.g}, {rgbColor.b}
                    </div>
                </div>
            </div>

            {/* Hue Slider */}
            <div
                ref={hueRef}
                className="relative w-full h-8 cursor-pointer rounded overflow-hidden mb-4"
                style={{
                    background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                    border: `1px solid ${theme.onBackground}`
                }}
                onMouseDown={handleMouseDown('hue')}
            >
                {/* Hue Indicator */}
                <div
                    className="absolute w-3 h-full shadow-sm transform -translate-x-1/2 pointer-events-none rounded bg-white"
                    style={{
                        left: `${(value.h / 359) * 100}%`,
                        border: `1px solid ${theme.onBackground}`
                    }}
                />
            </div>

            {/* Main Color Picker Area and Bottom Row Combined */}
            <div className="flex flex-col gap-4">
                {/* 2D Grid + Brightness Slider */}
                <div className="flex gap-4">
                    {/* Brightness Slider (Vertical) */}
                    <div
                        ref={brightnessRef}
                        className="relative w-8 cursor-pointer rounded overflow-hidden"
                        style={{
                            background: `linear-gradient(to bottom, ${hsbToHex(value.h, value.s, 100)}, #000000)`,
                            aspectRatio: '1 / 4',
                            border: `1px solid ${theme.onBackground}`
                        }}
                        onMouseDown={handleMouseDown('brightness')}
                    >
                        {/* Brightness Indicator */}
                        <div
                            className="absolute w-full h-3 shadow-sm transform -translate-y-1/2 pointer-events-none rounded bg-white"
                            style={{
                                top: `${100 - value.b}%`,
                                border: `1px solid ${theme.onBackground}`
                            }}
                        />
                    </div>

                    {/* Saturation/Brightness 2D Picker */}
                    <div
                        ref={saturation2DRef}
                        className="relative flex-1 aspect-square cursor-crosshair rounded overflow-hidden"
                        style={{
                            background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`,
                            border: `1px solid ${theme.onBackground}`
                        }}
                        onMouseDown={handleMouseDown('saturation-2d')}
                    >
                        {/* Saturation/Brightness Indicator */}
                        <div
                            className="absolute w-4 h-4 rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            style={{
                                left: `${value.s}%`,
                                top: `${100 - value.b}%`,
                                backgroundColor: currentColor,
                                border: `2px solid white`
                            }}
                        />
                    </div>
                </div>

                {/* Bottom Row: Logo + Saturation Slider */}
                <div className="flex items-end gap-4">
                    {/* BG Logo */}
                    <div className="flex items-center justify-center w-8 pointer-events-none" style={{height: '2rem'}}>
                        <div
                            className="flex items-center justify-center w-full h-full rounded"
                        >
                            <IconBGLogo size={48} color={currentColor} strokeWidth={"bolder"}/>
                        </div>
                    </div>

                    {/* Saturation Slider */}
                    <div
                        ref={saturationRef}
                        className="relative flex-1 h-8 cursor-pointer rounded overflow-hidden"
                        style={{
                            background: `linear-gradient(to right, #808080, ${hsbToHex(value.h, 100, value.b)})`,
                            border: `1px solid ${theme.onBackground}`
                        }}
                        onMouseDown={handleMouseDown('saturation')}
                    >
                        {/* Saturation Indicator */}
                        <div
                            className="absolute w-3 h-full shadow-sm transform -translate-x-1/2 pointer-events-none rounded bg-white"
                            style={{
                                left: `${value.s}%`,
                                border: `1px solid ${theme.onBackground}`
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}