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
  
    const genres = {
        1: "Personal Growth",
        2: "Investigative Journalism",
        3: "History",
        4: "Comedy",
        5: "Entertainment",
        6: "Business",
        7: "Fiction",
        8: "News",
        9: "Kids and Family",
      };

      useEffect(() => {
        const loadPodcasts = async () => {
            try {
                const data = await getPreviews();
                setPodcasts(data);
                setDisplayedPodcasts(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching podacasts:", error);
                setFetchError("Failed to retrieve podcast previews.");
                setIsLoading(false);
            }
        };

        loadPodcasts();
      }, []);

}