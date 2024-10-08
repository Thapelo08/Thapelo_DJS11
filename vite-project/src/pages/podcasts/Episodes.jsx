import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEpisodesBySeason } from "../../api"
import Audio from './Audio';

const Episodes = () => {
    const { id, season } = useParams();
    const [episodes, setEpisodes ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

useEffect(() => {
    const fetchEpisodes = async () => {
        try {
            const data = await getEpisodesBySeason(id);
            setEpisodes(data);
        } catch (error) {
            console.error("Error fetching episodes:", error);
            setFetchError("Failed to retrieve episodes.");
        } finally {
            setIsLoading(false);
        }
    };

    fetchEpisodes();
}, [id]);

if (isLoading) {
    return <div>Loading...</div>;
}

if (fetchError) {
    return <div>{fetchError}</div>;
} 

const currentSeason = episodes.seasons.find(item => item.season === season);

if (!currentSeason) {
    return <div>Season {season} not found.</div>;
}

return (
    <div className="episodes">
        <h1>Episodes for Season {season}</h1>
        <ul className="episodes-list">
            {currentSeason.episodes.map((episode) => (
                <li key={episode.id} className="episode-item">
                    <h3>{episode.title}</h3>
                    <p>{episode.description}</p>
                    <Audio audioUrl={episode.file} title={episode.title} />
                </li>
            ))}
        </ul>
        <Link to={`/show/${id}`}>Back to Show</Link>
    </div>
);
};

export default Episodes;

