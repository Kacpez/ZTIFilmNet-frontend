import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MovieService from '../services/MovieService';
import SPService from '../services/SPService';

const AddMovieComponent = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [plot, setPlot] = useState('');
  const [runtime, setRuntime] = useState('');
  const [poster, setPoster] = useState('');
  const [streamingPlatform, setStreamingPlatform] = useState('');
  const [meanRating, setMeanRating] = useState('');
  const history = useNavigate();
  const { id } = useParams();
  const [streamingPlatforms, setStreamingPlatforms] = useState([]);
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    SPService.getAllStreamingPlatforms()
      .then((response) => {
        setStreamingPlatforms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      MovieService.getMovieById(id)
        .then((response) => {
          const movie = response.data;
          setTitle(movie.title);
          setYear(movie.year);
          setGenre(movie.genre);
          setPlot(movie.plot);
          setRuntime(movie.runtime);
          setPoster(movie.poster);
          setStreamingPlatform(movie.streamingPlatform);
          setMeanRating(movie.meanRating);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const saveOrUpdateMovie = (e) => {
    e.preventDefault();

    const movie = {
      title,
      year,
      genre,
      plot,
      runtime,
      poster,
      streamingPlatform,
      meanRating,
    };
    const validationErrors = [];

    if (!title) {
      validationErrors.push('Title is required');
    }

    if (!year) {
      validationErrors.push('Year is required');
    }
    if (!genre) {
      validationErrors.push('Genre is required');
    }

    if (!plot) {
      validationErrors.push('Plot is required');
    }
    if (!runtime) {
      validationErrors.push('Runtime is required');
    }

    if (!poster) {
      validationErrors.push('Poster is required');
    }
    if (!streamingPlatform) {
      validationErrors.push('Streaming Platform is required');
    }

    if (!meanRating) {
      validationErrors.push('Mean Rating is required');
    }
    if (isNaN(meanRating) ||
    meanRating < 0 ||
    meanRating > 10) {
      validationErrors.push('Mean Rating must be a number not grater than 10');
    }

    // reszta walidacji pól

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (id) {
      MovieService.updatemovie(id, movie)
        .then((response) => {
          history('/movies');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      MovieService.createMovie(movie)
        .then((response) => {
          console.log(response.data);
          history('/movies');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const title1 = () => {
    if (id) {
      return <h2 className="text-center">Update Movie</h2>;
    } else {
      return <h2 className="text-center">Add Movie</h2>;
    }
  };

  return (
    <div>
      <br />
      <br />
      <h2 className="text-center">{title1()}</h2>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Title :</label>
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Year :</label>
                  <input
                    type="text"
                    placeholder="Year"
                    name="year"
                    className="form-control"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Genre :</label>
                  <input
                    type="text"
                    placeholder="Genre"
                    name="genre"
                    className="form-control"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Runtime :</label>
                  <input
                    type="text"
                    placeholder="Runtime"
                    name="runtime"
                    className="form-control"
                    value={runtime}
                    onChange={(e) => setRuntime(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Plot :</label>
                  <textarea
                    type="text"
                    placeholder="Plot"
                    name="plot"
                    className="form-control"
                    value={plot}
                    onChange={(e) => setPlot(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Poster :</label>
                  <input
                    type="text"
                    placeholder="Poster"
                    name="poster"
                    className="form-control"
                    value={poster}
                    onChange={(e) => setPoster(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Streaming platform :</label>
                  <select
                    class="form-select"
                    value={streamingPlatform}
                    onChange={(e) => setStreamingPlatform(e.target.value)}
                  >
                    <option value="">Select platform</option>
                    {streamingPlatforms.map((platform) => (
                      <option key={platform.name} value={platform.name}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Rating:</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    className="form-control"
                    value={meanRating}
                    readOnly={id ? true : false}
                    onChange={(e) => setMeanRating(e.target.value)}
                  />
                </div>
              
<br></br>
{errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateMovie(e)}
                
                >
                  Submit
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
  );
};

export default AddMovieComponent;
