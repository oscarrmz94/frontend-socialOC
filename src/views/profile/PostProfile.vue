<template>
  <div class="text-white">
    <b-tabs content-class="main-tabs" align="center" class="col-12">      
      <b-tab title="Posts">
        <h3 class="text-center mt-5" v-if="posts_user.length === 0">There is no posts yet</h3>
        <post-component :posts_user="posts_user"/>
      </b-tab>
      <b-tab title="Videos"><p>I'm the second tab</p></b-tab>
      <b-tab title="Tagged" ><p>I'm a disabled tab!</p></b-tab>
    </b-tabs>

    
  </div>
</template>

<script>
//import mainServices from '@/services/main'
import postComponent from './PostProfileComponent.vue'

export default {
  components: {
    postComponent
  },
  props: {
    posts_user: {
      type: Array,
      required: true
    }
  },

  mounted() {
  },

  methods: {
    getDataUser() {

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