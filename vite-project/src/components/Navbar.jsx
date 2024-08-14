import React from "react";
import { styled } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setHomePageDisplayedPodcasts, setSorting, setSearchInput, } from "../globalState/reducers/podcastsReducer";

// Define a styled nav element
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  gap: 5rem;
  margin: 0.15rem auto;
  box-shadow: 8px 5px 20px;
`;

// Define a styled select element
const Select = styled.select`
  width: 10rem;
  font-size: 0.9rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
`;

// Define a styled input element
const Input = styled.input`
  font-size: 0.9rem;
`;

// Define a styled div element for login buttons
const LogInButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.2rem;
`;

// Define a styled button element
const Button = styled.button`
  font-size: 2rem;
`;

const Navbar = () => {
  // Get the dispatch function from react-redux
  const dispatch = useDispatch();

  // Get the state from the podcastsReducer
  const {
    allPodcasts,
    searchInput,
    homePageDisplayedPodcasts,
    sorting,
    isLoggedIn,
  } = useSelector((state) => state.podcastsReducer);

  // Handle the back to home button click
  const handleBackToHome = () => {
    // Dispatch an action to set the home page displayed podcasts to all podcasts
    dispatch(setHomePageDisplayedPodcasts(allPodcasts));
  };

  // Handle the sort alphabetically select change
  const handleSortAlphabetically = (e) => {
    // Get the selected value
    const value = e.target.value;

    // Create a copy of the original array
    let sortedPodcasts = [...allPodcasts];

    // Sort the podcasts based on the selected value
    switch (value) {
      // Sort alphabetically in ascending order
      case "AZ":
        sortedPodcasts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      // Sort alphabetically in descending order
      case "ZA":
        sortedPodcasts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      // Sort by date in ascending order
      case "ascendingDate":
        sortedPodcasts.sort((a, b) => a.updated - b.updated);
        break;
      // Sort by date in descending order
      case "decendingDate":
        sortedPodcasts.sort((a, b) => b.updated - a.updated);
        break;
      default:
        // Reset to the original array
        sortedPodcasts = allPodcasts;
    }

    // Dispatch an action to set the sorting value and the home page displayed podcasts
    dispatch(setSorting(value));
    dispatch(setHomePageDisplayedPodcasts(sortedPodcasts));
  };

  // Handle the search input change
  const handleSearchPodcasts = (e) => {
    // Prevent the default form submission
    e.preventDefault();

    // Get the search input value
    const value = e.target.value.toLowerCase();

    // Dispatch an action to set the search input value
    dispatch(setSearchInput(value));

    // Filter the podcasts based on the search input value
    const filteredPodcasts = allPodcasts.filter((item) =>
      item.title.toLowerCase().includes(value)
    );

    // Dispatch an action to set the home page displayed podcasts to the filtered podcasts
    dispatch(setHomePageDisplayedPodcasts(filteredPodcasts));
  };

  return (
    <Nav>
      {/* Logo image with a click handler to go back to home */}
      <img
        src="/Avioli's Podcast_transparent.png"
        alt="Podcast logo"
        onClick={handleBackToHome}
        width="80px"
      />

      {/* Sorting select element */}
      <p>
        <Select
          name="sorting"
          id="sorting"
          value={sorting}
          onChange={handleSortAlphabetically}
        >
          <option value="">-- Select an Podcast --</option>
          <option value="AZ">Alphabetical (A-Z)</option>
          <option value="ZA">Alphabetical (Z-A)</option>
          <option value="decendingDate">Date (Newest)</option>
          <option value="ascendingDate">Date (Oldest)</option>
        </Select>
      </p>

      {/* Search input element */}
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <Input
          type="text"
          name="searchInput"
          id="search"
          onChange={handleSearchPodcasts}
          value={searchInput}
          placeholder="Search"
          style={{
            padding: "0.5rem",
            fontSize: "0.9rem",
            border: "none",
            borderRadius: "0.5rem",
            backgroundColor: "#f5f5f5",
            width: "15rem",
          }}
        />
      </form>

       {/* Login buttons */}
       <LogInButtons>
        {!isLoggedIn && (
          <Link to="/signup">
            <Button
              style={{
                marginRight: "1rem",
                padding: "0.5rem 1rem",
                fontSize: "0.9rem",
                border: "none",
                borderRadius: "0.5rem",
                backgroundColor: "#4CAF50",
                color: "#ffffff",
                cursor: "pointer",
              }}
            >
              Signup
            </Button>
          </Link>
        )}
        <Link to="/login">
          <Button
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
              border: "none",
              borderRadius: "0.5rem",
              backgroundColor: "#4CAF50",
              color: "#ffffff",
              cursor: "pointer",
            }}
          >
            {!isLoggedIn ? "Login" : "Logout"}
          </Button>
        </Link>
      </LogInButtons>
    </Nav>
  );
};

export default Navbar;
