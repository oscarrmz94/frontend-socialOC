<template>
  <div>
    <div class="d-flex">
      <div class="col-6">
        <slider :data="post.images" :post_uuid="post.uuid"></slider>
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
                <span class="">{{comment.comment}}</span>
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
                    @click="openModalActions(false, comment)"
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
          <b-form-input placeholder="Write a comment" class="form-comment" v-model="comment" ref="comment_input"></b-form-input>
          <b-button variant="none" class="button-blue" @click="uploadComment">Post</b-button>
          <emoji-picker v-if="open_emojis" @emoji_click="emojiClick"></emoji-picker>
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

    <modal-actions-detail
      v-if="modal_actions_post"
      @close_modal_actions_post="modal_actions_post = false"
      @delete_post="deletePost"
      :actions_model="{go_post: (is_modal), cancel: true, delete_post: (user_uuid === post.user_uuid), edit_post: (user_uuid === post.user_uuid)}"
      :post="post"
      :open_modal="modal_actions_post"
      :key="update_modal_actions_post"
      :is_modal="is_modal"
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
// import Modal from "@/components/modal/Modal.vue";
import modalActionsDetail from '@/components/modal/modalActionsDetail.vue';

export default {
  name: 'detailView',
  components: {
    Slider,
    EmojiPicker,
    listFriendsModal,
    // Modal,
    modalActionsDetail
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
    }
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
      show_modal_actions: false,
      users_to_modal: [],
      open_modal_users_likes: false,
      update_modal_users_likes: 0,
      open_emojis: false,
      user_uuid: utils.getUserData().uuid,
      modal_actions_post: false,
      update_modal_actions_post: false,
      
    }
  },
  methods: {
    deletePost(post_uuid) {
      this.$emit('delete_post', post_uuid);
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
    openModalActions(is_actions_post, comment) {
      this.comment_data = comment;
      if (is_actions_post) this.actions_post = true;
      this.show_modal_actions = true;
      this.changed_modal_actions = !this.changed_modal_actions;
    },
    getUsersLikesMethod(uuid, type) {
      service.getUsersLikes(uuid, type).then((response) => {
        this.users_to_modal = response;
        this.open_modal_users_likes = true;
        this.update_modal_users_likes += 1;
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
          this.post.comments
            ? this.post.comments.push(response)
            : (this.post.comments = [response]);
        }
        this.comment = "";
        this.open_emojis = false;
      });
    },
    deleteComment() {
      service.deleteComment(this.comment_data.uuid).then(() => {
        this.show_modal_actions = false;
        this.changed_modal_actions = !this.changed_modal_actions;
        if (this.comment_data.comment_related_uuid) {
          this.post.comments.map((item) => {
            if (item.uuid === this.comment_data.comment_related_uuid) {
              item.related_comments = item.related_comments.filter(
                (item) => item.uuid !== this.comment_data.uuid
              );
            }
          });
        } else {
          this.post.comments = this.post.comments.filter(
            (item) => item.uuid !== this.comment_data.uuid
          );
        }
        this.comment_data = {};
      });
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

<style>

</style>