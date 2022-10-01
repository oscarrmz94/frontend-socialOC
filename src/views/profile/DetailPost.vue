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
              <b-avatar :src="post.user_profile_image" class="avatar-detail" size="35"></b-avatar>
              <span class="ms-2 fw-bold f14">{{post.user_name}}</span>
            </div>
            <div>
              <b-icon
                icon="three-dots-vertical"
                class="dots"
                @click="openModalActions(true)"
              />
            </div>
          </div>
          <div class="h-55 p-2 border-bottom">
            <div class="d-flex mb-2 f14" v-if="post.caption !== 'null'">
              <b-avatar :src="post.user_profile_image" class="avatar-detail me-2" size="35"></b-avatar>
              <div>
                <span class="fw-bold">{{post.user_name}}</span>
                <span class="ms-2">{{post.caption}}</span>
                <span class="d-block text-muted">{{utils.timePassedFormat(new Date(post.created_at))}}</span>
              </div>
            </div>
            <div v-else-if="!post.comments" class="d-flex flex-column justify-content-center h-100">
                <h3 class="text-center">There is no comments yet</h3>
            </div>
            <div v-if="post.comments" class="d-flex flex-wrap container-comments-detail">
              <div v-for="(comment, index) in post.comments" :key="index" class="mb-2 f14 d-flex flex-wrap col-12">
                <b-avatar :src="comment.user_profile_image" class="avatar-detail me-2" size="35"></b-avatar>
                <div>
                  <span class="fw-bold me-2">{{comment.user_name}}</span>
                  <span class="">{{comment.comment}}</span>
                  <div class="d-block text-muted fw-bold">
                    <span>{{utils.timePassedFormat(new Date(comment.created_at), true)}}</span>
                    <span class="ms-2">22 likes</span>
                    <span class="ms-2 reply-comment-button" @click="replyComment(comment)">Reply</span>
                    <b-icon 
                      class="ms-2 dots" 
                      icon="three-dots"
                      v-if="comment.user_uuid === user_uuid"
                      @click="openModalActions(false, comment)"
                    ></b-icon>
                  </div>    
                </div>
                <div 
                 class="text-muted col-12 ms-3 reply-comment-button mb-3"
                 v-if="comment.related_comments"
                 @click="toggleRelatedComments(index)"
                > 
                  ––– See comments ({{comment.related_comments.length}})
                </div>
                <div ref="show_related_comments" class="ms-5 d-none">
                  <div v-for="(comment, index) in comment.related_comments" :key="index" class="mb-2 f14 d-flex col-12">
                    <b-avatar :src="comment.user_profile_image" class="avatar-detail me-2" size="35"></b-avatar>
                    <div>
                      <span class="fw-bold me-2">{{comment.user_name}}</span>
                      <span class="">{{comment.comment}}</span>
                      <div class="d-block text-muted fw-bold">
                        <span>{{utils.timePassedFormat(new Date(comment.created_at), true)}}</span>
                        <span class="ms-2">22 likes</span>
                        <span class="ms-2 reply-comment-button" @click="replyComment(comment, true)">Reply</span>
                        <b-icon 
                          class="ms-2 dots" 
                          icon="three-dots"
                          v-if="comment.user_uuid === user_uuid"
                          @click="openModalActions(false, comment)"
                        ></b-icon>
                      </div>    
                    </div>
                  </div>
                </div>
              </div>
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
            <b-form-input placeholder="Write a comment" class="form-comment" v-model="comment" ref="comment_input"></b-form-input>
            <b-button variant="none" class="button-blue" @click="uploadComment">Post</b-button>
            <emoji-picker v-if="open_emojis" @emoji_click="emojiClick"></emoji-picker>
          </div>
        </div>
      </div>
      <modal :show_modal="show_modal_actions" :key="changed_modal_actions" @change="actions_post = false">
        <template #body v-if="actions_post">
          <div class="h5 button-modal first m-0">Delete</div>
          <div class="h5 button-modal m-0" >Edit</div>
          <div class="h5 button-modal m-0" >Go to post</div>
          <div class="h5 button-modal last m-0" @click="show_modal_actions = false; changed_modal_actions = !changed_modal_actions">Cancel</div>
        </template>
        <template #body v-else>
          <div class="h5 button-modal first m-0" @click="deleteComment">Delete</div>
          <div class="h5 button-modal last m-0" @click="show_modal_actions = false; changed_modal_actions = !changed_modal_actions">Cancel</div>
        </template>
      </modal>
    </b-modal>
