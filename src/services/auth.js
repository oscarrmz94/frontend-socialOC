import axios from 'axios'
import config from './config'

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
}