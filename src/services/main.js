import axios from 'axios'
import config from './config'
import store from '@/store/index'

export default {
  getFollowersPosts() {
    return axios.get(`${config.api_route}dashboard/posts/get-posts-followers`,
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
  getNotFollowing() {
    return axios.get(`${config.api_route}dashboard/user/suggestions`,
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
  getUser(user_uuid) {
    return axios.get(`${config.api_route}dashboard/user/get-user/${user_uuid}`,
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
  deletePost(post_uuid, user_uuid) {
    return axios.delete(`${config.api_route}dashboard/posts/delete-post/${post_uuid}/${user_uuid}`,
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
  likePost(data) {
    return axios.post(`${config.api_route}dashboard/posts/like-post`,
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
  likeComment(data) {
    return axios.post(`${config.api_route}dashboard/posts/like-comment`,
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
  deleteProfilePicture() {
    return axios.put(`${config.api_route}dashboard/user/delete-profile-picture`,
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
      console.log('la res', res)
      return res.data.rows[0]
    }).catch((error) => {
      return error.response
    });
  },
  getUsersLikes(uuid, type) {
    return axios.get(`${config.api_route}dashboard/posts/get-users-likes/${type}/${uuid}`,
      {
        headers: {
          'auth-token': store.state.token,
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      return res.data.users;
    }).catch((error) => {
      return error.response
    });
  },
  uploadComment(data) {
    return axios.post(`${config.api_route}dashboard/posts/comment-post`,
      data,
      {
        headers: {
          'auth-token': store.state.token,
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      return res.data.data;
    }).catch((error) => {
      return error.response
    });
  },
  deleteComment(uuid) {
    return axios.delete(`${config.api_route}dashboard/posts/delete-comment-post/${uuid}`,
      {
        headers: {
          'auth-token': store.state.token,
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      return res.data;
    }).catch((error) => {
      return error.response
    });
  },
}