"use client";
import React, {ReactNode, useEffect, useRef, useState} from "react";
import {BGColorWheelProps, Coordinates, RGB} from "@components/input/BGColorWheel/types";
import {allColors} from "@components/input/BGColorWheel/getAllColors";
import {ColorWheelDial} from "@components/input/BGColorWheel/ColorWheelDial";
import {ColorWheelInformation} from "@components/input/BGColorWheel/ColorWheelInformation";
import {AbsolutePositionContainer, ColorDiv} from "@components/input/BGColorWheel/styles";

export function BGColorWheel({currentColor, setCurrentColor}: BGColorWheelProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [center, setCenter] = useState<Coordinates>({y:0, x: 0});
    const [coordinateToRGB, setCoordinateToRGB] = useState<Map<string, RGB>>(new Map());

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

                return (<ColorDiv key={enumerate} size={colorDivSize} c={c} x={x} y={y}></ColorDiv>);
            });

            setColorDivs(newColorDivs);
            setCoordinateToRGB(coordinateToRGB);
            setCenter(center);
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
            {colorDivs}
            <ColorWheelDial containerRef={containerRef} currentColor={currentColor} setCurrentColor={setCurrentColor} center={center} coordinateToRGB={coordinateToRGB}/>
            <ColorWheelInformation color={currentColor} size={Math.min(center.x, center.y)}/>
        </AbsolutePositionContainer>
    );
}