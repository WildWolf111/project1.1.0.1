import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class Warehouse_cellDataService {

    getAll(fields, sorts, pages) {

        let dataVals = {

            pages
        };


        let config = {
            headers: authHeader(),

        }
        console.log(dataVals)
        return axios.post('/api/v2/data/warehouseCells/list', pages, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v2/data/warehouseCells/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        console.log(data)
        return axios.post("/api/v2/data/warehouseCells/post", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.put(`/api/v2/data/warehouseCells/${id}`, data, config);
    }

    delete(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.delete(`/api/v2/data/warehouseCells/${id}`, data, config);
    }

    deleteAll() {
        return axios.post(`/api/v2/data/warehouses_cells`, config);
    }

    findByWarehouse_cellName(name) {
        return axios.post(`/api/v2/data/warehouses_cells?name=${name}`);
    }
}

export default new Warehouse_cellDataService();