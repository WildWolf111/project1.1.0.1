import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class CompaniesDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {
            fields,
            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v2/data/companies/list', dataVals, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v2/data/companies/${id}`, config);
    }

    create(data) {
        console.log("DocumentDataService CREATE FUNCTION")
        console.log(data)
        let config = {
            headers: authHeader()
        }

        return axios.post(`/api/v2/data/companies/post`, data, config);
    }

    update(id, data) {
        console.log(data)
        let config = {
            headers: authHeader()
        }
        return axios.put(`/api/v2/data/companies/${id}`, data, config);
    }

    delete(id) {
        let config = {
            headers: authHeader()
        }
        return axios.delete(`/api/v2/data/companies/${id}`, config);
    }

    deleteAll() {
        return axios.post(`/api/v2/data/companies`);
    }

    findByBrandName(name) {
        return axios.post(`/api/v2/data/companies?name=${name}`);
    }
}

export default new CompaniesDataService();