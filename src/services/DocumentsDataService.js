import { config } from '@fullcalendar/core';
import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';


class DocumentsDataService {



    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v2/data/documents/${id}`, config);
    }

    create(data) {
        console.log("DocumentDataService CREATE FUNCTION")
        console.log(data)
        let config = {
            headers: authHeader()
        }

        return axios.post(`/api/v2/data/documents/post`, data, config);
    }

    update(id, data) {

        let config = {
            headers: authHeader(),
        }
        console.log(data)
        console.log(`/api/v3/documents/${id}`)
        return axios.put(`/api/v2/data/documents/${id}`, data, config);

    }

    delete(id) {

        return axios.delete(`/api/v2/data/documents/${id}`);
    }

    deleteAll() {
        return axios.post(`/api/v2/data/documents`);
    }

    findByBrandName(name) {
        return axios.post(`/api/v2/data/documents?name=${name}`, config);
    }

    holddocument(id) {
        let config = {
            headers: authHeader(),
        }
        return axios.put(`/api/v2/data/documents/hold/${id}`, config);

    }
    unholddocument(id) {
        let config = {
            headers: authHeader(),
        }
        return axios.put(`/api/v2/data/documents/unhold/${id}`, config);

    }
}

export default new DocumentsDataService();