"use client";
import React, {ReactNode, useEffect, useRef, useState} from "react";
import {ColorWheelDialProps, RGB} from "@components/input/BGColorWheel/types";
import {allColors} from "@components/input/BGColorWheel/getAllColors";
import {ColorWheelDial} from "@components/input/BGColorWheel/ColorWheelDial";

export function BGColorWheel() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [dialProps, setDialProps] = useState<ColorWheelDialProps>({
        size: 0,
        coordinateToRGB: new Map(),
        containerRef: containerRef
    });

    const [colorDivs, setColorDivs] = useState<ReactNode[]>();
    // Trig Functions use radians i.e 360 === 2pi
    const degreeIncrement = (2 * Math.PI) / (allColors.length + 1);

    const updateSize = () => {
        if (containerRef.current) {
            const rect = containerRef.current!.getBoundingClientRect();
            const center = {x: rect.width / 2, y: rect.height / 2};
            const radius = Math.min(center.x, center.y) * 4 / 5;
            const coordinateToRGB: Map<string, RGB> = new Map();
            const newColorDivs: ReactNode[] = allColors.map((c, enumerate) => {
                const angle = enumerate * degreeIncrement;
                const x = (Math.sin(angle) * radius) + center.x;
                const y = (Math.cos(angle) * radius) + center.y;
                coordinateToRGB.set(`${Number(x.toFixed(3))},${Number(y.toFixed(3))}`, c);
                const colorDivSize = 20;

                return (<div key={enumerate} style={{
                    position: "absolute",
                    borderRadius: `${colorDivSize}px`,
                    width: `${colorDivSize}px`,
                    height: `${colorDivSize}px`,
                    transform: `translate(${x-(colorDivSize/2)}px, ${y-(colorDivSize/2)}px)`,
                    background: `rgb(${c.r},${c.g},${c.b})`,
                    userSelect: "none"
                }}/>);
            });

            setColorDivs(newColorDivs);
            const newDialSize = Math.min(center.x, center.y) / 4;
            setDialProps({
                size: newDialSize,
                coordinateToRGB: coordinateToRGB,
                containerRef: containerRef
            });
        }
    }

    useEffect(() => {
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            {colorDivs}
            <ColorWheelDial {...dialProps}/>
        </div>
    );
}