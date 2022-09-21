<template>
  <div class="text-white">
    <b-row class="mb-5">
      <b-col class="col-12 col-lg-8 mx-auto d-flex justify-content-around flex-wrap">
        <b-col class="col-3">
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

    <b-modal v-model="show_modal" scrollable size="sm" hide-footer hide-header>
      <list-friends-modal :followers="followers" v-on:close_modal="show_modal = false" v-on:update_followers="updateFollowers"/>
    </b-modal>

    <b-row>
      <b-col class="col-12 mt-5 mx-auto">
        <post-profile :posts_user="posts_user" :tagged_post="tagged_post"/>
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
import ListFriendsModal from './profile/listFriendsModal.vue'
import utils from '../libs/utils';
import Modal from '@/components/modal/Modal.vue';

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
      own_user_uuid: '',
      show_modal: false,
      followers: [],
      tagged_post: [],
      spinner_follow: false,
      modal_upload: false,
      file_profile: null,
      changed_modal_upload: false,
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
      setTimeout(() => {
        if (this.file_profile !== null) {
          const form = new FormData();
          form.append('picture', this.file_profile);
          form.append('user_uuid', this.user.uuid);

          mainServices.uploadProfilePicture(form).then((response) => {
            this.modal_upload = false;
            this.changed_modal_upload = !this.changed_modal_upload;
            this.user.profile_image = response.profile_image;
          });
        }
      }, 200);
    },
    deleteProfileImage() {
      const obj = {
        user_uuid: this.user.uuid,
      }
      mainServices.deleteProfilePicture(obj).then((response) => {
        this.modal_upload = false;
        this.changed_modal_upload = !this.changed_modal_upload;
        this.user.profile_image = response.profile_image;
      })
    },
    getDataUser(uuid) {
      this.own_user_uuid = utils.getUserData().uuid;
      const data = {
        own_user_uuid: this.own_user_uuid,
        uuid: uuid
      }
      mainServices.getUser(data).then((response) => {
        this.user = response.user;
        this.posts_user = response.user.posts
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
      console.log(data)
    },
    getFollowers(uuid) {
      this.show_modal = true;
      mainServices.getFollowersList(uuid).then((response) => {
        this.followers = [];
        this.followers = response.followers_list;
      })
    },
    getFollowing(uuid) {
      this.show_modal = true;
      mainServices.getFollowingList(uuid).then((response) => {
        this.followers = [];
        this.followers = response.following_list;
      })
    },
    followAction() {
      this.spinner_follow = true;
      const data = {
        user_follower_uuid: this.own_user_uuid,
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
              user_follower_uuid: this.own_user_uuid,
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
</style>