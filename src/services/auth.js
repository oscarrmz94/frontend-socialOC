import axios from 'axios'
import config from './config'
import store from '@/store/index'

export default {

    login(user) {
        return axios.post(config.api_route+'auth/login',
        user, {headers: {'Content-Type': 'application/json'}}
      ).then((res) => {
            localStorage.setItem('token', res.data.data.token)
            return res.data
        }).catch((error) => {
            return error.response
        });
    },

    register(user) {
        return axios.post(`${config.api_route}auth/register`,
        user,
        {headers: { 'Content-Type': 'application/json'}}
        ).then((res) => {
            return res.data
        }).catch((error) => {
            return error.response
        });
    },
    dashboard() {
        return axios.get(`${config.api_route}dashboard/posts/`,
            {
                headers: {
                    'auth-token': store.state.token,
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            return res.data.data.user
        }).catch((error) => {
            return error.response
        });
    },
}