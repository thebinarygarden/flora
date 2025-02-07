import {AbsolutePositionContainer, DialInternal, DialOutline} from "@components/input/BGColorWheel/styles";
import {ColorWheelDialProps, Coordinates} from "@components/input/BGColorWheel/types";
import React, {useEffect, useRef, useState} from "react";
import {kdTree} from "kd-tree-javascript";

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

        const randomFirstCoordsKey = Array.from(coordinateToRGB.keys()).at(Math.round(Math.random()*coordinateToRGB.size));
        const [x, y] = randomFirstCoordsKey.split(",").map(Number);
        setCoords({x, y});
        setCurrentColor(coordinateToRGB.get(randomFirstCoordsKey))

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
        <AbsolutePositionContainer>
            { coords && currentColor && center &&
            <DialOutline
                className="color-dial" size={size} x={coords.x} y={coords.y}>
                <DialInternal
                    className="color-dial"
                    size={size}
                    $r={currentColor.r}
                    $g={currentColor.g}
                    $b={currentColor.b}/>
            </DialOutline>
        }
        </AbsolutePositionContainer>
    );
};