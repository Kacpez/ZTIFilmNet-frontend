import axios from 'axios'

const MOVIE_BASE_REST_API_URL = 'https://spiffy-pizzas-production.up.railway.app/api/v1/movies';

class MovieService{

    getAllMovies(){
        return axios.get(MOVIE_BASE_REST_API_URL)
    }

    createMovie(movie){
        return axios.post(MOVIE_BASE_REST_API_URL, movie)
    }

    getMovieById(movieId){
        return axios.get(MOVIE_BASE_REST_API_URL + '/' + movieId);
    }

    updatemovie(movieId, movie){
        return axios.put(MOVIE_BASE_REST_API_URL + '/' +movieId, movie);
    }

    deletemovie(movieId){
        return axios.delete(MOVIE_BASE_REST_API_URL + '/' + movieId);
    }
}

export default new MovieService();