<template>
  <b-modal v-model="show" scrollable size="sm" hide-footer hide-heade centered>
    <div class="d-flex justify-content-between mb-4" v-for="(user, index) in followers" :key="index">
      <div class="d-flex">
        <b-avatar :src="user.profile_image" class="b-avatar-list me-2" size="lg" icon="person-fill" />
        <div>
        <a class="text-decoration-none router-link-followers d-block" @click="redirect(user.uuid)">
            <span class="d-block">{{ user.name }}</span>
        </a>
        <span class="d-block text-muted">@{{ user.nickname }}</span>
        </div>
      </div>

      <b-button variant="outline-dark" @click="followAction(user.uuid, index)" v-if="user_uuid !== user.uuid">
        <b-spinner :id="`b-spinner${index}`" class="d-none" />
        <div class="d-block" :id="`container-follow-button-${index}`">
          <span :id="`follow-text-${index}`" >{{user.you_follow ? 'Following' : 'Follow'}}</span>
        </div>
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import mainServices from '@/services/main'
import utils from '@/libs/utils'

export default {
  data() {
    return {
      toggle_follow: [],
      user_uuid: '',
      utils,
      show: this.open_modal,
    }
  },
  props: {
    followers: {
      type: Array,
      required: true
    },
    open_modal: {
      type: Boolean,
      required: true,
    }
    // NEED A TOGGLE TEXT, FOLLOW OR UNFOLLOW
  },
  created() {
    console.log(this.followers, 'fff')
    this.user_uuid = utils.getUserData().uuid;
    setTimeout(() => {
      this.fillToggle();
    }, 200);
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
      mainServices.follow(data).then((response) => {
        setTimeout(() => {
          spinner.classList.replace('d-block', 'd-none')
          container_follow.classList.replace('d-none', 'd-block');
        }, 500);
        
        (response.message === 'Following') ?  this.$emit('update_followers', 1) : this.$emit('update_followers', -1)

        if (this.toggle_follow[index])
          document.getElementById(`follow-text-${index}`).innerHTML = 'Following'
        else
          document.getElementById(`follow-text-${index}`).innerHTML = 'Follow'
      })
    },

    fillToggle() {
      this.followers.forEach((item) => {
        this.toggle_follow.push(item.you_follow);
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