import {useRef, useState} from "react";

export const useVideoLooper = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isLooping, setIsLooping] = useState(false);
    const handleToggle = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isLooping) {
            video.loop = false;
            video.currentTime = 0;
            video.pause();
        } else {
            // Enable looping and play video
            video.loop = true;
            video.play();
        }
        setIsLooping(!isLooping);
    };
    return {
        videoRef,
        isLooping,
        handleToggle
    };
};