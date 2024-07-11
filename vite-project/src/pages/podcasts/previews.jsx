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

      useEffect(() => {
        const sortPodcasts = (option, data) => {
            let sortedData = [...data];
            switch (option) {
                case "A-Z":
                sortedData.sort((a, b) => a.title.localeCompare(b.title));
                break;
                case "Z-A":
                sortedData.sort((a, b) => b.title.localeCompare(a.title));
                break;
                case "Newest":
                    sortedData.sort((a, b) => new Date (b.updated) - new Date(a.updated));
                    break;
                    case "Oldest":
                        sortedData.sort((a, b) => new Date(a.updated) - new Date(b.updated));
                        break;
                        default:
                            sortedData = podcasts;

            }
            return sortedData; 
        };

        setDisplayedPodcasts(sortPodcasts(sortOption,podcasts));
      }, [sortOption, podcasts]);

      const handleGenreChange = (event) => {
        const grenreId = event.target.value;
        setSelectedGenre(genreId);
        if (genreId === "All") {
           setDisplayedPodcasts(podcasts);
        } else {
            const filtered = podcasts.filter((podcast) =>
            podcast.genres.includes(parseInt(genreId))
        );
        setDisplayedPodcasts(filtered);
        }
      };

      const handleSortChange = (option) => {
        setSortOption(option);
      };

      const handleFavoriteToggle = (podcast, event) => {
        event.preventDefault();
        if (isFavorite(podcast.id)) {
            removeFavorite(podcast.id);
        } else {
            addFavorite(podcast);
        }
      };

      const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };

      const handleSearchSubmit = (event) => {
        event.preventDefault();
        addSearchQuery(searchQuery);
      };

}