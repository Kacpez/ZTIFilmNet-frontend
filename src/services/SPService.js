import axios from 'axios'

const SP_BASE_REST_API_URL = 'https://spiffy-pizzas-production.up.railway.app/api/v1/streaming_platforms';

class SPService{

    getAllStreamingPlatforms(){
        return axios.get(SP_BASE_REST_API_URL)
    }

}

export default new SPService();