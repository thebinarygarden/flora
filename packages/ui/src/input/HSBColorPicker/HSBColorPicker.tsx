"use client";
import * as React from 'react';
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
    const hueRef = React.useRef<HTMLDivElement | null>(null);

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
        hueRef
    });

    // Derived colors (memoized for performance)
    const hueColor = React.useMemo(() => hsbToHex(internalHsb.h, 100, 100), [internalHsb.h]);
    const hexColor = React.useMemo(() => hsbToHex(internalHsb.h, internalHsb.s, internalHsb.b), [internalHsb.h, internalHsb.s, internalHsb.b]);

    return (
        <div className={className}>
            {/* Hue Slider Container with padding for overhang */}
            <div className="py-2 mb-2">
                <div
                    ref={hueRef}
                    className="relative w-full h-3 cursor-pointer rounded-full"
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
                        className="absolute w-4 h-7 shadow-sm transform -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-lg"
                        style={{
                            left: `${(internalHsb.h / 359) * 100}%`,
                            top: '50%',
                            backgroundColor: hueColor,
                            border: `4px solid white`
                        }}
                    />
                </div>
            </div>

            {/* Saturation/Brightness 2D Picker */}
            <div
                ref={saturation2DRef}
                className="relative w-full aspect-square cursor-crosshair rounded overflow-hidden"
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
                        border: `4px solid white`
                    }}
                />
            </div>
        </div>
    );
}