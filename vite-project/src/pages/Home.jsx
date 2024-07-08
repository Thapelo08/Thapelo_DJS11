import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div  className="home-container">
            <h1>THAPELO PODCAST</h1>
            <p>Welcome to these Great Podcast,Where you enjoy your favorites. You won't get bored right after step into it.  </p>
            <Link to="/podcasts" className="btn btn-primary">Get Started</Link>
        </div> 
    )
}