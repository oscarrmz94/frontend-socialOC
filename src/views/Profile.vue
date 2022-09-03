<template>
  <div class="text-white">
    <b-row class="mb-5">
      <b-col class="col-12 col-lg-8 mx-auto d-flex justify-content-around flex-wrap">
        <b-col class="col-3">
          <b-avatar class="avatar-profile"></b-avatar>
        </b-col>

        <b-col class="col-7 mb-3">
          <b-row>

            <b-col class="col-12 d-flex justify-content-between align-items-center flex-wrap mb-4">
              <div>
                <h4 class="d-block">{{user.name}}</h4>
                <span class="text-muted d-block col-12">@{{user.nickname}}</span>
              </div>
              <b-button class="ml-2 d-block" v-if="own_user_uuid === user.uuid" @click="$router.push({name: 'EditProfile'})">Edit Profile</b-button>
            </b-col>

            <b-col class="col-12 order-first unordered d-flex justify-content-between my-4">
              <span><strong>{{user.number_post}}</strong> post</span>
              <span class="span-followers" @click="(user.followers > 0) ? getFollowers(user.uuid) : ''"><strong>{{user.followers}}</strong> Followers</span>
              <span class="span-followers" @click="(user.following > 0) ? getFollowing(user.uuid) : ''"><strong>{{user.following}}</strong> Following</span>
            </b-col>

          </b-row>

        </b-col>
        <b-col class="col-12">{{user.about}}</b-col>
      </b-col>
    </b-row>

    <b-modal v-model="show_modal" scrollable size="sm" hide-footer>
      <list-friends-modal :followers="followers" v-on:close_modal="show_modal = false" v-on:update_followers="updateFollowers"/>
    </b-modal>

    <b-row>
      <b-col class="col-12 mt-5 mx-auto">
        <post-profile :posts_user="posts_user" :tagged_post="tagged_post"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import mainServices from '@/services/main'
import postProfile from './profile/PostProfile.vue'
import ListFriendsModal from './profile/listFriendsModal.vue'
import utils from '../libs/utils'

export default {
  components: {
    postProfile,
    ListFriendsModal
},
  data() {
    return {
      user: {},
      posts_user: [],
      own_user_uuid: '',
      show_modal: false,
      followers: [],
      tagged_post: []
    }
  },

  created() {
    this.getDataUser(this.$route.params.uuid);
  },

  methods: {
    getDataUser(uuid) {
      this.own_user_uuid = utils.getUserData().uuid;

      mainServices.getUser(uuid).then((response) => {
        this.user = response.user;
        this.posts_user = response.user.posts
        this.getTaggedPosts();
      })
    },
    getTaggedPosts() {

      mainServices.getTaggedPosts(this.user.uuid).then((response) => {
        console.log('hey this is my response',response, this.user.uuid)
        this.tagged_post = response.rows;
      });
    },
    updateFollowers(data) {
      this.user.following += data
      console.log(data)
    },
    getFollowers(uuid) {
      this.show_modal = true;
      mainServices.getFollowersList(uuid).then((response) => {
        this.followers = [];
        this.followers = response.followers_list;
      })
    },
    getFollowing(uuid) {
      this.show_modal = true;
      mainServices.getFollowingList(uuid).then((response) => {
        this.followers = [];
        this.followers = response.following_list;
      })
    }
  },
  watch: {
    $route(new_value) {
      this.getDataUser(new_value.params.uuid)
    }
  }
}
</script>

<style>
.avatar-profile {
    background-color: #444;
    width: 10em;
    height: 10em;
}
.span-followers:hover {
  cursor: pointer;
  text-decoration: underline;
}

@media(max-width: 576px) {
  .avatar-profile {
    width: 5em;
    height: 5em;
  } 
}
</style>