import {AbsolutePositionContainer, DialInternal, DialOutline} from "./styles";
import {ColorWheelDialProps, Coordinates} from "../types";
import React, {useEffect, useRef, useState} from "react";
import {kdTree} from "kd-tree-javascript";
import {rgbToHex} from "../rgbToHex";

export const ColorWheelDial = ({center, coordinateToRGB, containerRef, currentColor, setCurrentColor}: ColorWheelDialProps) => {
    const size = Math.min(center.x, center.y)/4;

    const [coords, setCoords] = useState<Coordinates | null>();
    const isDragging = useRef(false);
    const coordinateKdTree = useRef<kdTree<Coordinates> | null>(null);

    const findNearestCoordinates = (x: number, y: number): Coordinates => {
        const nearest = coordinateKdTree.current!.nearest({x, y}, 1);
        return nearest[0][0];
    };

    const handleMouseDown = (event) => {
        if (!(event.target as HTMLElement).closest(".color-dial")) return;
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;

        const rect = containerRef.current!.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Find nearest color using KD-Tree
        const nearestCoordinates = findNearestCoordinates(mouseX, mouseY);

        setCoords({x: nearestCoordinates.x, y: nearestCoordinates.y});
        setCurrentColor(coordinateToRGB.get(`${nearestCoordinates.x},${nearestCoordinates.y}`));
    };

    useEffect(() => {
        if (!coordinateToRGB.size) return;

        // Find the coordinates matching the current color
        let matchedCoordsKey = [...coordinateToRGB.entries()].find(
            ([_, color]) => color.r === currentColor?.r && color.g === currentColor?.g && color.b === currentColor?.b
        )?.[0];

        // If no match is found, fall back to a random coordinate
        if (!matchedCoordsKey) {
            matchedCoordsKey = Array.from(coordinateToRGB.keys())[
                Math.floor(Math.random() * coordinateToRGB.size)
                ];
        }

        const [x, y] = matchedCoordsKey.split(",").map(Number);
        setCoords({ x, y });
        setCurrentColor(coordinateToRGB.get(matchedCoordsKey));

        // Build KD-Tree
        const kdTreePoints: Coordinates[] = Array.from(coordinateToRGB.keys()).map((key) => {
            const [x, y] = key.split(",").map(Number);
            return {x, y};
        });

        const distance = (a: Coordinates, b: Coordinates) =>
            (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

        // Store KD-Tree in useRef so it persists across renders
        coordinateKdTree.current = new kdTree(kdTreePoints, distance, ["x", "y"]);

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [coordinateToRGB]);

    return (
        <>
            { coords && currentColor && center &&
            <DialOutline
                className="color-dial" size={size} x={coords.x} y={coords.y}>
                <DialInternal
                    className="color-dial"
                    size={size}
                    color={rgbToHex(currentColor)}/>
            </DialOutline>
        }
        </>
    );
};