<template>
  <div>
    <div class="d-flex my-slider">
      <div v-for="(item, index) in data" :key="index" class="col-12">
        <b-img :src="item" :class="`img img-${post_uuid}`" v-if="!utils.isVideo(item)"/>
        <video :src="item" v-else :class="`img img-${post_uuid} video`" autoplay muted controls/>
      </div>
    </div>

    <div class="controls d-flex justify-content-center align-items-center" v-if="data.length > 1">
      <div class="dot" @click="changeImg(index)" v-for="(item, index) in data.length" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/libs/utils';

export default {
  data() {
    return {
     utils,
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    post_uuid: {
      type: String,
      required: true
    }
  },
  methods: {
    changeImg(index) {
      const images = document.getElementsByClassName(`img-${this.post_uuid}`);
      for(let i = 0; i < images.length; i++) {
        images[i].style.setProperty('transform', `translateX(${-(index * 100)}%)`)
      }
    },

  }
}
</script>

<style>
.my-slider {
  width: 100%;
  overflow-x: hidden;
}
.my-slider .img {
  width: 100%;
}
.video {
  height: 100%;
}
.controls {
  width: 25%;
  left: 38%;
  height: 15px;
  position: absolute;
  margin-top: 5px;
}
.dot {
  margin: 0 2px 0 2px;
  width: 10px;
  height: 10px;
  border-radius: 360px;
  background-color: white;
}
.dot:hover {
  cursor: pointer;
}
.img {
  transition: all 400ms;
  height: 400px;
  object-fit: cover;
}
</style>