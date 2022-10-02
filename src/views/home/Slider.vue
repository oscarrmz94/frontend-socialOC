<template>
  <div class="d-flex flex-wrap justify-content-center">
    <div class="d-flex my-slider">
      <div v-for="(item, index) in data" :key="index" class="col-12">
        <b-img :src="item" :class="`img img-${post_uuid}`" v-if="!utils.isVideo(item)"/>
        <video :src="item" v-else :class="`img img-${post_uuid} video`" autoplay muted controls/>
      </div>
    </div>

    <div class="controls d-flex justify-content-center align-items-center" v-if="data.length > 1" ref="dots-control">
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
      default: () => {
        return []
      }
    },
    post_uuid: {
      type: String,
      default: ''
    }
  },
  created() {
    if (this.data.length > 1) {
      setTimeout(() => {
        this.$refs['dots-control'].children[0].classList.add('dot-orange');
      }, 200);  
    }
  },
  methods: {
    changeImg(index) {
      const images = document.getElementsByClassName(`img-${this.post_uuid}`);
      for(let i = 0; i < images.length; i++) {
        images[i].style.setProperty('transform', `translateX(${-(index * 100)}%)`)
      }


      for (let item of this.$refs['dots-control'].children) {
        item.classList.remove('dot-orange');
      }
      this.$refs['dots-control'].children[index].classList.add('dot-orange');
    },

  }
}
</script>

<style>
.my-slider {
  width: 100%;
  overflow-x: hidden;
  background-color: #444;
  height: 500px;
}
.my-slider .img {
  width: 100%;
}
.video {
  height: 100%;
}
.controls {
  width: 25%;
  left: 0;
  height: 15px;
  margin-top: -25px;
  z-index: 100;
  bottom: 0;
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
  height: 550px;
  object-fit: cover;
}
.dot-orange {
  background-color: orange !important;
}
</style>