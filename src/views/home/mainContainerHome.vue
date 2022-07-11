<template>
  <div>
    <b-row>
      <b-col class="col-9">
        <posts :publications="publications"/>
      </b-col>

      <b-col class="col-3">
        <list-friends />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import listFriends from "@/views/home/listFriends.vue";
import posts from "@/views/home/posts.vue";
import mainServices from '@/services/main';
// import {  } from "vuex";

export default {
  components: {
    listFriends,
    posts,
  },
  data() {
    return {
      publications: []
    }
  },
  beforeCreate() {

    mainServices.dashboard().then((user_token) => {
      mainServices.getFollowersPosts(user_token.uuid).then((response) => {
        this.publications = response.new_rows;
      })      

      
    })
  },
};
</script>
