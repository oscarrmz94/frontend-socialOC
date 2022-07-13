<template>
  <div class="text-white">
    <b-row class="mb-5">
      <b-col class="col-8 mx-auto d-flex justify-content-around">
        <b-col class="col-3">
          <b-avatar size="10em" class="avatar-profile"></b-avatar>
        </b-col>

        <b-col class="col-7">
          <b-col class="col-12 d-flex justify-content-between align-items-center flex-wrap mb-4">
            <div>
              <h4 class="d-block">{{user.name}}</h4>
              <span class="text-muted d-block col-12">@{{user.nickname}}</span>
            </div>

            <b-button class="ml-2 d-block" v-if="user_uuid === user.uuid">Edit Profile</b-button>
          </b-col>
        
          <b-col class="col-12 d-flex justify-content-between mb-4">
            <span><strong>{{(user.followers) ? user.posts.length : 0}}</strong> post</span>
            <span class="span-followers" @click="getFollowers(user.uuid)"><strong>{{user.followers}}</strong> Followers</span>
            <span class="span-followers" @click="getFollowing(user.uuid)"><strong>{{user.following}}</strong> Following</span>
          </b-col>

          <b-col class="col-12">{{user.about}}</b-col>
        </b-col>
      </b-col>
    </b-row>

    <b-modal v-model="show_modal" scrollable size="sm" hide-footer>
      <list-friends-modal :followers="followers"/>
    </b-modal>

    <b-row>
      <b-col class="col-11 mt-5 mx-auto">
        <post-profile :posts_user="posts_user"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import mainServices from '@/services/main'
import postProfile from './profile/PostProfile.vue'
import ListFriendsModal from './profile/listFriendsModal.vue'

export default {
  components: {
    postProfile,
    ListFriendsModal
},
  data() {
    return {
      user: {},
      posts_user: [],
      user_uuid: '',
      show_modal: false,
      followers: []
    }
  },

  created() {
    this.getDataUser();
  },

  methods: {
    getDataUser() {
      mainServices.dashboard().then((user_token) => {
        this.user_uuid = user_token.uuid;
      });
      mainServices.getUser(this.$route.params.uuid).then((response) => {
          this.user = response.user;
          this.posts_user = response.user.posts
          console.log(this.user)
      })
    },

    getFollowers(uuid) {
      this.show_modal = true;
      mainServices.getFollowersList(uuid).then((response) => {
        this.followers = response.followers_list;
      })
    },
    getFollowing(uuid) {
      this.show_modal = true;
      mainServices.getFollowingList(uuid).then((response) => {
        this.followers = response.followers_list;
      })
    }
  }
}
</script>

<style>
.avatar-profile {
    background-color: #444;
}
.span-followers:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>