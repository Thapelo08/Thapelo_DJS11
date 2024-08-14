/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

function AudioPlayer() {
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Load audio file and set up audio player
  }, [currentEpisode]);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  return (
    <div>
      {currentEpisode && <audio src={currentEpisode.file} controls={playing} />}
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
    </div>
  );
}

export default AudioPlayer;
