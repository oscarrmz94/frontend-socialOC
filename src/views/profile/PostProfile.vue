<template>
  <div class="text-white">
    <b-tabs content-class="main-tabs" align="center" class="col-12">      
      <b-tab title="Posts"><p>I'm the second tab</p></b-tab>
      <b-tab title="Videos"><p>I'm the second tab</p></b-tab>
      <b-tab title="Tagged" ><p>I'm a disabled tab!</p></b-tab>
    </b-tabs>

    
  </div>
</template>

<script>
//import mainServices from '@/services/main'

export default {
  props: {
    posts_user: {
      type: Array,
      required: true
    }
  },

  created() {
    console.log(this.posts_user)
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
</style>