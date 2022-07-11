<template>
  <div>
    <b-row>
      <b-col class="col-8">
        <posts :publications="publications"/>
      </b-col>

      <b-col class="col-4">
        <list-friends :not_following="not_following" :user_uuid="user_uuid"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import listFriends from "@/views/home/listFriends.vue";
import posts from "@/views/home/posts.vue";
import mainServices from '@/services/main';

export default {
  components: {
    listFriends,
    posts,
  },
  data() {
    return {
      publications: [],
      not_following: [],
      user_uuid: '',
    }
  },
  beforeCreate() {

    mainServices.dashboard().then((user_token) => {
      this.user_uuid = user_token.uuid;
      mainServices.getFollowersPosts(user_token.uuid).then((response) => {
        this.publications = response.new_rows;
      });

      mainServices.getNotFollowing(user_token.uuid).then((response) => {
        this.not_following = response.not_following;
      });
    })
  },
};
</script>
