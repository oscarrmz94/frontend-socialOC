import axios from 'axios'
import config from './config'
import store from '@/store/index'

export default {
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
    getUser(data) {
        return axios.post(`${config.api_route}dashboard/user/get-user`,
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
    getFollowersList(uuid) {
        return axios.get(`${config.api_route}dashboard/user/followers-list/${uuid}`,
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
    getFollowingList(uuid) {
        return axios.get(`${config.api_route}dashboard/user/following-list/${uuid}`,
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
    uploadPost(data) {
        return axios.post(`${config.api_route}dashboard/posts/upload-post`,
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
    deletePost(uuid) {
        return axios.delete(`${config.api_route}dashboard/posts/delete-post/${uuid}`,
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
    like(data) {
        return axios.post(`${config.api_route}dashboard/posts/like`,
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
    getTaggedPosts(user_uuid) {
        return axios.get(`${config.api_route}dashboard/posts/get-posts-tagged/${user_uuid}`,
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
    uploadProfilePicture(data) {
        return axios.post(`${config.api_route}dashboard/user/upload-profile-picture`,
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
    deleteProfilePicture(data) {
        return axios.put(`${config.api_route}dashboard/user/delete-profile-picture`,
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
    getPost(uuid) {
        return axios.get(`${config.api_route}dashboard/posts/get-post/${uuid}`,
            {
                headers: {
                    'auth-token': store.state.token,
                    'Content-Type': 'application/json'
                }
            }
        ).then((res) => {
            return res.data.rows[0]
        }).catch((error) => {
            return error.response
        });
    },
}