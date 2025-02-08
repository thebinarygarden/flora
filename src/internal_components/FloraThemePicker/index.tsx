"use client"
import {RGB} from "./BGColorWheel/types";
import {useState} from "react";
import {BGColorWheel} from "./BGColorWheel";
import {ClientOnlyFadeIn} from "@components/util/client/ClientOnlyFadeIn";

export function BGThemePicker() {
    const [currentColor, setCurrentColor] = useState<RGB>({r:0, g:0, b:0});
    return (
        <ClientOnlyFadeIn style={{
            width: "100vw",
            height: "100vh",
            background: "#484747",
            overflow: "hidden"
        }}>
            <BGColorWheel currentColor={currentColor} setCurrentColor={setCurrentColor} />
        </ClientOnlyFadeIn>
    );
}
