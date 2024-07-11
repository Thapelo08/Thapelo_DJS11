import React from "react";
import { Link } from "react-router-dom";
import { getPreviews } from "../../api";
import useFavorites from "../../useFavorites";
import useSearchHistory from ""

const Previews = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [displayedPodcasts, setDisplayedPodcasts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [fetchError, setFetchError] = useState(null);
    const [sortOption, setSortOption] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");

    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const { searchHistory, addSearchQuery, clearSearchHistory } = useSearchHistory();
}