import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class GTDDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {

            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v2/data/gtd/list', dataVals, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v2/data/gtd/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        console.log(data)
        return axios.post("/api/v2/data/gtd/post", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }

        return axios.put(`/api/v2/data/gtd/${id}`, data, config);
    }

    delete(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.delete(`/api/v2/data/GTD/${id}`, data, config);
    }

    deleteAll() {
        return axios.post(`/api/v2/data/GTD`, config);
    }

    findByGTDName(name) {
        return axios.post(`/api/v2/data/GTD?name=${name}`);
    }
}

export default new GTDDataService();