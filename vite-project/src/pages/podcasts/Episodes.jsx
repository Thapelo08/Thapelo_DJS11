import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEpisodesBySeason } from "../../api"
import Audio from './Audio';

const Episodes = () => {
    const { id, season } = useParams();
    const [episodes, setEpisodes ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchErrror, setFetchError] = useState(null);


}

