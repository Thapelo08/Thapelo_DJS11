import React from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPodcast, setIsLoading, setCurrentSeason,} from '../globalState/reducers/podcastsReducer'

// Define styled components
const PodcastContainer = styled.div`
  flex-grow: 1;
  width: 15rem;
  margin-bottom: 3rem;
  margin-top: 1.5rem;
  box-shadow: 1em 20px 20px;
  display: flex;
  justify-content: center;
  border-radius: 0.9rem;
  background-color: #fff;
  padding: 1rem;
`;

const Podcast = styled.div`
  width: 100%;
  background-color: inherit;
  padding: inherit;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 0.25rem;
`;

const Title = styled.p`
  font-weight: 900;
  font-size: 0.95rem;
  margin-bottom: 0.8rem;
  font-family: arial;
`;

const Details = styled.p`
  font-size: 0.9rem;
  color: gray;
  margin-top: 0.4rem;
`;

const Description = styled.p`
  font-size: 0.7rem;
  margin-bottom: 0.2rem;
`;

const Genre = styled.span`
  margin-right: 0.4rem;
`;

const GenreContainer = styled.div`
  font-size: 0.95rem;
  font-weight: 200;
`;

const PodcastHome = ({ item }) => {
  // Define genre names
  const genreNames = {
    1: 'Personal Growth',
    2: 'True Crime and Investigative Journalism',
    3: 'History',
    4: 'Comedy',
    5: 'Entertainment',
    6: 'Business',
    7: 'Fiction',
    8: 'News',
    9: 'Kids and Family',
  };

  // Get isLoading state from Redux store
  const { isLoading } = useSelector((state) => state.podcastsReducer);

  // Destructure item props
  const {
    description,
    image,
    id: podcastId,
    title,
    seasons,
    updated,
    genres,
  } = item;

  // Get dispatch function from Redux
  const dispatch = useDispatch();

  // Format last update date
  const lastUpdateDate = new Date(updated);
  const day = lastUpdateDate.getDate();
  const month = lastUpdateDate.getMonth();
  const year = lastUpdateDate.getFullYear();
  const date = `${day}/${month + 1}/${year}`;

  // Define getSinglePodcast function
  const getSinglePodcast = async () => {
    try {
      // Set isLoading to true
      dispatch(setIsLoading(true));

      // Fetch podcast data from API
      const response = await fetch(`https://podcast-api.netlify.app/id/${podcastId}`);
      const result = await response.json();

      // If result is valid, update Redux store and set isLoading to false
      if (result) {
        dispatch(setCurrentPodcast(result));
        dispatch(setCurrentSeason(result.seasons.length));
        dispatch(setIsLoading(false));
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PodcastContainer>
      <Link
        to={`/podcast/${podcastId}`}
        onClick={() => getSinglePodcast()}
        className="link"
      >
        <Podcast>
          <Image src={image} alt={`${title}`} />
          <Title>{title}</Title>
          <Description>{description.substring(0, 50)}...</Description>
          <Details>Seasons: {seasons}</Details>
          <Details>Last update: {date}</Details>
          <GenreContainer>
            Genres:
            <Details>
              {genres.map((genre, index) => {
                return <Genre key={index}>{genreNames[genre]}</Genre>;
              })}
            </Details>
          </GenreContainer>
        </Podcast>
      </Link>
    </PodcastContainer>
  );
};

export default PodcastHome;