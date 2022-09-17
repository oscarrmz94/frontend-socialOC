<template>
    <b-modal 
      v-model="show_modal" 
      size="lg" 
      centered 
      hide-header 
      hide-footer       
      content-class="modal-actions-content"
      @change="changeAction"
    >
      <div class="d-flex">
        <div class="col-6">
          <b-img :src="post.images" class="w-100 heigth-detail"></b-img>
        </div>
        <div class="col-6 bg-white d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center p-2 border-bottom h-12">
            <div>
              <b-avatar :src="post.user_profile_image" class="avatar-detail" size="45"></b-avatar>
              <span class="ms-2 fw-bold">{{post.user_name}}</span>
            </div>
            <div>
              <b-icon
                icon="three-dots-vertical"
                class="dots cursor-pointer"
              />
            </div>
          </div>
          <div class="h-55 p-2 border-bottom">
            <div v-if="post.caption !== 'null'" class="d-flex">
              <b-avatar :src="post.user_profile_image" class="avatar-detail me-2" size="45"></b-avatar>
              <div>
                <span class="fw-bold">{{post.user_name}}</span>
                <span class="ms-2">{{post.caption}}</span>
                <span class="d-block text-muted">{{utils.timePassedFormat(new Date(post.created_at))}}</span>
              </div>
            </div>
            <div v-else class="d-flex flex-column justify-content-center h-100">
                <h3 class="text-center">There is no comments yet</h3>
            </div>
          </div>
          <div class="h-15 border-bottom p-2">
            <div class="d-flex justify-content-between  ">
              <div>
                <b-icon icon="heart" class="icon-reactions"></b-icon>
                <b-icon icon="chat" class="icon-reactions"></b-icon>
                <b-icon icon="cursor" class="icon-reactions text-muted"></b-icon>
              </div>
              <div>
                <b-icon icon="bookmark" class="icon-reactions"></b-icon>
              </div>
            </div>
            <div class="mt-1 d-flex">
              <b-avatar-group size="25px">
                <b-avatar src="https://placekitten.com/300/300" variant="info"></b-avatar>
                <b-avatar src="https://placekitten.com/320/330" variant="dark"></b-avatar>
                <b-avatar src="https://placekitten.com/320/320" variant="dark"></b-avatar>
              </b-avatar-group>

              <span class="ms-2">Liked by <strong>guy123</strong> and <strong>others</strong></span>
            </div>
          </div>
          <div class="h-15 p-2 d-flex align-items-center">
            <b-icon icon="emoji-smile" class="icon-reactions" @click="open_emojis = !open_emojis" />
            <b-form-input placeholder="Write a comment" class="form-comment" v-model="comment"></b-form-input>
            <b-button variant="none" class="button-blue">Post</b-button>
            <emoji-picker v-if="open_emojis" @emoji_click="emojiClick"></emoji-picker>
          </div>
        </div>
      </div>
    </b-modal>
</template>

<script>
import utils from '../../libs/utils';
import EmojiPicker from '../../assets/Emoji-Picker/EmojiPicker - Vue.js/EmojiPicker.vue'

export default {
  name: 'DetailPost',
  components: {
    EmojiPicker
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    post: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      show_modal: this.show,
      utils,
      open_emojis: false,
      comment: ''
    }
  },
  created() {
    setTimeout(() => {
      console.log(this.post, 'hello')
    }, 200)
  },
  methods: {
    changeAction() {
      history.pushState({urlPath:''},"",`/profile/${this.post.user_uuid}`);
      this.$emit('closeModal');   
    },
    emojiClick(data) {
      this.comment += data;
      console.log(data)
    }
  }
}
</script>

<style>
.main-detail-info {
  background-color: white;
}
.avatar-detail {
  padding: 0.15em;
  background-color: #ccc;
}
.heigth-detail {
  height: 550px;
  object-fit: cover;
}
.h-15 {
  height: 15%;
}
.h-55 {
  height: 80%;
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
.form-comment{
  border: none;
}
.form-comment:focus, .form-comment:active {
  outline: transparent !important;
}
.button-blue {
  font-weight: bold;
  color: rgb(78, 149, 237);
}
.button-blue:hover {
  color: rgb(134, 179, 233)
}
</style>