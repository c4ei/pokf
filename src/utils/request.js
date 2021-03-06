import axios from 'axios'
import { Message } from 'element-ui'
// import router from '../router/index'

const request = axios.create({
    baseURL: 'http://localhost:3000/rest/v1',
    timeout: 15000
})

request.interceptors.request.use(
    config => {
        // config.headers[] = getToken('');
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    response => {
        var res = response.data
        if(res.code === 200){
            return res
        }
        else{
            Message({message: res.message, type: 'error'})
            return Promise.reject('error')
        }
    },
    error => {
        Message({message: error, type: 'error'})
        return Promise.reject(error)
    }
)

export default request