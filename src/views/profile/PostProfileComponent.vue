<template>
  <div class="col-12 mx-auto my-4 d-flex flex-wrap">
    <div v-for="(post, index) in posts_user" :key="index" class="col-4">
       <b-img :src="getOneImage(post.images)" class="img-post-profile col-12 p-1" v-if="!utils.isVideo(post.images)"/>
       

        <VueVideoThumbnail 
        :video-src="getOneImage(post.images)"
        show-play-button
        class="img-post-profile"
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
  methods: {
    getOneImage(images) {
      return images.split(',')[0]
    }
  },
  mounted() {
  },
};
</script>

<style>
.img-post-profile{
    width: 100% !important;
    height: 290px;
    object-fit: cover;
}
.snapshot-generator img {
  width: 100%;
  height: 285px;
}

@media(max-width: 576px) {
  .img-post-profile {
    height: 150px;
    object-fit: cover;
  }
}

</style>