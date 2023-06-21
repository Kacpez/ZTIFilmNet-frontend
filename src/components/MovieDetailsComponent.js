import React, { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';
import "./css/movie.css"
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa';

const MovieDetailsComponent = ({ movieId }) => {
  const [movie, setMovie] = useState(null);


  useEffect(() => {
    getMovieById(movieId);
  }, [movieId]);

  const getMovieById = (id) => {
    MovieService.getMovieById(id)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  if (!movie) {
    return <div>Loading...</div>;
  }
  const genreList = movie.genre ? movie.genre.split(',') : [];
  const ratingStars = Array.from({ length: Math.round(movie.meanRating) }, (_, index) => (
    <FaStar key={index} className="star-icon" />
  ));
  return (
    <div>
      <h2>Movie Details</h2>
      <div className="movie-details-container">
        <div className="movie-details-left">
          <img src={movie.poster} alt="Movie" />
        </div>
        <div className="movie-details-right">
        
          
        <h2 className="movie-title">{movie.title}</h2>  
         <span className="badge bg-info">{movie.year} year</span>{'     '}
           <span className="badge bg-secondary">{movie.runtime}</span> 
           <br></br>
           <br></br>
          <p>
            <strong>Streaming platform:</strong> {movie.streamingPlatform}
          </p>
          <h4>  
        <div className="genre-container">
            {genreList.map((genre, index) => (
              <span key={index} className="badge bg-dark">
                {genre.trim()} {/* Usunięcie ewentualnych białych znaków z początku i końca */}
              </span>
            ))}
          </div>
          </h4> 
          <p>
            <strong>Mean rating:</strong> 
            {'    '}
            <h5>{ratingStars}{'    '}
            {movie.meanRating}</h5>
            
          </p>
          <p>
            <strong>Plot:</strong> {movie.plot}
          </p>
          </div>
        <Link className="btn btn-info btn-lg" to={`/add-rating-movie/${movie.id}`} >Add rating</Link>
      </div>
    </div>
  );
};

export default MovieDetailsComponent;