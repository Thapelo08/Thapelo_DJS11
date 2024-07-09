import { useRef, useState, useEffect } from "react";
import  PropTypes from "prop-types";

const Audio = ({ audioUrl, title }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener("loadedmetaData", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
    })
    })
}