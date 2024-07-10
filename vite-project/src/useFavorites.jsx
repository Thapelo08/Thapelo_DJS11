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
}