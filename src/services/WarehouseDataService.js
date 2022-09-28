import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class WarehouseDataService {


    getAll(params, jsonPages) {
        console.log("****************")
        console.log(params)

        let config = {
            headers: authHeader(),

        }
        console.log(config)
        return axios.post('/api/v2/data/warehouses/list', {}, config, jsonPages)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v2/data/warehouses/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        return axios.post("/api/v2/data/warehouses/post", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.put(`/api/v2/data/warehouses/${id}`, data, config);
    }

    delete(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.delete(`/api/v2/data/warehouses/${id}`, data, config);
    }



    findByWarehouseName(name) {
        return axios.post(`/api/v2/data/api/v3/warehouses?name=${name}`, config);
    }
}

export default new WarehouseDataService();