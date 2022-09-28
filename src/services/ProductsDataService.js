import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';



class ProductsDataService {

    getAll(params) {

        let config = {
            headers: authHeader(),

        }

        return axios.post('/api/v2/data/products/list', params, config)
    }



    get(id) {
        return axios.post(`/api/v2/data/product/get/${id}`, config);
    }

    create() {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        return axios.post("/api/v2/data/products/create", {}, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/data/product/update/${id}`, data, config);
    }

    delete(id) {
        let config = {
            headers: authHeader()
        }
        return axios.post(`/api/v2/data/product/delete/${id}`, [0], config);
    }

    deleteAll() {
        return axios.delete(`/api/v2/data/products/delete`);
    }

    findByProductName(name) {
        return axios.post(`/api/v2/data/products?name=${name}`, config);
    }
}

export default new ProductsDataService();