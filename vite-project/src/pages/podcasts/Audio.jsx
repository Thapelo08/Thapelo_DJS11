import { useRef, useState, useEffect } from "react";
import  PropTypes from "prop-types";

const Audio = ({ audioUrl, title }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    
    })
}