"use client";
import React, {useEffect, useRef, useState} from "react";
import {BGColorWheelProps, Coordinates, RGB} from "../types";
import {allColors} from "./getAllColors";
import {ColorWheelDial} from "./ColorWheelDial";
import {ColorWheelInformation} from "./ColorWheelInformation";
import {AbsolutePositionContainer, ColorWheelImg} from "../styles";

export function BGColorWheel({currentColor, setCurrentColor}: BGColorWheelProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [center, setCenter] = useState<Coordinates>({y: 0, x: 0});
    const [radius, setRadius] = useState(0);
    const [coordinateToRGB, setCoordinateToRGB] = useState<Map<string, RGB>>(new Map());

    // Trig Functions use radians i.e 360 === 2pi
    const degreeIncrement = (2 * Math.PI) / (allColors.length + 1);

    const updateSize = () => {
        if (containerRef.current) {
            const rect = containerRef.current!.getBoundingClientRect();
            const tempCenter = {x: rect.width / 2, y: rect.height / 2};
            const tempRadius = Math.min(tempCenter.x, tempCenter.y) * 4 / 5;
            const coordinateToRGB: Map<string, RGB> = new Map();
            allColors.forEach((c, enumerate) => {
                const angle = enumerate * degreeIncrement;
                const x = (Math.sin(angle) * tempRadius) + tempCenter.x;
                const y = (Math.cos(angle) * tempRadius) + tempCenter.y;
                coordinateToRGB.set(`${Number(x.toFixed(3))},${Number(y.toFixed(3))}`, c);
            });

            setCoordinateToRGB(coordinateToRGB);
            setCenter(tempCenter);
            setRadius(tempRadius);
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
        <AbsolutePositionContainer ref={containerRef}>
            <ColorWheelImg src="/color_wheel.png" size={radius}  x={center.x} y={center.y}/>
            <ColorWheelDial containerRef={containerRef} currentColor={currentColor} setCurrentColor={setCurrentColor}
                            center={center} coordinateToRGB={coordinateToRGB}/>
            <ColorWheelInformation color={currentColor} center={center}/>
        </AbsolutePositionContainer>
    );
}