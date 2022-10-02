<template>
  <div class="text-white">
    <b-tabs content-class="main-tabs" align="center" class="col-12">      
      <b-tab title="Posts" active>
        <h3 class="text-center mt-5" v-if="posts_user.length === 0">There is no posts yet</h3>
        <post-component :posts_user="posts_user" @openDetail="openDetail"/>
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

    <detail-post 
     :show="show_detail" 
     :key="change_modal" 
     :post="post_detail"
     @closeModal="show_detail = false; post_detail = {}"
    >
    </detail-post>
    
  </div>
</template>

<script>
import postComponent from './PostProfileComponent.vue';
import DetailPost from  './DetailPost.vue';
import mainServices from '../../services/main';

export default {
  components: {
    postComponent,
    DetailPost
  },
  data() {
    return {
      show_detail: false,
      change_modal: false,
      post_detail: {}
    }
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
    },
    openDetail(uuid) {
      this.show_detail = !this.show_detail; 
      this.change_modal = !this.change_modal;
      mainServices.getPost(uuid).then((response) => {
          this.post_detail = response;
          this.post_detail.images = this.getImages(this.post_detail.images);
          history.pushState({urlPath:''},"",`/d/${uuid}`)
      })
    },
    getImages(images) {
      return images.split(',');
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