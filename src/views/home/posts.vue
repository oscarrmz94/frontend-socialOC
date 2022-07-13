<template>
  <div class="col-9 mx-auto">

    <b-card 
      border-variant="warning"
      :img-src="post.images" 
      :img-alt="`Image-${post.caption}`" 
      img-top 
      class="card-body bg-dark text-white mb-5" 
      v-for="(post, index) in publications" :key="index">
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
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    publications: {
      type: Array,
      required: true
    }
  },

  created() {
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


</style>