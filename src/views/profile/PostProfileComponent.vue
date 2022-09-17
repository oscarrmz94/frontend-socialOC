<template>
  <div class="col-12 mx-auto my-4 d-flex flex-wrap">
    <div v-for="(post, index) in posts_user" :key="index" class="col-4 container-post" @click="openDetail(post.uuid)">
       <b-img :src="svg_carousel" class="svg-type-content" v-if="isMoreThanOne(post.images).length > 1"/>
       <b-img :src="svg_video" class="svg-type-content" v-if="utils.isVideo(post.images)"/>
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
      utils,
      svg_carousel: require('@/assets/styles/carousel.svg'),
      svg_video: require('@/assets/styles/video.svg')
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
    },
    isMoreThanOne(images) {
      return images.split(',');
    },
    openDetail(post) {
      this.$emit('openDetail', post);
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
.svg-type-content {
  width: 25px;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 100;
}
.container-post {
  position: relative;
  cursor: pointer;
}

@media(max-width: 576px) {
  .img-post-profile {
    height: 150px;
    object-fit: cover;
    color: #ffffff
  }
}

</style>