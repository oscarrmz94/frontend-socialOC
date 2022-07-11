import axios from 'axios'
import config from './config'
import store from '@/store/index'

export default {
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
    getFollowersPosts(uuid) {
        return axios.get(`${config.api_route}dashboard/posts/get-posts-followers/${uuid}`,
            {
                headers: {
                    'auth-token': store.state.token,
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            return res.data
        }).catch((error) => {
            return error.response
        });
    },
}