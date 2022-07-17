<template>
  <div class="col-9 mx-auto">
    <div v-for="(post, index) in publications" :key="index">
      <b-card 
        v-if="!utils.isVideo(post.images)"
        border-variant="warning"
        :img-src="post.images" 
        :img-alt="`Image-${post.caption}`" 
        img-top 
        class="card-body bg-dark text-white mb-5" >
          <div class="d-flex">
            <b-icon class="icon" icon="heart"/>
            <b-icon  class="icon" icon="chat"/>
            <b-icon  class="icon" icon="envelope"/>
            <b-icon class="icon" icon="bookmark"/>
          </div> 
        <b-card-text class="m-2">
          {{post.caption}}

        </b-card-text>
        <template #footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>

      <b-card 
        v-else
        border-variant="warning"
        class="card-body bg-dark text-white mb-5" >
         <video
          :src="post.images"
          autoplay
          muted
          controls
          class="video-main-post"
        >Un canvas aqui</video>

        <div class="d-flex">
          <b-icon class="icon" icon="heart"/>
          <b-icon  class="icon" icon="chat"/>
          <b-icon  class="icon" icon="envelope"/>
          <b-icon class="icon" icon="bookmark"/>
        </div> 
        <b-card-text class="m-2">
          {{post.caption}}

        </b-card-text>
        <template #footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>
    
    </div>

  </div>
</template>

<script>
import utils from '@/libs/utils'

export default {
  components: {
    
  },
  data() {
    return {
      utils
    }
  },
  props: {
    publications: {
      type: Array,
      required: true
    }
  },

  created() {
    console.log(this.publications)
  }
}
</script>

<style>
.icon{
  margin:5px;
  font-size: 18px;
}
.icon:hover{
  color: orange;
}
.card-body{
  padding: 0%;
}
.video-main-post {
  width: 100%;
  height: 400px;
}

</style>