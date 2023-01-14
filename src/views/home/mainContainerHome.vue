<template>
  <div>
    <b-row>
      <b-col class="col-12 col-md-8 col-lg-7 px-3">
        <b-button class="mb-5" variant="success" @click="showModal()">
          <b-icon icon="plus" />
          Upload post
        </b-button>

        <posts :publications="publications" v-on:update_publications="updatePost" :user_uuid="user.uuid"/>
      </b-col>

      <b-col class="col-12 order-first order-md-last col-md-4">
        <list-friends :not_following="not_following"/>
      </b-col>
    </b-row>

    <b-modal title="Upload Post" v-model="show_modal" centered hide-footer>
      <div v-if="!fill_caption">
        <UploadMedias @changed="handleMedias" :acceptVideo="true"> </UploadMedias>
        <b-button variant="success" class="float-end mt-4" v-if="files_upload.length >= 1" @click="fill_caption = true">
          Next
          <b-icon icon="arrow-right-short" />
        </b-button>
      </div>

      <div v-if="fill_caption"> 
        <b-form-textarea
          id="textarea"
          v-model="caption"
          placeholder="Write a caption ..."
          rows="3"
          max-rows="6"
          :disabled="(!skeleton_loading) ? false : true"
        ></b-form-textarea>
          <b-button variant="success" class="float-end mt-4" v-if="files_upload.length >= 1" @click="uploadPost()">
            <div v-if="!skeleton_loading">
              Share
              <b-icon icon="arrow-bar-up" />
            </div>
            <div v-else>
              <b-spinner class="spinner-upload-post"></b-spinner>
              Uploading
            </div>
        </b-button>
      </div>
    </b-modal>

    <b-skeleton animation="wave" width="100%" class="skeleton-loading" v-if="skeleton_loading"></b-skeleton>
  </div>
</template>

<script>
import listFriends from "@/views/home/listFriends.vue";
import posts from "@/views/home/posts.vue";
import mainServices from '@/services/main';
import utils from "@/libs/utils";
import UploadMedias from "vue-upload-drop-medias";

export default {
  components: {
    listFriends,
    posts,
    UploadMedias,
  },
  data() {
    return {
      publications: [],
      not_following: [],
      user: {},
      show_modal: false,
      files_upload: [],
      fill_caption: false,
      caption: null,
      skeleton_loading: false,
    }
  },
  created() {
    this.getMainData();
  },
  methods: {
    getMainData() {
      this.user = utils.getUserData(); 
      mainServices.getFollowersPosts().then((response) => {
        this.publications = response.new_rows;
      });

      mainServices.getNotFollowing().then((response) => {
        this.not_following = response.not_following;
      });
    },
    showModal() {
      this.fill_caption = false;
      this.show_modal = true;
    },
    handleMedias(files) {
      this.files_upload = files;
    },
    uploadPost() {
      this.skeleton_loading = true;
      const data = new FormData()

      this.files_upload.forEach((item) => {
        data.append('images', item);
      })
      data.append('user_uuid', this.user.uuid);
      data.append('caption', this.caption);
      mainServices.uploadPost(data).then((response) => {
        this.publications.splice(0, 0, response.new_post)
            this.$vToastify.success({
              position: 'top-right',
              title: 'Uploaded',
              body: 'The post has been uploaded in feed',
              hideProgressbar: true,
              successDuration: 3000,
            });
        this.skeleton_loading = false;
        this.show_modal = false;
      })
    },
    updatePost(data) {
      this.publications = data;
    }
  }
};
</script>
<style>
.skeleton-loading {
  background-color: #444;
  position: fixed;
  bottom: 0;
  left: 0;
  margin-bottom: 0;
}
.spinner-upload-post {
  height: 20px;
  width: 20px;
}
</style>
