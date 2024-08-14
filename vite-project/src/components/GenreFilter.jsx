import React from 'eact';

/**
 * GenreFilter component: allows users to filter by genre
 * 
 * @param {object} props - component props
 * @param {array} props.genres - array of genre objects {id, title}
 * @param {function} props.handleFilter - callback function to handle filter changes
 */
const GenreFilter = ({ genres, handleFilter }) => {
  /**
   * Handle select change event and call handleFilter callback
   * 
   * @param {object} e - event object
   */
  const handleChange = (e) => {
    handleFilter(e.target.value);
  };

  return (
    <div>
      <h2>Filter by Genre</h2>
      {/* Use onChange event handler and remove inline function */}
      <select onChange={handleChange}>
        {genres.map((genre) => (
          /**
           * Use key prop to avoid react/jsx-key warning
           * Key should be unique for each option
           */
          <option key={genre.id} value={genre.id}>
            {genre.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
