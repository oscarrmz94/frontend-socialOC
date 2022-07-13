<template>
    <div>
      <div class="d-flex justify-content-between mb-4" v-for="(user, index) in followers" :key="index">
        <div class="d-flex">
            <b-avatar class="b-avatar-list-followers me-2" size="lg" v-if="user.profile_img === null" />
            <b-avatar :src="user.profile_img" class="b-avatar-list me-2" size="lg" v-else />

            <div>
            <a class="text-decoration-none router-link-followers d-block" @click="redirect(user.uuid)">
                <span class="d-block">{{ user.name }}</span>
            </a>
            <span class="d-block text-muted">@{{ user.nickname }}</span>
            </div>
        </div>

        <b-button variant="outline-dark" @click="followAction(user.uuid, index)">
            <b-spinner :id="`b-spinner${index}`" class="d-none" />
            <div class="d-block" :id="`container-follow-button-${index}`">
            <span :id="`follow-text-${index}`">Follow</span>
            </div>
        </b-button>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    followers: {
      type: Array,
      required: true
    }
  },
  methods: {
    redirect(uuid) {
      this.$emit('close_modal');
      this.$router.push({ path: `/profile/${uuid}`});
    }
  }
}
</script>

<style>
.router-link-followers:hover {
  cursor: pointer;
  text-decoration: underline !important;
}
.b-avatar-list-followers {
  background-color: #ccc;  
}
</style>