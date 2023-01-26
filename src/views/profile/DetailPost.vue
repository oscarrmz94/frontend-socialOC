<template>
  <div>
    <loading :show="loading"/>
    <b-modal 
      v-model="show_modal"
      size="lg" 
      centered 
      hide-header 
      hide-footer       
      content-class="modal-actions-content"
      @change="changeAction"
    >
      <detail-view :post="post" :is_modal="is_modal" @delete_post="deletePost"/>
    </b-modal>
    <detail-view :post="post_detail" v-if="!is_modal && loaded" :is_modal="is_modal"/>
  </div>
</template>

<script>
import loading from "@/components/loader/loading.vue";
import detailView from "@/components/detail/detailView.vue";
import service from '@/services/main';

export default {
  name: "DetailPost",
  components: {
    loading,
    detailView
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    is_modal: {
      type: Boolean,
      default: false
    },
    post: {
      type: Object,
    },
  },
  data() {
    return {
      show_modal: this.show,
      loading: true,
      post_detail: null,
      loaded: false
    };
  },
  created() {
    setTimeout(() => {
      if (!this.is_modal) this.getPostData(this.$route.params.uuid)
      this.loading = false;
    }, 800);
  },
  methods: {
    deletePost(post_uuid) {
      this.show_modal = false;
      this.$emit('delete_posts', post_uuid);
    },
    changeAction() {
      history.pushState({ urlPath: "" }, "", `/profile/${this.post.user_uuid}`);
      this.$emit("closeModal");
    },
    getPostData(uuid) {
      service.getPost(uuid).then((response) => {
        this.post_detail = response;
        this.post_detail.images = this.getImages(this.post_detail.images);
        this.loaded = true;
      });
    },
    getImages(images) {
      return images.split(',');
    },
  },
};
</script>

<style>
.icon:hover {
  cursor: pointer;
  color: orange;
}
.icon {
  margin: 5px;
  font-size: 18px;
}
.icon-size-14 {
  font-size: 14px;
  position: absolute;
  right: 0.5em;
}
.icon-heart-post-fill {
  color: orange;
}
.modal-actions-content .modal-body {
  padding: 0;
}
.dots {
  cursor: pointer;
}
.main-detail-info {
  background-color: white;
}
.avatar-detail {
  padding: 0.15em;
  background-color: #ccc;
}
.h-15 {
  height: 15%;
}
.h-55 {
  height: 80%;
  max-height: 300px;
  overflow-y: scroll;
}
.h-20 {
  height: 20%;
}
.h-12 {
  height: 12%;
}
.icon-reactions {
  font-size: 22px;
  margin: 0 0.2em 0 0.2em;
  cursor: pointer;
}
.form-comment {
  border: none;
  margin: 0 0 0 0.4em;
  padding: 0.4em 0 0.4em 0.2em;
}
.form-comment:focus,
.form-comment:active {
  outline: transparent !important;
}
.button-blue {
  font-weight: bold;
  color: rgb(78, 149, 237);
}
.button-blue:hover {
  color: rgb(134, 179, 233);
}
.f14 {
  font-size: 14px !important;
}
.reply-comment-button {
  color: rgb(190, 190, 190);
}
.username-redirection:hover {
  text-decoration: underline;
  cursor: pointer;
}
.no-cursor-pointer {
  color: #ccc !important;
  cursor: auto !important;
}
.cursor-pointer {
  cursor: pointer !important;
}
.under-line-hover:hover {
  text-decoration: underline !important;
}
</style>