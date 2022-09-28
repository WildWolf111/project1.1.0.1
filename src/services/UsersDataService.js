import axios from 'axios'
import { authHeader } from '../helpers/authservice/auth-header';



// eslint-disable-next-line no-unused-vars
class UsersDataService {

    path = '/api/v2'

    mpath = '';

    setPath(pth) {
        this.mpath = this.path + '/' + pth;

    }
    list(params) {



        let config = {
            headers: authHeader(),


        }


        return axios.post(this.mpath, params, config)

    }
    create(id, params) {
        let config = {
            headers: authHeader(),
        }
        return axios.post(this.mpath, params, config)
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
        return axios.get(`/api/v2/users/${id}`, config);
    }



    listPerms(params) {



        let config = {

            headers: authHeader(),

        }

        console.log(params)
        console.log("_________________")
        return axios.post(`/api/v2/admin/listPerms`, params, config)

    };

}
export default new UsersDataService();