<template>
  <b-modal
    v-model="show"
    hide-footer
    hide-header
    body-class="modal-actions-body"
    content-class="modal-actions-content"

    size="sm"
    centered
  > 
    <div ref="modal_actions_detail">
      <div class="button-modal delete-hover" v-if="actions_model.delete_post" @click="deletePost()">Delete</div>
      <div class="button-modal" v-if="actions_model.edit_post">Edit</div>
      <div class="button-modal" v-if="actions_model.go_post"
        @click="$router.push({name: 'Detail', params: {uuid: post.uuid}})"
      >
        Go to post
      </div>
       <div class="button-modal" v-if="actions_model.cancel" @click="show = false">
        Cancel
      </div>
    </div>
  </b-modal>
</template>

<script>
import main_services from '@/services/main';

export default {
  name: 'modalActionsDetail',
  data() {
    return {
      show: this.open_modal
    }
  },
  props: {
    actions_model: {
      type: Object,
      default: () => {
        return {}
      }
    },
    post: {
      type: Object
    },
    open_modal: {
      type: Boolean,
    },
    is_modal: {
      type: Boolean,
    }
  },
  created() {
    setTimeout(() => {
      this.$refs.modal_actions_detail.children[0].classList.add('first');
      this.$refs.modal_actions_detail.children[this.$refs.modal_actions_detail.children.length - 1].classList.add('last');
    }, 200)
  },
  methods: {
    deletePost() {
      this.$dialog.confirm(`Are you sure that You want to delete this post?`).then(() => {      
        main_services.deletePost(this.post.uuid).then(() => {
          this.show = false;
          if (!this.is_modal) this.$router.push({name: 'Profile', params: {uuid: this.post.user_uuid}});
          else this.$emit('delete_post', this.post.uuid);
          this.$vToastify.success({
            position: 'top-right',
            title: 'Deleted',
            body: 'The post has been deleted successfully',
            hideProgressbar: true,
            successDuration: 3000,
          });
        });
      });
    }
  }
}
</script>

<style>
.modal-actions-body {
  padding: 0px !important;
  border-radius: 50px !important;
  border: none !important;
}
.modal-actions-content {
  background-color: transparent !important;
  border-radius: 25px !important;

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
  transition: all 300ms;
}
.modal-actions-body {
  padding: 0px !important;
  border-radius: 50px !important;
}
.modal-actions-content {
  background-color: transparent !important;
}
.delete-hover:hover {
  background-color: rgb(116, 2, 2) !important;
}
</style>