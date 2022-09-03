<template>
  <div class="text-white">
    <b-tabs content-class="main-tabs" align="center" class="col-12">      
      <b-tab title="Posts" active>
        <h3 class="text-center mt-5" v-if="posts_user.length === 0">There is no posts yet</h3>
        <post-component :posts_user="posts_user"/>
      </b-tab>
      <b-tab title="Videos">
        <h3 class="text-center mt-5" v-if="posts_user.length === 0">There is no posts yet</h3>
        <post-component :posts_user="onlyVideos()"/>
      </b-tab>
      <b-tab title="Tagged" >
        <h3 class="text-center mt-5" v-if="tagged_post.length === 0">There is no tagged post</h3>
        <post-component :posts_user="tagged_post" v-else/>
      </b-tab>
    </b-tabs>

    
  </div>
</template>

<script>
import postComponent from './PostProfileComponent.vue';

export default {
  components: {
    postComponent
  },
  props: {
    posts_user: {
      type: Array,
      required: true
    },
    tagged_post: {
      type: Array,
    }
  },
  methods: {
    onlyVideos() {
      return this.posts_user.filter((item) => item.images.includes('mp4'))
    }
  }
}
</script>

<style>
.avatar-profile {
    background-color: #444;
}
.main-tabs {
  background-color: transparent !important;
}
.nav-link {
  color: white !important;
}
.nav-link.active {
  color: #444 !important;
}
</style>