import axios from 'axios'
import properties from '@/properties'


export default {

    list(username, password) {
        return axios.get(`${properties.BASE_URL}/api/post`)
    },
    create(post) {
        return axios.post(`${properties.BASE_URL}/api/post`, post)
    },
    edit(id, post) {
        return axios.put(`${properties.BASE_URL}/api/post/${id}`, post)
    },
    delete(id) {
        return axios.delete(`${properties.BASE_URL}/api/post/${id}`)
    }

}