import React from "react"
import { Link, NavLink } from "react-router-dom"

export default function Header() {
    const activeStyles = {
        fontweight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    function fakeLogOut() {
        localStorage.removeitem("loggedin")
    }

    return (
        <header>
            <Link className="" to="/">Thapelo Podcast</Link>
            <nav>
                <NavLink
                to="/about"
                style={({ isActive }) => isActive ? activeStyles : null}
                >
                    About
                    </NavLink>
                    <NavLink
                    to="/favoriteEpisodes"
                    style={({ isActive }) => isActive ? activeStyles : null}
                    > Favorite Episodes
                    </NavLink>
                    <Link to="login" className="login-link">
                    <img 
                    className="login-icon"
                    />
                    </Link>
                    <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )

}