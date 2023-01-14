<template>
  <div class="background-main-loading" v-if="show">
    <b-spinner class="spinner-loading"></b-spinner>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      default: true
    }
  },
}
</script>

<style>
.background-main-loading {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000000 !important;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner-loading { 
  height: 5em;
  width: 5em;
  border-width: 0.3em;
}
</style>