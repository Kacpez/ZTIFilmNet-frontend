import React, { useState, useEffect } from 'react';
import SeriesService from '../services/SeriesService';
import "./css/movie.css"
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'; // Importowanie ikony gwiazdki

const SeriesDetailsComponent = ({ seriesId }) => {
  const [series, setSeries] = useState(null);


  useEffect(() => {
    getSeriesById(seriesId);
  }, [seriesId]);

  const getSeriesById = (id) => {
    SeriesService.getSeriesById(id)
      .then((response) => {
        setSeries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!series) {
    return <div>Loading...</div>;
  }

  const genreList = series.genre ? series.genre.split(',') : [];
  const ratingStars = Array.from({ length: Math.round(series.meanRating) }, (_, index) => (
    <FaStar key={index} className="star-icon" />
  ));

  return (
    <div>
      <h2>Series Details</h2>
      <div className="movie-details-container">
        <div className="movie-details-left">
          <img src={series.poster} alt="Series" />
        </div>
        <div className="movie-details-right">

        <h2 className="movie-title">{series.title}</h2>  
         <span className="badge bg-info">{series.year} </span>{'     '}
           <span className="badge bg-secondary">{series.totalSeasons} seasons</span> 
           <br></br>
           <br></br>
     
          <p>
            <strong>Streaming platform:</strong> {series.streamingPlatform}
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
            {series.meanRating}</h5>
            
          </p>
          <p>
            <strong>Plot:</strong> {series.plot}
          </p>
        </div>
        <Link className="btn btn-info btn-lg" to={`/add-rating-series/${series.id}`} >Add rating</Link>
      </div>
    
    </div>
  );
};

export default SeriesDetailsComponent;