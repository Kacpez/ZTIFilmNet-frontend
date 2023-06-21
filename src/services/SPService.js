import axios from 'axios'

const SP_BASE_REST_API_URL = 'http://localhost:8081/api/v1/streaming_platforms';

class SPService{

    getAllStreamingPlatforms(){
        return axios.get(SP_BASE_REST_API_URL)
    }

}

export default new SPService();