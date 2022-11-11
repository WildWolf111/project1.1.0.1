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
        let config = {
            headers: authHeader()
        }
        console.log(id)
        return axios.get(`/api/v2/data/products/${id}`, config);
    }

    create(data) {
        let config = {
            headers: authHeader()
        }
        console.log(config)
        return axios.post("/api/v2/data/products/post", data, config);
    }

    update(id, data) {
        let config = {
            headers: authHeader()
        }
        return axios.put(`/api/v2/data/products/${id}`, data, config);
    }

    delete(id) {
        let config = {
            headers: authHeader()
        }
        return axios.delete(`/api/v2/data/products/${id}`, config);
    }

    deleteAll() {
        return axios.delete(`/api/v2/data/products/delete`);
    }

    findByProductName(name) {
        return axios.post(`/api/v2/data/products?name=${name}`, config);
    }
    addcategory(data) {
        let config = {
            headers: authHeader()
        }
        console.log(data)
        return axios.post(`/api/v2/data/categories_products/post`, data, config);
    }
}

export default new ProductsDataService();