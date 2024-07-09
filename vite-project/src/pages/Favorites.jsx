import { useState } from "react"
import { Link } from "react-router-dom"
import useFavorites from "../Favorites";

const genres = {
    1: "Personal Growth",
    2: "Investigate Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
};

const Favorite = () => {
    const { favorites, removeFavorite } = useFavorites(); // custom hook for managing favorites
    const [sortOption, setSortOption] = useState('');
    const [genreOption, setGenreOption] = useState('');

    const handleRemoveFavorites = (podcastId) => {
        removeFavorite(podcastId);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

   const filteredFavorites = favorites
   .filter(podcast => genreOption === '' || podcast.genres.includes(genres[genreOption]))
   .sort((a, b) => {
    if(sortOption === 'A-Z') return a.title.localeCompare(b.title);
    if(sortOption === 'Z-A') return b.title.localeCompare(a.title);
    if(sortOption === 'Newest') return new Date(b.updated) - new Date(a.updated);
    if(sortOption === 'Oldest') return new Date (a.updated) - new Date (b.updated);
    return 0;
   });

   //Helper function to display formatted genres
   const getGenres = (genres) => {
    return genres.join(", ");
   };
    
}
