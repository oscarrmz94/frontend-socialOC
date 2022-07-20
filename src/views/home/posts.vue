<template>
  <div class="col-8 mx-auto">
    <div v-for="(post, index) in publications" :key="index">
      <b-card
        border-variant="warning"
        :img-alt="`Image-${post.caption}`"
        class="card-body bg-dark text-white mb-5"
      >
        <div class="d-flex justify-content-between align-items-center p-2">
          <div>
            <b-avatar
              class="b-avatar-list me-2"
              :src="post.user_profile_image ? post.user_profile_image : ''"
            />
            <router-link
              :to="{ name: 'Profile', params: { uuid: post.user_uuid } }"
              class="text-white text-decoration-none router-link"
            >
              <span>{{ post.user_name }}</span>
            </router-link>
          </div>
          <div>
            <b-icon
              icon="three-dots-vertical"
              class="dots"
              @click="show_actions_method(post.uuid)"
            />
          </div>
        </div>
        <!-- <b-img
          :src="post.images"
          v-if="!utils.isVideo(post.images)"
          class="col-12"
        />
        <video
          v-else
          :src="post.images"
          autoplay
          muted
          controls
          class="video-main-post"
        /> -->
        <b-carousel
          img-width="1024"
          img-height="480"
          controls
          
          class="mb-5"
        >
          <b-carousel-slide
            v-if="!utils.isVideo(post.images)"
            :img-src="post.images"
          />

          <b-carousel-slide v-else> 
            hello
            <video
              :src="post.images"
              autoplay
              muted
              controls
              class="video-main-post"
            /> 
          </b-carousel-slide>
        </b-carousel>
        <!-- <div class="d-flex">
          <b-icon class="icon" icon="heart" />
          <b-icon class="icon" icon="chat" />
          <b-icon class="icon" icon="envelope" />
          <b-icon class="icon" icon="bookmark" />
        </div> -->
        <b-card-text class="m-2">
          {{ post.caption }}
        </b-card-text>
        <template #footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>
    </div>

    <b-modal
      v-model="show_actions"
      centered
      hide-footer
      hide-header
      body-class="modal-actions-body"
      class="modal-actions"
      size="sm"
      content-class="modal-actions-content"
    >
      <div class="h5 button-modal first m-0" @click="deletePost()">Delete</div>
      <div class="h5 button-modal m-0">Unfollow</div>
      <div class="h5 button-modal m-0">Go to post</div>
      <div class="h5 button-modal m-0">Share to</div>
      <div class="h5 button-modal m-0">Copy link</div>
      <div class="h5 button-modal last m-0">Cancel</div>
    </b-modal>
  </div>
</template>

<script>
import utils from "@/libs/utils";
import mainServices from "@/services/main";

export default {
  components: {},
  data() {
    return {
      utils,
      show_actions: false,
      uuid_post: "",
    };
  },
  props: {
    publications: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deletePost() {
      this.show_actions = false;

      this.$dialog
        .confirm("Are you sure that You want to delete this post ?")
        .then(() => {
          mainServices.deletePost(this.uuid_post).then(() => {
            this.$emit(
              "update_publications",
              this.publications.filter((item) => item.uuid !== this.uuid_post)
            );
            this.uuid_post = "";
            this.$bvToast.toast("The post has been deleted successfully", {
              title: "Post deleted",
              variant: "success",
              solid: true,
              auto_hide_delay: 1000,
            });
          });
        })
        .catch(() => {
          // This will be triggered when user clicks on cancel
        });
    },
    show_actions_method(uuid) {
      this.show_actions = true;
      this.uuid_post = uuid;
    },
  },
  created() {
    console.log(this.publications, "hse");
  },
};
</script>

<style>
.icon {
  margin: 5px;
  font-size: 18px;
}
.icon:hover {
  color: orange;
}
.card-body {
  padding: 0%;
}
.video-main-post {
  width: 100%;
  height: 400px;
}
.dropdown-points .btn-link,
.dropdown-points a {
  color: white;
}
.dots:hover {
  cursor: pointer;
}
.button-modal {
  text-align: center;
  background-color: gray;
  height: auto;
  color: white;
  padding: 1em;
}
.first {
  border-top-left-radius: 25px !important;
  border-top-right-radius: 25px !important;
}
.last {
  border-bottom-left-radius: 25px !important;
  border-bottom-right-radius: 25px !important;
}
.button-modal:hover {
  background-color: orange;
  cursor: pointer;
}
.first:hover {
  background: red !important;
}
.modal-actions {
  bottom: 10em;
}
.modal-actions-body {
  padding: 0px !important;
  border-radius: 50px !important;
}
.modal-actions-content {
  background-color: transparent !important;
}
</style>