</template>

<script>
import utils from '../../libs/utils';
import EmojiPicker from '../../assets/Emoji-Picker/EmojiPicker - Vue.js/EmojiPicker.vue';
import mainServices from '../../services/main';
import Modal from '../../components/modal/Modal.vue';
import service from '@/services/main';

export default {
  name: 'DetailPost',
  components: {
    EmojiPicker,
    Modal
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
      comment: '',
      user_uuid: utils.getUserData().uuid,
      comment_related_uuid: null,
      show_modal_actions: false,
      changed_modal_actions: false,
      actions_post: false,
      comment_data: {},
    }
  },
  created() {
    setTimeout(() => {
      console.log(this.post.comments, 'he  llo')
    }, 200)
  },
  methods: {
    toggleRelatedComments(index) {
      this.$refs.show_related_comments[index].classList.toggle('d-none');
    },
    changeAction() {
      history.pushState({urlPath:''},"",`/profile/${this.post.user_uuid}`);
      this.$emit('closeModal');   
    },
    emojiClick(data) {
      this.comment += data;
    },
    uploadComment() {
      const data = {
        user_uuid: this.user_uuid,
        post_uuid: this.post.uuid,
        comment: this.comment,
        comment_related_uuid: this.comment_related_uuid
      }
      mainServices.uploadComment(data).then((response) => {
        if (this.comment_related_uuid !== null) {
          this.post.comments.map((item) => {
            if (item.uuid === this.comment_related_uuid) {
              if (item.related_comments) item.related_comments.push(response)
              else item.related_comments = [response]
            } 
          })
          this.comment_related_uuid = false;
        } else {
          this.post.comments.push(response);
        }
        this.comment = '';
        this.open_emojis = false;
      });
    },
    openModalActions(is_actions_post, comment) {
      this.comment_data = comment;
      if (is_actions_post) this.actions_post = true;
      this.show_modal_actions = true;
      this.changed_modal_actions = !this.changed_modal_actions;
    },
    deleteComment() {
      service.deleteComment(this.comment_data.uuid).then(() => {
        this.show_modal_actions = false;
        this.changed_modal_actions = !this.changed_modal_actions;
        if (this.comment_data.comment_related_uuid) {
          this.post.comments.map((item) => {
            if (item.uuid === this.comment_data.comment_related_uuid) {
              item.related_comments = item.related_comments.filter((item) => item.uuid !== this.comment_data.uuid);
            }
          });
        } else {
          this.post.comments = this.post.comments.filter((item) => item.uuid !== this.comment_data.uuid);
        }
        this.comment_data = {};
      });
    },
    replyComment(comment, related = false) {
      console.log(comment)
      this.comment = `@${comment.user_nickname} `;
      this.comment_related_uuid = related ? comment.comment_related_uuid : comment.uuid;
      this.$refs.comment_input.focus();
    },
  }
}
</script>

<style>
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
.heigth-detail {
  height: 550px;
  object-fit: cover;
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
.f14 {
  font-size: 14px !important;
}
.first {
  border-top-left-radius: 25px !important;
  border-top-right-radius: 25px !important;
}
.last {
  border-bottom-left-radius: 25px !important;
  border-bottom-right-radius: 25px !important;
}
.button-modal {
  text-align: center;
  background-color: gray;
  height: auto;
  color: white;
  padding: 1em;
}
.button-modal:hover {
  background-color: orange;
  cursor: pointer;
}
.reply-comment-button {
  cursor: pointer;
}
</style>