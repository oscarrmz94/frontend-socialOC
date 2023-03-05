<template>
  <div class="text-white">
    <b-row class="mb-5">
      <b-col class="col-12 col-lg-8 mx-auto d-flex justify-content-around flex-wrap">
        <b-col class="col-3 position-relative">
          <b-spinner class="spinner-loading-profile-image" v-if="loading_profile_picture"></b-spinner>
          <b-button @click="modal_upload = true; changed_modal_upload = !changed_modal_upload" variant="button-light-avatar" class="button-light-avatar" v-if="own_user_uuid === user.uuid">
            <b-avatar class="avatar-profile cursor-pointer p-1" :src="user.profile_image"></b-avatar>
          </b-button>
          <b-avatar class="avatar-profile p-1" :src="user.profile_image" v-else></b-avatar>
        </b-col>

        <b-col class="col-7 mb-3">
          <b-row>

            <b-col class="col-12 d-flex justify-content-between align-items-center flex-wrap mb-4">
              <div>
                <h4 class="d-block">{{user.name}}</h4>
                <span class="text-muted d-block col-12">@{{user.nickname}}</span>
              </div>
              <b-button class="ml-2 d-block" v-if="own_user_uuid === user.uuid" @click="$router.push({name: 'EditProfile'})">Edit Profile</b-button>
              <div variant="outline-light" v-if="own_user_uuid !== user.uuid">
                <b-button v-if="!user.you_follow" @click="followAction">
                  <b-spinner v-if="spinner_follow"/>
                  <div class="d-block">
                    <span>Follow</span>
                  </div>
                </b-button>
                <b-button v-else @click="unfollowAction">
                  <div class="d-block">
                    <span><b-icon class="icon" icon="person-check"/></span>
                  </div>
                </b-button>
              </div>
            </b-col>

            <b-col class="col-12 order-first unordered d-flex justify-content-between my-4">
              <span><strong>{{user.number_post}}</strong> post</span>
              <span class="span-followers" @click="(user.followers > 0) ? getFollowers(user.uuid) : ''"><strong>{{user.followers}}</strong> Followers</span>
              <span class="span-followers" @click="(user.following > 0) ? getFollowing(user.uuid) : ''"><strong>{{user.following}}</strong> Following</span>
            </b-col>

          </b-row>

        </b-col>
        <b-col class="col-12">{{user.about}}</b-col>
      </b-col>
    </b-row>

    <list-friends-modal 
      :followers="followers"
      :open_modal="open_modal_followers"
      @update_followers="updateFollowers"
      :key="update_modal"
    />

    <b-row>
      <b-col class="col-12 mt-5 mx-auto">
        <post-profile :posts_user_dad="posts_user" :tagged_post="tagged_post" v-if="loaded"/>
      </b-col>
    </b-row>


    <b-form-file
      accept=".jpg, .png, .jpeg"
      v-model="file_profile"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      ref="file_input"
      class="d-none"
      @change="uploadProfilePicture()"
    ></b-form-file>

    <modal :show_modal="modal_upload" :key="changed_modal_upload">
      <template #body>
        <div class="h5 button-modal first m-0" @click="openFormFile">Upload image</div>
        <div class="h5 button-modal m-0" v-if="user.profile_image !== null" @click="deleteProfileImage">Remove profile image</div>
        <div class="h5 button-modal last m-0" @click="modal_upload = !modal_upload; changed_modal_upload = !changed_modal_upload">Cancel</div>
      </template>
    </modal>
  </div>
</template>

<script>
import mainServices from '@/services/main'
import postProfile from './profile/PostProfile.vue'
import ListFriendsModal from '@/components/modal/listFriendsModal.vue'
import Modal from '@/components/modal/Modal.vue';
import utils from '@/libs/utils';

export default {
  components: {
    postProfile,
    ListFriendsModal,
    Modal,
},
  data() {
    return {
      user: {},
      posts_user: [],
      own_user_uuid: utils.getUserData().uuid,
      open_modal_followers: false,
      followers: [],
      tagged_post: [],
      spinner_follow: false,
      modal_upload: false,
      file_profile: null,
      changed_modal_upload: false,
      update_modal: 1,
      loaded: false,
      loading_profile_picture: false,
    }
  },

  created() {
    this.getDataUser(this.$route.params.uuid);
  },

  methods: {
    openFormFile() {
      this.$refs['file_input'].$refs['input'].click();
    },
    uploadProfilePicture() {
      this.loading_profile_picture = true;
      this.modal_upload = false;
      this.changed_modal_upload = !this.changed_modal_upload;
      setTimeout(() => {
        if (this.file_profile !== null) {
          const form = new FormData();
          form.append('picture', this.file_profile);
          mainServices.uploadProfilePicture(form).then((response) => {
            this.user.profile_image = response.profile_image;
            this.loading_profile_picture = false;
          });
        }
      }, 200);
    },
    deleteProfileImage() {
      mainServices.deleteProfilePicture().then((response) => {
        this.modal_upload = false;
        this.changed_modal_upload = !this.changed_modal_upload;
        this.user.profile_image = response.profile_image;
      })
    },
    getDataUser(uuid) {
      mainServices.getUser(uuid).then((response) => {
        this.user = response.user;
        this.posts_user = response.user.posts;
        this.loaded = true;
        this.getTaggedPosts();
      })
    },
    getTaggedPosts() {

      mainServices.getTaggedPosts(this.user.uuid).then((response) => {
        this.tagged_post = response.rows;
      });
    },
    updateFollowers(data) {
      this.user.following += data
    },
    getFollowers(uuid) {
      this.open_modal_followers = true;
      mainServices.getFollowersList(uuid).then((response) => {
        this.followers = [];
        this.followers = response.followers_list;
      });
      this.update_modal += 1;
    },
    getFollowing(uuid) {
      this.open_modal_followers = true;
      mainServices.getFollowingList(uuid).then((response) => {
        this.followers = [];
        this.followers = response.following_list;
      });
      this.update_modal += 1;
    },
    followAction() {
      this.spinner_follow = true;
      const data = {
        user_followed_uuid: this.user.uuid
      };
      mainServices.follow(data).then(() => {
        setTimeout(() => {
          this.spinner_follow = false;
        }, 500);
        this.user.you_follow = true;
      });
    },
    unfollowAction() {
      this.$dialog
        .confirm(`Are you sure that You want to unfollow @${this.user.nickname}`)
        .then(() => {      
            const data = {
              user_followed_uuid: this.user.uuid
            };
            this.spinner_follow = true;
            mainServices.follow(data).then(() => {
              setTimeout(() => {
                this.spinner_follow = false;
              }, 500);
              this.user.you_follow = false;
            })
        });
    }
  },
  watch: {
    $route(new_value) {
      this.getDataUser(new_value.params.uuid)
    }
  }
}
</script>

<style>
.spinner-loading-profile-image {
  height: 65px;
  width: 65px;
  color: white;
  position: absolute;
  z-index: 100;
  top: 3em;
  left: 3em;
}
.avatar-profile {
    background-color: #444;
    width: 10em;
    height: 10em;
}
.span-followers:hover {
  cursor: pointer;
  text-decoration: underline;
}

@media(max-width: 576px) {
  .avatar-profile {
    width: 5em;
    height: 5em;
  } 
}
.modal-actions-body {
  padding: 0px !important;
  border-radius: 50px !important;
}
.modal-actions-content {
  background-color: transparent !important;
}
.button-light-avatar {
  border-radius: 100%;
  padding: 0;
  border: 0;
}
.button-light-avatar:active {
  outline:none
}
.button-light-avatar:focus {
  outline: none;
  border: 0;
}
</style>