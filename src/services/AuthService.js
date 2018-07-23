import axios from 'axios'
import properties from '@/properties'


export default {

    login(username, password) {
        return axios.post(`${properties.BASE_URL}/api/login`, {username, password})
    }

}