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
    
}
