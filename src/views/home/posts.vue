<template>
  <div class="col-12 col-md-10 col-lg-8 mx-auto">

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
              @click="show_actions_method(post)"
            />
          </div>
        </div>
        <Slider :data="getImages(post.images)" :post_uuid="post.uuid"/>

        <div class="d-flex">
          <b-icon class="icon icon-heart-post-fill" icon="heart-fill" @click="toggleFavorite(post)" v-if="post.you_like_post"/>
          <b-icon class="icon" icon="heart" @click="toggleFavorite(post)" v-else/>
          <b-icon class="icon" icon="chat"/>
          <b-icon class="icon" icon="envelope"/>
          <b-icon class="icon" icon="bookmark"/>
        </div>
        <b-card-text class="m-2">
          {{ (post.caption !== 'null') ? post.caption : '' }}
        </b-card-text>
        <template #footer>
          <small class="text-muted">{{utils.timePassedFormat(new Date(post.created_at))}}</small>
        </template>
      </b-card>
    </div>

    <modal :show_modal="show_actions" :key="changed_modal_actions">
      <template #body>
        <div class="h5 button-modal first m-0" @click="deletePost()" v-if="user_uuid === post.user_uuid">Delete</div>
        <div :class="`h5 button-modal m-0 ${user_uuid !== post.user_uuid ? 'first' : ''}`">Unfollow</div>
        <div class="h5 button-modal m-0">Go to post</div>
        <div class="h5 button-modal m-0">Share to</div>
        <div class="h5 button-modal m-0">Copy link</div>
        <div 
         class="h5 button-modal last m-0"
         @click="show_actions = false; changed_modal_actions = !changed_modal_actions"
        >Cancel</div>
      </template>
    </modal>
  </div>
</template>

<script>
import utils from "@/libs/utils";
import mainServices from "@/services/main";
import Slider from '@/views/home/Slider.vue';
import Modal from '@/components/modal/Modal.vue';

export default {
  components: {
    Slider,
    Modal
  },
  data() {
    return {
      utils,
      show_actions: false,
      post: {},
      changed_modal_actions: false,
    };
  },
  props: {
    publications: {
      type: Array,
      required: true,
    },
    user_uuid: {
      type: String,
      required: true
    }
  },
  methods: {
    deletePost() {
      this.show_actions = false;
      this.changed_modal_actions = !this.changed_modal_actions;
      this.$dialog
        .confirm("Are you sure that You want to delete this post ?")
        .then(() => {
          mainServices.deletePost(this.post.uuid).then(() => {
            this.$emit(
              "update_publications",
              this.publications.filter((item) => item.uuid !== this.post.uuid)
            );
            this.post = {};
            this.$vToastify.success({
              position: 'top-right',
              title: 'Deleted',
              body: 'The post has been deleted successfully',
              hideProgressbar: true,
              successDuration: 3000,
            });
          });
        })
        .catch(() => {
          // This will be triggered when user clicks on cancel
        });
    },
    show_actions_method(post) {
      this.show_actions = true;
      this.changed_modal_actions = !this.changed_modal_actions;
      this.post = post;
    },
    getImages(images) {
       return images.split(',')
    },
    toggleFavorite(post) {
      post.you_like_post = !post.you_like_post;
      const obj = {
        user_uuid: this.user_uuid,
        post_uuid: post.uuid,
        type_like: 'post',
      }
      mainServices.like(obj).then(() => {})
    }
  }
};
</script>

<style>
.icon {
  margin: 5px;
  font-size: 18px;
}
.icon:hover {
  cursor: pointer;
  color: orange;
}
.icon-heart-post-fill {
  color: orange
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