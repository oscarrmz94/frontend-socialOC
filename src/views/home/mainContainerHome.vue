<template>
  <div>
    <b-row>
      <b-col class="col-12 col-md-8">
        <b-button class="mb-5 ms-5" variant="success" @click="showModal()">
          <b-icon icon="plus" />
          Upload post
        </b-button>

        <posts :publications="publications" v-on:update_publications="updatePost" :user_uuid="user.uuid"/>
      </b-col>

      <b-col class="col-12 order-first order-md-last col-md-4">
        <list-friends :not_following="not_following" :user_uuid="user.uuid"/>
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
        ></b-form-textarea>
          <b-button variant="success" class="float-end mt-4" v-if="files_upload.length >= 1" @click="uploadPost()">
          Share
          <b-icon icon="arrow-bar-up" />
        </b-button>
      </div>

    </b-modal>
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
    UploadMedias
  },
  data() {
    return {
      publications: [],
      not_following: [],
      user: {},
      show_modal: false,
      files_upload: [],
      fill_caption: false,
      caption: null
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
    },
    showModal() {
      this.fill_caption = false;
      this.show_modal = true;
    },
    handleMedias(files) {
      this.files_upload = files;
      console.log(this.files_upload[0])

    },
    uploadPost() {
      const data = new FormData()

      this.files_upload.forEach((item) => {
        data.append('images', item);
      })
      data.append('user_uuid', this.user.uuid);
      data.append('caption', this.caption);

      mainServices.uploadPost(data).then(() => { 
        this.$bvToast.toast('The post has been uploaded', {
          title: 'Post uploaded',
          variant: 'success',
          solid: true,
          auto_hide_delay: 1000
        });
        this.show_modal = false;
      })
    },
    updatePost(data) {
      this.publications = data;
    }
  }
};
</script>
