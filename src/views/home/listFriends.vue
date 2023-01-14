<template>
  <div class="text-white">
    <h4 class="mb-5">Suggestions for you</h4>

    <div class="d-flex justify-content-between mb-4" v-for="(user, index) in not_following" :key="index">
      <div class="d-flex">
        <b-avatar variant="bg-success" class="b-avatar-list me-2" size="lg" v-if="user.profile_img === null" />
        <b-avatar :src="user.profile_img" class="b-avatar-list me-2" size="lg" v-else />

        <div>
          <router-link :to="{name: 'Profile', params: {uuid: user.uuid}}" class="text-white text-decoration-none router-link">
            <span class="d-block">{{ user.name }}</span>
          </router-link>
          <span class="d-block text-muted">@{{ user.nickname }}</span>
        </div>
      </div>

      <b-button variant="outline-light" @click="followAction(user.uuid, index)">
        <b-spinner :id="`b-spinner${index}`" class="d-none" />
        <div class="d-block" :id="`container-follow-button-${index}`">
          <span :id="`follow-text-${index}`">Follow</span>
        </div>
      </b-button>
    </div>
  </div>
</template>

<script>
import mainServices from '@/services/main'

export default {
  data() {
    return {
      toggle_follow: [],
    }
  },
  props: {
    not_following: {
      type: Array,
      required: true
    },
  },

  created() {
    this.fillToggle();
  },
  methods: {
    followAction(followed_uuid, index) {
      this.toggle_follow[index] = !this.toggle_follow[index];
      const container_follow = document.getElementById(`container-follow-button-${index}`);
      const spinner = document.getElementById(`b-spinner${index}`);

      container_follow.classList.replace('d-block', 'd-none');
      spinner.classList.replace('d-none', 'd-block');
      const data = {
        user_followed_uuid: followed_uuid
      }
      mainServices.follow(data).then(() => {
        setTimeout(() => {
          spinner.classList.replace('d-block', 'd-none')
          container_follow.classList.replace('d-none', 'd-block');
        }, 500);

        if (this.toggle_follow[index])
          document.getElementById(`follow-text-${index}`).innerHTML = 'Unfollow'
        else
          document.getElementById(`follow-text-${index}`).innerHTML = 'Follow'
      })
    },

    fillToggle() {
      this.not_following.forEach(() => {
        this.toggle_follow.push(false);
      })
    }
  }
}
</script>

<style>
.b-avatar-list {
  background-color: #444;
}
.router-link:hover {
  transition: all 200ms !important;
  text-decoration: underline !important;
  color: #FFC107 !important;
} 
</style>