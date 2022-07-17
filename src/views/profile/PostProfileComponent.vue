<template>
  <div class="col-12 mx-auto my-4 row gx-5">
    <div v-for="(post, index) in posts_user" :key="index" class="col-4 mb-5">
       <b-img :src="post.images" class="img-post-profile col-12" v-if="!utils.isVideo(post.images)"/>

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
import utils from '@/libs/utils';

export default {
  components: {
    VueVideoThumbnail
  },
  data() {
    return {
      utils
    };
  },
  props: {
    posts_user: {
      type: Array,
      required: true,
    },
  },

  mounted() {
  },
};
</script>

<style>
.img-post-profile {
    height: 290px;
    object-fit: cover;
}
</style>