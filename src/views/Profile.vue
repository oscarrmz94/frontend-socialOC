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
              <h4 class="d-block">Nombre de usuario</h4>
              <span class="text-muted d-block col-12">@nickname</span>
            </div>

            <b-button class="ml-2 d-block">Edit Profile</b-button>
          </b-col>
        
          <b-col class="col-12 d-flex justify-content-between mb-4">
            <span><strong>95</strong> post</span>
            <span><strong>911</strong> Followers</span>
            <span><strong>1000</strong> Following</span>
          </b-col>

          <b-col class="col-12">About</b-col>
        </b-col>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="col-10 mt-5 mx-auto d-flex justify-content-around">
        <post-profile :posts_user="posts_user"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import mainServices from '@/services/main'
import postProfile from './profile/PostProfile.vue'

export default {
  components: {
    postProfile
  },
  data() {
    return {
      user: {},
      posts_user: []
    }
  },

  created() {
    this.getDataUser();
  },

  methods: {
    getDataUser() {
      mainServices.getUser(this.$route.params.uuid).then((response) => {
          this.user = response.user;
          this.posts_user = response.user.posts
      })
    }
  }
}
</script>

<style>
.avatar-profile {
    background-color: #444;
}
</style>