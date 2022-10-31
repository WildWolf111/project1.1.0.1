import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class CategoriesDataService {

    getAll(params) {

        let config = {
            headers: authHeader(),

        }

        return axios.post('/api/v2/data/categories/list', params, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/data/categories/get/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(data)
        return axios.post("/api/v2/data/categories/post", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/data/categories/update/${id}`, data, config);
    }

    delete(id) {
        let config = {
            headers: authHeader()
        }
        return axios.delete(`/api/v2/data/categories/delete/${id}`, config);
    }

    deleteAll() {
        return axios.post(`/api/v2/data/categories`);
    }

    findByCategoryName(name) {
        return axios.post(`/api/v2/data/categories?name=${name}`);
    }
}

export default new CategoriesDataService();