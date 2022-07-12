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
    getNotFollowing(uuid) {
        return axios.get(`${config.api_route}dashboard/user/suggestions/${uuid}`,
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
    follow(data) {
        return axios.post(`${config.api_route}dashboard/user/follow/`,
        data,
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
    getUser(uuid) {
        return axios.get(`${config.api_route}dashboard/user/get-user/${uuid}`,
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