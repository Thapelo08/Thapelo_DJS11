import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getShowDetails } from "../../api";
import AudioPlayer from './AudioPlayer'


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

    if (isLoading) {
        return <div>Loading...</div>;
      }

    if (fetchError) {
        return <div>{fetchError}</div>;
    }

    return (
        <div className="show-details">
            {show && (
                <>
                <h1>{show.title}</h1>
                <div className="show-info">
                    <img src={show.image} alt={show.title} />
                    <p>{show.description}</p>
                </div>
                <div className="season-list">
                    <h2>Seasons</h2>
                    {show.seasons.map((season) => (
                        <button key={season.season} className="season-button">
                            <Link to={`/show/${id}/season/${season.season}`}>
                            Season {season.season}
                            </Link>
                        </button>
                    ))}
                </div>
                  <Link to="/">Back to Previews</Link>
                </>
            )}
        </div>
    );
};

export default ShowDetails;