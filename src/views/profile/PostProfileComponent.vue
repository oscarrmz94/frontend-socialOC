<template>
  <div class="col-12 mx-auto my-4 row gx-5">
    <div v-for="(post, index) in posts_user" :key="index" class="col">
       <b-img :src="post.images" class="img-post-profile col-12" v-if="!isVideo(post.images)"/>

        <VueVideoThumbnail 
        :video-src="post.images"
        show-play-button
        class="img-post-profile"
        :height="290"
        :width="277"
        :snapshot-at-duration-percent="10"
        :chunks-quantity="10"
        v-else
        >
        </VueVideoThumbnail>
    </div>

  </div>
</template>

<script>
import VueVideoThumbnail from 'vue-video-thumbnail'


export default {
  components: {
    VueVideoThumbnail
  },
  data() {
    return {};
  },
  props: {
    posts_user: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    console.log(this.posts_user, 'this is publications');
  },
  methods: {
    isVideo(src) {
      if (src.split('.')[3] === 'mp4')
        return true
    }
  }
};
</script>

<style>
.img-post-profile {
    height: 290px;
    object-fit: cover;
}
</style>