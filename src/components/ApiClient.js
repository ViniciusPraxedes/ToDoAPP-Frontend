import axios from 'axios'

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080' //#CHANGE
        //baseURL: 'http://03restapifullstackh2-env.eba-tmxhn3ah.ap-south-1.elasticbeanstalk.com/'
    }
);

