/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AllEpisodes from './AllEpisodes';
import { setCurrentSeason } from '../globalState/reducers/podcastsReducer';
import { styled } from 'styled-components';

// Define styled components for SeasonDetails and Select
const SeasonDetails = styled.p`
  font-size: 0.7rem;
  color: gray;
  margin: 0.2rem 0;
`;

const Select = styled.select`
  background-color: gray;
  padding: 0.2rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

// Define the season Component
const Seasons = () => {
  // Use useSelector to get the currentSeason and currentPodcast from the state
  const { currentSeason, currentPodcast } = useSelector((state) => state.podcastsReducer);

  // Use useDispatch to get the dispatch function
  const dispatch = useDispatch();

  // Get the seasons array from the currentPodcast
  const seasons = currentPodcast.seasons;

  // Get the current season's episodes
  const currentSeasonEpisodes = seasons[currentSeason - 1].episodes;

  // Render the component
  return (
    <div>
      {/* Display the seasons title */}
      <p className="bolder">Seasons</p>

      {/* Display the season details */}
      <SeasonDetails>
        Season {currentSeason}/Episodes {currentSeasonEpisodes.length}
      </SeasonDetails>

      {/* Render the select dropdown */}
      <Select
        name="seasons"
        id="seasons"
        value={currentSeason}
        onChange={(e) => {
          // Dispatch the setCurrentSeason action when the select value changes
          dispatch(setCurrentSeason(e.target.value));
        }}
      >
        {/* Map over the seasons array and render an option for each season */}
        {seasons
          .map((singleSeason, index) => {
            return (
              <option key={index} value={singleSeason.season}>
                season {singleSeason.season}
              </option>
            );
          })
          .reverse()}
      </Select>

      {/* Display the episodes title */}
      <p className="bolder">Episodes</p>

      {/* Render the AllEpisodes component with the current season's episodes */}
      <AllEpisodes currentSeasonEpisodes={currentSeasonEpisodes} />
    </div>
  );
};

export default Seasons;
