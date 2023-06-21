import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieService from '../services/MovieService';
import MovieDetailsComponent from './MovieDetailsComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';


const ListMovieComponent = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = () => {
    MovieService.getAllMovies()
      .then((response) => {
        setMovies(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMovie = (movieId) => {
    MovieService.deletemovie(movieId)
      .then((response) => {
        getAllMovies();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMovieDetails = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const sortMoviesByMeanRating = () => {
    const sortedMovies = [...movies];
    sortedMovies.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.meanRating - b.meanRating;
      } else {
        return b.meanRating - a.meanRating;
      }
    });
    setMovies(sortedMovies);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="container">
      <h2 className="text-center">List movies</h2>
      <Link to="/add-movie" className="btn btn-success btn-lg">
        Add Movie
      </Link>
      <br></br>
      {selectedMovieId && (
        <MovieDetailsComponent movieId={selectedMovieId} />
      )}
      <br></br>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>
              Mean Rating{' '}
              <button
                className="btn btn-link btn-sm"
                onClick={sortMoviesByMeanRating}
              >
                {sortOrder === 'asc' ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.year}</td>
              <td>{movie.genre}</td>
              <td>{movie.meanRating}</td>
              <td>
                <Link className="btn btn-warning" to={`/edit-movie/${movie.id}`}>
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMovie(movie.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleMovieDetails(movie.id)}
                  style={{ marginLeft: '10px' }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListMovieComponent;
