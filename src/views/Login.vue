<template>
  <div class="d-flex justify-content-center app align-items-center">
    <b-card
      class="mb-1 card-login"
      border-variant="warning"
      header="Social OC"
      header-bg-variant="warning"
    >
      <div>
        <b-form @submit="onSubmit">
          <h3>Sign In</h3>
          <div class="form-group m-2">
            <b-form-group 
                id="input-group-1" 
                label-for="input-1"
                valid-feedback="Valid email"
                :invalid-feedback="invalidEmail"
                :state="state_email"
                >
                <b-icon v-if="user.email.length >= 8"  class="icon" icon="envelope" animation="throb" variant="warning"/>
                <b-icon v-else class="icon" icon="envelope" variant="warning"/>
                <label>Email Address:</label>
              <b-form-input
                id="input-2"
                v-model="user.email"
                placeholder="Email"
                :state="state_email"
              ></b-form-input>
            </b-form-group>
          </div>

          <b-form-group
            id="input-group-2" 
            label-for="input-2"
            :state="state_Password"
            :invalid-feedback="invalidPassword"
          >
            <b-icon v-if="user.password.length >= 8" class="icon" icon="lock" animation="throb" variant="warning"/>
            <b-icon v-else class="icon" icon="lock" variant="warning"/>
            <label>Password:</label>
            <b-form-input
              id="input-2"
              type="password"
              v-model="user.password"
              placeholder="Password"
              :state="state_Password"
            ></b-form-input>
          </b-form-group>
          <button type="submit" class="btn btn-outline-warning m-2">Sign In</button>
          <div class="d-flex justify-content-between">
            <div class="text-right mt-2 mb-4">
              <router-link class="link" to="/forgot-password">Forgot password ?</router-link>
            </div>
            <div class="text-right mt-2 mb-4">
              <router-link class="link" to="/register">Create an account</router-link>
            </div>
          </div>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import service_auth from '@/services/auth'
import { mapActions } from 'vuex';
import utils from '@/libs/utils';

export default {
    computed: {
      state_email() {
        return utils.isEmail(this.user.email) === false
      },
      invalidEmail() {
        if (utils.isEmail(this.user.email)) {
          return 'Is not a correct email'
        }
        return 'This field is obligatory.'
      },
      state_Password() {
        return this.user.password.length >=8
      },
      invalidPassword() {
        if (this.user.password.length > 0) {
          return 'Write at least 4 characteres.'
        }
        return 'This field is obligatory.'
      }
    },
  data() {
    return {
      user: {
        email: 'chino@chino.com',
        password: 'Pass2018#'
      }
    }
  },
  
  methods: {
    ...mapActions(['settingToken']),

    onSubmit(event) {
      event.preventDefault();
      if (this.state_email && this.state_Password) {
        service_auth.login(this.user).then((response) => {
          if (response.error === null) {
            this.settingToken(response.data.token);
            service_auth.dashboard().then((user_data) => {
              console.log(user_data)
              localStorage.setItem('user_data', JSON.stringify(user_data))
              this.$router.push({name: 'Home'});
              this.$vToastify.success({
                position: 'center-left',
                title: `Welcome ${user_data.name} ${user_data.lastname}`,
                body: `You have logged in`,
                hideProgressbar: true,
                successDuration: 3000,
              });   
            });
  
          } else if (response.data.message) {
            this.$vToastify.warning({
              position: 'center-left',
              title: 'Error',
              body: 'The email or password is incorrect',
              hideProgressbar: true,
              successDuration: 3000,
            });        
          }
        }); 
      }
    }
  }
}
</script>
<style>
.link{
    text-decoration-line: none;
}
.icon{
  margin-right: 8px;
}
.app {
  text-align: center;
  height: 100vh;
}
.card-login {
  top: -3em;
  height: 360px;
  min-width: 23rem;
}
</style>