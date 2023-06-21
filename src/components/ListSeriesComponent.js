import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SeriesService from '../services/SeriesService'
import SeriesDetailsComponent from './SeriesDetailsComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const ListSeriesComponent = () => {

    const [series, setSeries] = useState([])
    const [selectedSeriesId, setSelectedSeriesId] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {

        getAllSeries();
    }, [])

    const getAllSeries = () => {
        SeriesService.getAllSeries().then((response) => {
            setSeries(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteSeries = (seriesId) => {
        SeriesService.deleteseries(seriesId).then((response) =>{
        getAllSeries();

       }).catch(error =>{
           console.log(error);
       })
        
    }
    const handleSeriesDetails = (seriesId) => {
        setSelectedSeriesId(seriesId);
      };
      const sortSeriesByMeanRating = () => {
        const sortedSeries = [...series];
        sortedSeries.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a.meanRating - b.meanRating;
          } else {
            return b.meanRating - a.meanRating;
          }
        });
        setSeries(sortedSeries);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      };

    return (
        <div className = "container">
            <h2 className = "text-center"> List series </h2>
            <Link to = "/add-series" className = "btn btn-success btn-lg" > Add series </Link>
            <br></br>
            {selectedSeriesId && (
        <SeriesDetailsComponent seriesId={selectedSeriesId} />
      )}
      <br></br>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <th> ID </th>
                    <th> Title </th>
                    <th> Year </th>
                    <th> Genre </th>
                    <th>
              Mean Rating{' '}
              <button
                className="btn btn-link btn-sm"
                onClick={sortSeriesByMeanRating}
              >
                {sortOrder === 'asc' ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDown} />
                )}
              </button>
            </th>
                    <th> Actions </th>
                  
                </thead>
                <tbody>
                    {
                        series.map(
                            series =>
                            <tr key = {series.id}> 
                                <td> {series.id} </td>
                                <td> {series.title} </td>
                                <td>{series.year}</td>
                                <td>{series.genre}</td>
                                <td>{series.meanRating}</td>
                                <td>
                                    <Link className="btn btn-warning" to={`/edit-series/${series.id}`} >Update</Link>
                                    <button className = "btn btn-danger" onClick = {() => deleteSeries(series.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                                    <button
                  className="btn btn-primary"
                  onClick={() => handleSeriesDetails(series.id)}
                  style={{ marginLeft: '10px' }}
                >
                  View 
                </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListSeriesComponent