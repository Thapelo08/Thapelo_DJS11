import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getShowDetails } from "../../api";

const ShowDetails = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                const data = await getShowDetails(id);
                setShow(data);
          } catch (error) {
            console.error("Error fetching show details:", error);
            setFetchError("Failed to retrive show details.");
          } finally {
            setIsLoading(false);
          }
        };
        fetchShowDetails();
    }, [id]);
}