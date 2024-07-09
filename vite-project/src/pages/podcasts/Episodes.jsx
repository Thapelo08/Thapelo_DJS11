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
}

