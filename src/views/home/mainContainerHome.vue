<template>
  <div>
    <b-row>
      <b-col class="col-9">
        <posts />
      </b-col>

      <b-col class="col-3">
        <list-friends />
      </b-col>
    </b-row>
    <b-card
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-button href="#" variant="primary">HOME</b-button>
    </b-card>
  </div>
</template>

<script>
import listFriends from "@/views/home/listFriends.vue";
import posts from "@/views/home/posts.vue";

export default {
  components: {
    listFriends,
    posts,
  },
  created() {
    console.log('me he creado')
  }
};
</script>
