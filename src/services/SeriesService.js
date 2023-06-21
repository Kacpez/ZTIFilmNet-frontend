import axios from 'axios'

const SERIES_BASE_REST_API_URL = 'https://spiffy-pizzas-production.up.railway.app/api/v1/series';

class SeriesService{

    getAllSeries(){
        return axios.get(SERIES_BASE_REST_API_URL)
    }

    createSeries(series){
        return axios.post(SERIES_BASE_REST_API_URL, series)
    }

    getSeriesById(seriesId){
        return axios.get(SERIES_BASE_REST_API_URL + '/' + seriesId);
    }

    updateseries(seriesId, series){
        return axios.put(SERIES_BASE_REST_API_URL + '/' +seriesId, series);
    }

    deleteseries(seriesId){
        return axios.delete(SERIES_BASE_REST_API_URL + '/' + seriesId);
    }
}

export default new SeriesService();