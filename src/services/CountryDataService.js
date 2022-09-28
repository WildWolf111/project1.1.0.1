import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class CountryDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {
            fields,
            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v2/data/countries/list', dataVals, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v2/data/countries/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        return axios.post("/api/v2/data/countries/post", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.put(`/api/v2/data/countries/${id}`, data, config);
    }

    delete(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/data/country/delete/${id}`, data, config);
    }

    deleteAll() {
        return axios.post(`/api/v2/data/countries`);
    }

    findByBrandName(name) {
        return axios.post(`/api/v2/data/countries?name=${name}`);
    }
}

export default new CountryDataService();