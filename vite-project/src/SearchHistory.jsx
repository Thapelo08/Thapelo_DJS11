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

    const addSearchQuery = (query) => {
        // Remove duplicates and place the new query at the beginning
        const updatedHistory = [query, ...searchHistory.filter(item => item !== query)];
        setSearchHistory(updatedHistory);
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    };


    const clearSearchHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem(SEARCH_HISTORY_KEY);
    };

    return { searchHistory, addSearchQuery, clearSearchHistory };

};

export default useSearchHistory;