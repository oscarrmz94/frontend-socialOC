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
      <div class="button-modal delete-hover" v-if="actions_model.delete_comment" @click="deleteComment()">Delete</div>
      <div class="button-modal" v-if="actions_model.edit_comment" @click="$emit('comment_edit', comment.uuid); show = false">Edit</div>
      <div class="button-modal disabled-button" disabled>Report this comment</div>
       <div class="button-modal" @click="show = false">
        Cancel
      </div>
    </div>
  </b-modal>
</template>
<script>
import main_services from '@/services/main';

export default {
  name: 'modalCommentEdit',
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
    comment: {
      type: Object
    },
    open_modal: {
      type: Boolean,
    },
  },
  created() {
    setTimeout(() => {
      this.$refs.modal_actions_detail.children[0].classList.add('first');
      this.$refs.modal_actions_detail.children[this.$refs.modal_actions_detail.children.length - 1].classList.add('last');
    }, 200)
  },
  methods: {
    deleteComment() {
      this.$dialog.confirm(`Are you sure that You want to delete this comment?`).then(() => {
        main_services.deleteComment(this.comment.uuid).then(() => {
          this.$emit('delete_comment', this.comment.uuid);
          this.show = false;
        });
      });
    }
  }
}
</script>

<style scoped>
.disabled-button {
  cursor: not-allowed !important;
}
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