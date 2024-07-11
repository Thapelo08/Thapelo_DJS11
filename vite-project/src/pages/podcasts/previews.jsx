import React, { useState, useEffect} from "react";
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
        const genreId = event.target.value;
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

      const applySearchFilter = (query) => {
        const filtered = podcasts.filter((podcast) => 
        podcast.title.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedPodcasts(filtered);
      };

      const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

      if (isLoading) {
        return <di>Loading...</di>;
      }

      if (fetchError) {
        return <div>{fetchError}</div>;
      }

      return (
        <div className="previews">
            <h1>Browse Podcasts</h1>
            <div className="filter-bar">
                <div className="genre-filter">
                    <select onChange={(e) => handleSortChange(e.target.value)}>
                    <option value="All">All</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option> 
                    </select>
                    <select onChange={handleGenreChange} value={selectedGenre}>
                    <option value="All">All Genres</option>
            {Object.entries(genres).map(([id, title]) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))} 
                    </select>
                </div>
                <div className="search-bar">
                    <form onSubmit={handleSearchSubmit}>
                        <input 
                        type="text"
                        placeholder="Search podcasts..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ borderRadius: "50px"}} 
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
            <div className="Search-history">
                <h3>Search History</h3>
                <ul>
                    {searchHistory.map((query, index) => (
                        <li key={index} onClick={() => applySearchFilter(query)}>
                            {query}
                        </li>
                    ))}
                </ul>
                <button onClick={clearSearchHistory}>Clear Search History</button>
            </div>
            <ul className="podcast-list">
                {displayedPodcasts.map((podcast) => (
                  <li key={podcast.id} className="podcast-item">
                    <Link to={`/show/${podcast.id}`} className="podcast-link">
                    <div className="podcast-image">
                        <img src={podcast.image} alt={podcast.title} />
                    </div>
                    <div className="podcast-details">
                      <h3>{podcast.title}</h3>
                      <div className="actons-buttons">

                      </div>
                      <p>
                        Genres:{" "}
                        {podcast.genres.map((genreId) => genres[genreId]).join(", ")}
                      </p>
                      <p>Last Updated: {formatDate(podcast.updated)}</p>
                    </div>
                    </Link>
                  </li>  
                ))}
            </ul>
        </div>
      );
};

export default Previews;