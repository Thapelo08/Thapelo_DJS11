// src/api/index.js

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}


export async function getPreviews() {
    const url = "https://podcast-api.netlify.app/";
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch previews: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}

export async function getGenre(genreId) {
    const url = `https://podcast-api.netlify.app/genre/${genreId}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch genre ${genreId}: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}

export async function getShowById(showId) {
    const url = `https://podcast-api.netlify.app/id/${showId}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch show ${showId}: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}

export async function getShowDetails(id) {
    const url = `https://podcast-api.netlify.app/id/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch show details: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}

export async function getEpisodesBySeason(id, season) {
    const url = `https://podcast-api.netlify.app/id/${id}/seasons/${season}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch episodes for season ${season}: ${res.statusText}`);
    }
    const data = await res.json();
    return data;

}