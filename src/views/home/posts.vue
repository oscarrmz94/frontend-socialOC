<template>
  <div class="col-9 mx-auto">

    <b-card :img-src="post.images" :img-alt="`Image-${post.caption}`" img-top class="mb-5" v-for="(post, index) in publications" :key="index">
      <b-card-text>
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

</style>