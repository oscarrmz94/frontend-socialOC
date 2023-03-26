<template>
  <div>
    <div class="d-flex position-relative">
      <div class="col-6">
        <slider :data="post.images" :post_uuid="post.uuid"></slider>
      </div>
      <div class="col-6 bg-white d-flex flex-column" v-if="!is_editing_post">
        <div class="d-flex justify-content-between align-items-center p-2 border-bottom h-12">
          <div>
            <b-avatar :src="post.user_profile_image" class="avatar-detail" size="35"></b-avatar>
            <span class="ms-2 fw-bold f14">{{post.user_name}}</span>
          </div>
          <div>
            <b-icon
              icon="three-dots-vertical"
              class="dots"
              @click="modal_actions_post = true; update_modal_actions_post = !update_modal_actions_post"
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
            <div v-for="(comment, index) in post.comments" :key="index" class="mb-2 f14 d-flex col-12 position-relative">
              <b-avatar :src="comment.user_profile_image" class="avatar-detail me-2" size="35"></b-avatar>
              <div>
                <span class="fw-bold me-2 username-redirection" @click="$router.push({name: 'Profile', params: {uuid: comment.user_uuid}}); show_modal = false">
                  {{comment.user_name}}
                </span>
                <span v-if="!is_editing_comment">{{comment.comment}}</span>
                <div v-else class="d-flex align-items-center justify-content-between w-100">
                  <b-form-input v-model="comment.comment" :ref="`comment_input_edit_${comment.uuid}`" class="mr-1" @keyup.enter="editComment(comment)"></b-form-input>
                  <span class="text-info cursor-pointer" @click="editComment(comment)">Edit</span>
                </div>
                <div class="d-block text-muted fw-bold">
                  <span>{{utils.timePassedFormat(new Date(comment.created_at), true)}}</span>
                  <span 
                    class="ms-2 cursor-pointer under-line-hover" 
                    v-if="comment.number_likes > 0" 
                    @click="getUsersLikesMethod(comment.uuid, 'comment')"
                  >
                    {{comment.number_likes}}
                    {{comment.number_likes === 1 ? 'like' : 'likes'}}
                  </span>
                  <!-- @click="replyComment(comment)" -->
                  <span class="ms-2 reply-comment-button">Reply</span>
                  <b-icon 
                    class="ms-2 dots" 
                    icon="three-dots"
                    v-if="(comment.user_uuid === user_uuid) || post.user_uuid === user_uuid"
                    @click="openModalActionsComment(comment)"
                  ></b-icon>
                </div>    
              </div>
              <b-icon class="icon icon-heart-post-fill icon-size-14 icon-reaction" icon="heart-fill" @click="toggleFavorite(post, comment, 'comment')" v-if="comment.like_comment"/>
              <b-icon class="icon icon-size-14" icon="heart" @click="toggleFavorite(post, comment, 'comment')" v-else/>
              <!-- <div 
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
                    <span class="fw-bold me-2 username-redirection" @click="$router.push({name: 'Profile', params: {uuid: comment.user_uuid}}); show_modal = false">{{comment.user_name}}</span>
                    <span class="">{{comment.comment}}</span>
                    <div class="d-block text-muted fw-bold">
                      <span>{{utils.timePassedFormat(new Date(comment.created_at), true)}}</span>
                      <span class="ms-2"> likes</span>
                      <span class="ms-2 reply-comment-button" @click="replyComment(comment, true)">Reply</span>
                      <b-icon 
                        class="ms-2 dots" 
                        icon="three-dots"
                        v-if="comment.user_uuid === user_uuid"
                        @click="openModalActions(false, comment)"
                      ></b-icon>
                    </div>    
                  </div>                    
                  <b-icon 
                    class="icon icon-heart-post-fill icon-size-14 icon-reaction" 
                    icon="heart-fill" 
                    @click="toggleFavorite(post, comment, 'comment_related')" 
                    v-if="comment.like_comment && comment.like_comment.like_comment"
                  />
                  <b-icon class="icon icon-size-14" icon="heart" @click="toggleFavorite(post, comment, 'comment_related')" v-else/>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="h-15 border-bottom p-2">
          <div class="d-flex justify-content-between">
            <div>
              <b-icon class="icon icon-heart-post-fill icon-reaction" icon="heart-fill" @click="toggleFavorite(post)" v-if="post.like_post"/>
              <b-icon class="icon" icon="heart" @click="toggleFavorite(post)" v-else/>
              <b-icon icon="chat" class="icon" @click="$refs.comment_input.focus()"></b-icon>
              <b-icon icon="cursor" class="icon no-cursor-pointer"></b-icon>
            </div>
            <div>
              <b-icon icon="bookmark" class="icon no-cursor-pointer"></b-icon>
            </div>
          </div>
          <div class="mt-1 d-flex">
                
            <div class="ms-2" v-if="post.first_user_like && post.number_likes !== 0">Liked by
              <strong>{{post.first_user_like.nickname}}</strong> 
                <span v-if="post.number_likes > 1">
                and <strong @click="getUsersLikesMethod(post.uuid, 'post')" class="cursor-pointer">others</strong>
                </span>
              </div>
            <span v-if="post.number_likes === 0">Be the first to <strong @click="toggleFavorite(post)" class="cursor-pointer">like this</strong></span>
          </div>
        </div>
        <div class="h-15 p-2 d-flex align-items-center">
          <b-icon icon="emoji-smile" class="icon-reactions" @click="open_emojis = !open_emojis" />
          <b-form-input placeholder="Write a comment" class="form-comment" v-model="comment" ref="comment_input" @keyup.enter="uploadComment"></b-form-input>
          <b-button variant="none" class="button-blue" @click="uploadComment">Post</b-button>
          <emoji-picker v-if="open_emojis" @emoji_click="emojiClick"></emoji-picker>
        </div>
      </div>
      <div class="col-6 bg-white d-flex flex-column" v-else>
        <div class="edit-post-title border-bottom">
          <p class="m-0 cursor-pointer" @click="is_editing_post = false">Cancel</p>
          <p class="h6">Edit Post</p>
          <p class="text-info m-0 cursor-pointer" @click="editPost">Done</p>
        </div>
        <div class="d-flex flex-wrap justify-content-between align-items-center p-2 mt-3 border-bottom h-12">
          <div class="w-100 mb-3">
            <b-avatar :src="post.user_profile_image" class="avatar-detail" size="35"></b-avatar>
            <span class="ms-2 fw-bold f14">{{post.user_name}}</span>
          </div>
          <div class="my-2 w-100">
            <b-form-textarea v-model="post.caption" rows="6" class="d-block w-100" ref="textarea_edit" @keyup.enter="editPost"></b-form-textarea>
          </div>
          <div class="border-top w-100">
            <h6 class="mt-2 text-muted">Tagged persons</h6>
            <p class="text-muted">Coming soon ...</p>
          </div>
        </div>
      </div>
    </div>
    <list-friends-modal 
      :followers="users_to_modal"
      :open_modal="open_modal_users_likes"
      :key="update_modal_users_likes"
    />
    <!-- <modal :show_modal="show_modal_actions" :key="changed_modal_actions" @change="actions_post = false">
      <template #body v-if="actions_post">
        <div v-if="user_uuid === post.user_uuid">
          <div class="h5 button-modal first m-0">Delete</div>
          <div class="h5 button-modal m-0" >Edit</div>
        </div>
        <div
          :class="`h5 button-modal m-0 ${user_uuid !== post.user_uuid ? 'first' : ''}`" 
          @click="$router.push({name: 'Detail', params: {uuid: post.uuid}})"
          v-if="is_modal"
        >
          Go to post
        </div>
        <div
          class="h5 button-modal last m-0" 
          @click="show_modal_actions = false; changed_modal_actions = !changed_modal_actions"
        >
          Cancel
        </div>
      </template>
      <template #body v-else>
        <div class="h5 button-modal first m-0" @click="deleteComment">Delete</div>
        <div class="h5 button-modal last m-0" @click="show_modal_actions = false; changed_modal_actions = !changed_modal_actions">Cancel</div>
      </template>
    </modal> -->
    <modal-comment-edit 
      :open_modal="open_modal_comment"
      :key="update_modal_comment"
      :comment="comment_data"
      :actions_model="{delete_comment: (user_uuid === post.user_uuid || user_uuid === comment_data.user_uuid), edit_comment: (user_uuid === comment_data.user_uuid)}"
      @delete_comment="deleteComment"
      @comment_edit="commentAction"
    />

    <modal-actions-detail
      v-if="modal_actions_post"
      @close_modal_actions_post="modal_actions_post = false"
      @delete_post="deletePost"
      :actions_model="{go_post: (is_modal), cancel: true, delete_post: (user_uuid === post.user_uuid), edit_post: (user_uuid === post.user_uuid)}"
      :post="post"
      :open_modal="modal_actions_post"
      :key="update_modal_actions_post"
      :is_modal="is_modal"
      @edit_action="editAction"
    >
    </modal-actions-detail>
  </div>
