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
            <span :id="`follow-text-${index}`">{{toggle_text}}</span>
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
      toggle_follow: []
    }
  },
  props: {
    followers: {
      type: Array,
      required: true
    },
    // NEED A TOGGLE TEXT, FOLLOW OR UNFOLLOW
    toggle_text: {
      type: String,
      required: true
    }
  },
  methods: {
    redirect(uuid) {
      this.$emit('close_modal');
      this.$router.push({ path: `/profile/${uuid}`});
    },
    followAction(followed_uuid, index) {
      this.toggle_follow[index] = !this.toggle_follow[index];
      const container_follow = document.getElementById(`container-follow-button-${index}`);
      const spinner = document.getElementById(`b-spinner${index}`);

      container_follow.classList.replace('d-block', 'd-none');
      spinner.classList.replace('d-none', 'd-block');
      const data = {
        user_follower_uuid: this.user_uuid,
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
.router-link-followers:hover {
  cursor: pointer;
  text-decoration: underline !important;
}
.b-avatar-list-followers {
  background-color: #ccc;  
}
</style>