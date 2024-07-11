import { useState, useEffect } from "react";

const FAVORITES_KEY = "favprites";

const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage on initial render
    useEffect(() => {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    // Update localStorage and state when favorites change
    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    //Add a podcast to favorites
    const addFavorite = (podcast) => {
        if (!favorites.some((fav) => fav.id === podcast.id)) {
            const updatedFavorites = [...favorites,podcast];
            setFavorites(updatedFavorites);
        }
    };

    // Remove a podcast from Favorites
    const removeFavorite = (podcastId) => {
        const updatedFavorites = favorites.filter((fav) => fav.id === podcastId);
        setFavorites(updatedFavorites);
    };

    // check if a podcast is in favorrites
    const isFavorite = (podcastId) => {
        return favorites.some((fav) => fav.id === podcastId);
    };

    return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;