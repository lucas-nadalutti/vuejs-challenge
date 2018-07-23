import axios from 'axios'
import store from './store'
import properties from './properties'

export default () => {
    axios.interceptors.request.use(config => {
        const token = store.state.token

        // Para requests feitos para o backend cuja URL consta em properties.js,
        // adiciona o token de autenticação no header
        if(token && config.url.startsWith(properties.BASE_URL)) {
            config.headers.Authorization = `${token}`
        }
        return config
    }, function(err) {
        return Promise.reject(err)
    })
}