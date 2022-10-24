import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class BrandDataService {

    getAll(params) {
        console.log("****************")
        console.log(params)

        let config = {
            headers: authHeader(),

        }
        console.log(config)
        return axios.post('/api/v2/data/brands/list', params, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v2/data/brands/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        return axios.post("/api/v2/data/brands/post", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/data/brands/${id}`, data, config);
    }

    delete(id) {
        let config = {
            headers: authHeader()
        }
        return axios.delete(`/api/v2/data/brand/${id}`, config);
    }

    deleteAll() {
        return axios.post(`/api/v2/data/brands`);
    }

    findByBrandName(name) {
        return axios.post(`/api/v2/data/brands?name=${name}`);
    }
}

export default new BrandDataService();