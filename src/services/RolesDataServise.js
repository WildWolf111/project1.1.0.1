import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';



// eslint-disable-next-line no-unused-vars
class RolesDataServices {

    path = '/api/v2'

    mpath = '';

    setPath(pth) {
        this.mpath = this.path + '/' + pth;

    }
    list(params) {



        let config = {

            headers: authHeader(),

        }
        console.log(params)
        return axios.post(this.mpath, params, config)

    };

    create(data) {
        let config = {
            headers: authHeader(),
        }

        return axios.post(this.path + '/admin/createRole', data, config)
    }

    addendpoints(data) {
        let config = {
            headers: authHeader(),
        }
        console.log(data)
        return axios.post(this.path + '/admin/assignPerm', data, config)
    }

    update(id, data) {

        let config = {
            headers: authHeader(),
        }

        return axios.put(`/api/v2/useres/${id}`, data, config);

    }

    delete(id) {
        let config = {
            headers: authHeader(),
        }
        return axios.delete(this.mpath + '/' + id, config)
    }

    get(id) {
        let config = {
            headers: authHeader()
        }
        return axios.get(`/api/v2/admin/${id}`, config);
    }



    listPerms(params) {



        let config = {

            headers: authHeader(),

        }
        console.log("_________________")
        console.log(params)
        console.log("_________________")
        return axios.post(`/api/v2/admin/listPerms`, params, config)

    };

}
export default new RolesDataServices();