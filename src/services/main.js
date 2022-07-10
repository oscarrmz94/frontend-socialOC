import axios from 'axios'
import config from './config'
import store from '@/store/main'

export default {

    getFollowersPosts(uuid) {
        return axios.post(`${config.api_route}dashboard/posts/get-post-followers/${uuid}`,
        user, {headers: {'auth-token': store.state.token,
            'Content-Type': 'application/json'}}
      ).then((res) => {
            return res.data
        }).catch((error) => {
            return error.response
        });
    },
}