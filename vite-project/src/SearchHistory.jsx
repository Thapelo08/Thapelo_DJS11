import { useState, useEffect } from "react";

const SEARCH_HISTORY_KEY = "searchHistory";

const useSearchHistory = () => {
    const [ searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);
    
}