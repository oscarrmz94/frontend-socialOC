<template>
  <div class="col-12 mx-auto">
    <div v-for="(post, index) in publications" :key="index">
      <b-card
        :img-alt="`Image-${post.caption}`"
        class="card-body text-white mb-5"
      >
        <div class="d-flex justify-content-between align-items-center p-3">
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
        <div class="p-2">
          <div class="d-flex">
            <b-icon class="icon icon-heart-post-fill" icon="heart-fill" @click="toggleFavorite(post)" v-if="post.like_post"/>
            <b-icon class="icon" icon="heart" @click="toggleFavorite(post)" v-else/>
            <b-icon class="icon" icon="chat" @click="showModalDetail(post)"/>
            <b-icon class="icon" icon="bookmark"/>
          </div>

          <b-card-text class="m-2">
            {{ (post.caption !== 'null') ? post.caption : '' }}
          </b-card-text>
          <div>
            <small class="text-white">{{utils.timePassedFormat(new Date(post.created_at))}}</small>
          </div>
        </div>
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

    <b-modal 
      v-model="show_modal"
      size="lg" 
      centered 
      hide-header 
      hide-footer       
      content-class="modal-actions-content"
    >
      <detail-view :post="post_selected" :is_modal="true" @delete_post="deletePost" :focus_on_input="true"/>
    </b-modal>
  </div>
</template>

<script>
import utils from "@/libs/utils";
import mainServices from "@/services/main";
import Slider from '@/views/home/Slider.vue';
import Modal from '@/components/modal/Modal.vue';
import detailView from '@/components/detail/detailView.vue';

export default {
  components: {
    Slider,
    Modal,
    detailView
  },
  data() {
    return {
      utils,
      show_actions: false,
      post: {},
      changed_modal_actions: false,
      show_modal: false,
      post_selected: {}
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
    showModalDetail(post) {
      this.show_modal = true; 
      this.post_selected = {...post};
      this.post_selected.images = this.post_selected.images.split(',');
    },
    deletePost() {
      this.show_actions = false;
      this.changed_modal_actions = !this.changed_modal_actions;
      this.$dialog
        .confirm("Are you sure that You want to delete this post ?")
        .then(() => {
          mainServices.deletePost(this.post.uuid, this.user_uuid).then(() => {
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
      post.like_post.like_post = !post.like_post.like_post;
      const obj = {
        uuid: post.like_post.uuid,
        post_uuid: post.uuid,
        type_like: 'post',
      }
      mainServices.likePost(obj).then((response) => {
        if (response.like) post.like_post.uuid = response.like.uuid;
        else post.like_post.uuid = null;
      })
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
  background-color: #444;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;;
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