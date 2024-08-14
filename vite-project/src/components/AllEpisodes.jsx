import React from 'react';
import Episode from './Episode';
import { useSelector } from 'react-redux';

/**
 * AllEpisodes component
 * 
 * This component renders a list of episodes for the current season of a podcast.
 * It uses the `useSelector` hook from `react-redux` to retrieve the current podcast and season from the store.
 * 
 * @param {object} props - Component props
 * @param {array} props.currentSeasonEpisodes - Array of episode objects for the current season
 */
const AllEpisodes = ({ currentSeasonEpisodes }) => {
  /**
   * Retrieve the current podcast and season from the store using `useSelector`
   */
  const { currentPodcast, currentSeason } = useSelector((state) => state.podcastsReducer);

  return (
    <div>
      <div>
        {
          /**
           * Map over the current season episodes and render an Episode component for each one
           */
          currentSeasonEpisodes.map((item) => {
            const id = `Show:${currentPodcast.id} Season:${currentSeason} Episode:${item.episode}`;

            return (
              <Episode
                /**
                 * Pass props to the Episode component
                 */
                showTitle={currentPodcast.title}
                image={currentPodcast.image}
                id={id}
                key={item.episode}
                item={item}
                showId={currentPodcast.id}
                currentSeason={currentSeason}
                updated={currentPodcast.updated}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default AllEpisodes;