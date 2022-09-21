<template>
  <b-modal
    v-model="show"
    centered
    hide-footer
    hide-header
    body-class="modal-actions-body"
    class="modal-actions"
    size="sm"
    content-class="modal-actions-content"
    @change="$emit('change')"
  >
    <div>
      <slot name="body"></slot>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show_modal: { 
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      show: this.show_modal,
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
</style>