</template>

<script>
import EmojiPicker from "@/assets/emoji/EmojiPicker.vue";
import Slider from "@/views/home/Slider.vue";
import utils from "@/libs/utils";
import service from "@/services/main";
import listFriendsModal from '@/components/modal/listFriendsModal.vue';
import modalActionsDetail from '@/components/modal/modalActionsDetail.vue';
import ModalCommentEdit from '@/components/modal/modalCommentEdit.vue';

export default {
  name: 'detailView',
  components: {
    Slider,
    EmojiPicker,
    listFriendsModal,
    modalActionsDetail,
    ModalCommentEdit
  },
  props: {
    post: {
      type: Object,
    },
    is_modal: {
      type: Boolean,
    },
    focus_on_input: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    setTimeout(() => {
      if (this.focus_on_input) this.$refs.comment_input.focus()
    }, 200)
  },
  data() {
    return {
      utils,
      comment: '',
      comment_data: {},
      comment_related_uuid: null,
      actions_post: false,
      show_modal: false,
      changed_modal_actions: false,
      users_to_modal: [],
      open_modal_users_likes: false,
      update_modal_users_likes: 0,
      open_emojis: false,
      user_uuid: utils.getUserData().uuid,
      modal_actions_post: false,
      update_modal_actions_post: false,
      open_modal_comment: false,
      update_modal_comment: 0.2,
      is_editing_post: false,
      is_editing_comment: false,
    }
  },
  methods: {
    editPost() {
      const edited_post = {
        uuid: this.post.uuid,
        caption: this.post.caption
      }
      service.editPost(edited_post).then((response) => {
        if (response.post_updated) {
          this.is_editing_post = false;
          this.$vToastify.success({
            position: 'top-right',
            title: 'Updated',
            body: 'The post has been updated successfully',
            hideProgressbar: true,
            successDuration: 3000,
          });
        } else {
          this.$vToastify.success({
            position: 'top-right',
            title: 'Error',
            body: 'Something wrong has been happened',
            hideProgressbar: true,
            successDuration: 3000,
          });
        }
      });
    },
    editAction() {
      this.is_editing_post = true;
      setTimeout(() => {
        this.$refs.textarea_edit.focus();
      }, 200);
    },
    editComment(comment) {
      const comment_edited = {
        uuid: comment.uuid,
        comment: comment.comment
      };
      service.editComment(comment_edited).then(() => {
        // WS EDIT COMMENT

      });
    },
    commentAction(comment_uuid) {
      this.is_editing_comment = true;
      setTimeout(() => {
        this.$refs[`comment_input_edit_${comment_uuid}`][0].focus();
      }, 200);
    },
    deletePost(post_uuid) {
      this.$emit('delete_post', post_uuid);
      history.pushState({ urlPath: "" }, "", `/profile/${this.post.user_uuid}`);
    },
    toggleFavorite(post, comment, type_like = 'post') {

      if (type_like === 'post') {
        post.like_post = !post.like_post;
        const obj = {
          uuid: post.like_post.uuid,
          post_uuid: post.uuid,
          type_like: "post",
        };
        service.likePost(obj).then((response) => {
          (response.status === 'like_post') ? post.number_likes += 1 : post.number_likes -= 1;
        });
      } else {
        comment.like_comment = !comment.like_comment;
        const obj = {
          uuid: comment.like_comment.uuid,
          post_uuid: post.uuid,
          comment_uuid: comment.uuid,
          type_like: "comment"
        };
        service.likeComment(obj).then((response) => {
          (response.status === 'like_comment') ? comment.number_likes += 1 : comment.number_likes -= 1;
        });
      }
    },
    openModalActionsComment(comment) {
      this.open_modal_comment = true;
      this.update_modal_comment += 1;
      this.comment_data = comment;
    },
    getUsersLikesMethod(uuid, type) {
      service.getUsersLikes(uuid, type).then((response) => {
        this.users_to_modal = response;
        this.open_modal_users_likes = true;
        this.update_modal_users_likes += 0.1;
      });
    },
    uploadComment() {
      const data = {
        post_uuid: this.post.uuid,
        comment: this.comment,
        comment_related_uuid: this.comment_related_uuid,
      };
      service.uploadComment(data).then((response) => {
        if (this.comment_related_uuid !== null) {
          this.post.comments.map((item) => {
            if (item.uuid === this.comment_related_uuid) {
              if (item.related_comments) item.related_comments.push(response);
              else item.related_comments = [response];
            }
          });
          this.comment_related_uuid = false;
        } else {
          setTimeout(() => {
            this.post.comments
              ? this.post.comments.push(response)
              : (this.post.comments = [response]);
          }, 500);
        }
        this.comment = "";
        this.open_emojis = false;
      });
    },
    deleteComment(comment_uuid) {
      this.post.comments = this.post.comments.filter((comment) => comment.uuid !== comment_uuid);
    },
    replyComment(comment, related = false) {
      this.comment = `@${comment.user_nickname} `;
      this.comment_related_uuid = related
        ? comment.comment_related_uuid
        : comment.uuid;
      this.$refs.comment_input.focus();
    },
    toggleRelatedComments(index) {
      this.$refs.show_related_comments[index].classList.toggle("d-none");
    },
  }
}
</script>

<style scoped>
.edit-post-title {
  position: absolute;
  top: -2.5em;
  left: 0;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  padding: 0.7em;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
<style>
.form-control {
  border: none !important;
}
</style>