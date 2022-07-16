<template>
  <div>
    <b-row>
      <b-col class="col-8">
        <posts :publications="publications"/>
      </b-col>

      <b-col class="col-4">
        <list-friends :not_following="not_following" :user_uuid="user.uuid"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import listFriends from "@/views/home/listFriends.vue";
import posts from "@/views/home/posts.vue";
import mainServices from '@/services/main';
import utils from "@/libs/utils";

export default {
  components: {
    listFriends,
    posts,
  },
  data() {
    return {
      publications: [],
      not_following: [],
      user: {},
    }
  },
  created() {
    this.getMainData();
  },
  methods: {
    getMainData() {
      this.user = utils.getUserData();    

      mainServices.getFollowersPosts(this.user.uuid).then((response) => {
        this.publications = response.new_rows;
      });

      mainServices.getNotFollowing(this.user.uuid).then((response) => {
        this.not_following = response.not_following;
      });
    }
  }
};
</script>
