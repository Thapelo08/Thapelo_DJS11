import React, { useState, useEffect } from "react";
import { setFavouriteSwitch } from "../globalState/reducers/podcastsReducer";
import { useSelector, useDispatch } from "react-redux";
import supabase from "../supabase/client";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { styled } from "styled-components";

// Styled components
const EpisodeContainer = styled.div`
  background-color: #242424;
  margin: 1rem 0;
  padding: 0.8rem;
  border-radius: 0.25rem;
`;

const ImageDescriptionContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const Description = styled.p`
  font-size: 0.8rem;
  margin: 0.7rem 0;
`;

const Image = styled.img`
  width: 40%;
`;

const Episode = ({
  item,
  id,
  showId,
  currentSeason,
  image,
  showTitle,
  updated,
}) => {
  // State to track if the episode is favourite
  const [isFavourite, setIsFavourite] = useState(false);

  // Get favourites from Redux state
  const { favourites } = useSelector((state) => state.podcastsReducer);

  // Get dispatch function from Redux
  const dispatch = useDispatch();

  // Extract episode details from props
  const { description, episode, file, title } = item;

  // Create an object with episode details and IDs
  const episodeWithId = {
    ...item,
    id,
    showId,
    currentSeason,
    image,
    showTitle,
    updated,
  };

  // Function to add episode to favourites
  const addToFavorites = async (ep) => {
    // Check if favourites is not null
    if (favourites !== null) {
      // Check if episode is already in favourites
      const isAlreadyFavourite = favourites.some((fav) => fav.episodeId === id);
      if (isAlreadyFavourite) return;
    }

    // Insert episode into Supabase table
    const { data, error } = await supabase
      .from("userFavourites")
      .insert([
        { episodeId: id, episodeDetails: JSON.stringify(ep), showId: showId },
      ])
      .select();

    // Toggle isFavourite state
    setIsFavourite(true);

    // Dispatch setFavouriteSwitch action
    dispatch(setFavouriteSwitch());
  };

  // Function to remove episode from favourites
  const removeFromFavourites = async () => {
    // Delete episode from Supabase table
    const { error } = await supabase
      .from("userFavourites")
      .delete()
      .eq("episodeId", id);

    // Toggle isFavourite state
    setIsFavourite(false);

    // Dispatch setFavouriteSwitch action
    dispatch(setFavouriteSwitch());
  };

  return (
    <EpisodeContainer>
      <h4>{`${episode}: ${title}`}</h4>
      <ImageDescriptionContainer>
        <Image src={image} alt={title} />
        <div>
          <Description>{description}</Description>
          {isFavourite ? (
            <button onClick={removeFromFavourites}>
              Remove from favourites <AiFillHeart />
            </button>
          ) : (
            <button onClick={() => addToFavorites(episodeWithId)}>
              Add to favourites <AiOutlineHeart />
            </button>
          )}
        </div>
      </ImageDescriptionContainer>
      <audio controls>
        <source src={file} type="audio/mp3" />
      </audio>
    </EpisodeContainer>
  );
};

export default Episode;
