"use client"
import {BGColorWheel} from "../index_input";
import {useState} from "react";
import {RGB} from "@components/input/BGColorWheel/types";

export default function Index() {
    const [currentColor, setCurrentColor] = useState<RGB>({r:0, g:0, b:0});
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            background: "#484747",
            overflow: "hidden"
        }}>
            <BGColorWheel currentColor={currentColor} setCurrentColor={setCurrentColor} />
        </div>
    );
}
