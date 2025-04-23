import React, { useState } from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  // calling set movies not inside useEffect causes an infinite loop error in react
  // setMovies(m)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  }
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  }

  const matchesGenre = (movie, genre) => {
    return genre === "All Genres" || movie.genre.toLowerCase() === genre.toLowerCase();
  }

  const matchesSearchTerm = (movie, genre) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  }

  const matchesRating = (movie, rating) => {
    switch(rating) {
      case 'All':
        return true;
      case 'Good':
        return movie.rating >= 8;
      case 'Ok':
        return movie.rating >= 5 && movie.rating < 8;
      case 'Bad':
        return movie.rating < 5;
      default:
        return false;
    }
  }

  const filteredMovies = movies.filter((movie) => {
    return matchesGenre(movie, genre) && matchesRating(movie, rating) && matchesSearchTerm(movie, searchTerm);
  })

  return (
    <>
      <div>

        <input type='text' placeholder='Search movies...' className='search-input' value={searchTerm} onChange={handleSearchChange} />


        <div className='filter-bar'>

          <div className='filter-slot'>
            <label>Genre</label>
            <select className='filter-dropdown' value={genre} onChange={handleGenreChange}>
              <option>All Genres</option>
              <option>Action</option>
              <option>Drama</option>
              <option>Fantasy</option>
              <option>Horror</option>
            </select>
          </div>

          <div className='filter-slot'>
            <label>Rating</label>
            <select className='filter-dropdown' value={rating} onChange={handleRatingChange}>
              <option>All</option>
              <option>Good</option>
              <option>Ok</option>
              <option>Bad</option>
            </select>
          </div>
        </div>


        <div className='movies-grid'>
          {
            filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} toggleWatchlist={toggleWatchlist} isWatchlisted={watchlist.includes(movie.id)} />
            ))
          }
        </div>


      </div>
    </>
  );
}