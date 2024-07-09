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

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };
     
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleSeek = (e) => {
        const seekTime = parseFloat(e.target.value);
        audioRef.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    return (
        <div className="audio-player">
            <h2>{title}</h2>
            <div className="controls">
                <button onClick={togglePlay}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <input
                type="range"
                value={currentTime}
                max={duration || 0}
                onChange={handleSeek}
                />
                <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
            </div>
            <audio ref={audioRef} src={audioUrl} />
        </div>
    );
    };