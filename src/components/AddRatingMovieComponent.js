import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MovieService from '../services/MovieService';

const AddRatingMovieComponent = () => {
  const [meanRating, setMeanRating] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      MovieService.getMovieById(id)
        .then((response) => {
          setMovie(response.data);
          setMeanRating(response.data.meanRating);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const AddRatingMovie = (e) => {
    e.preventDefault();

    if (meanRating.trim() === '') {
      setError('Please enter a mean rating');
      return;
    }
    if (isNaN(meanRating)||
    meanRating < 0 ||
    meanRating > 10) {
      setError('Mean Rating must be a number not grater than 10');
      return;
    }
    const updatedMovie = {
      ...movie,
      meanRating: (0.9 * parseFloat(movie.meanRating) + 0.1 * parseFloat(meanRating)).toFixed(2),
    };

    
      MovieService.updatemovie(id, updatedMovie)
        .then((response) => {
          history('/movies');
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const titleText = 'Add Movie Rating';

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-center">{titleText}</h2>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <div className="card-body">

            <div>
                <h4> {movie.title}</h4>
                <p>{movie.streamingPlatform}</p>


              <form>
                <div class="mb-3">
                  <label class="form-label">Mean Rating:</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    className="form-control"
                    name="meanRating"
                    value={meanRating}
                    onChange={(e) => setMeanRating(e.target.value)}
                  />
                  {error && <div className="text-danger">{error}</div>}
                </div>
             
                <button
                  className="btn btn-success"
                  onClick={AddRatingMovie}
                >
                  Save
                </button>
                {'   '}
                <Link to="/movies" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRatingMovieComponent;
