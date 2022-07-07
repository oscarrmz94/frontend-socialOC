<template>
  <div class="d-flex justify-content-center flex-wrap">
    <b-card
      style="min-width: 20rem;"
      class="mb-1"
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
          valid-feedback="Correo valido"
          :invalid-feedback="invalidEmail"
          :state="state"
          >
          <b-icon v-if="user.email.length >= 8"  class="icon" icon="envelope" animation="throb" variant="warning"/>
          <b-icon v-else class="icon" icon="envelope" variant="warning"/>
          <label>Email Address:</label>
        <b-form-input
          id="input-2"
          v-model="user.email"
          placeholder="Email"
          :state="state"
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
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link class="link" to="/forgot-password">Forgot password ?</router-link>
            </p>
        </b-form>
    </div>
    </b-card>
  </div>
</template>

<script>
import service_auth from '@/services/auth'
import { mapActions } from 'vuex';

export default {
    computed: {
      state() {
        return this.user.email.length >= 4
      },
      invalidEmail() {
        if (this.user.email.length > 0) {
          return 'Escribe al menos 4 caracteres.'
        }
        return 'Este campo es obligatorio.'
      },
       state_Password() {
        return this.user.password.length >=8
      },
      invalidPassword() {
        if (this.user.password.length > 0) {
          return 'Escribe minimo 8 caracteres.'
        }
        return 'Este campo es obligatorio.'
      }
    },
  data() {
    return {
      user: {
        email: 'chino@chino1.com',
        password: 'Pass2018#'
      }
    }
  },
  
  methods: {
    ...mapActions(['settingToken']),

    onSubmit(event) {
      event.preventDefault();
      
      service_auth.login(this.user).then((response) => {
        if (response.error === null) {
          
          // MONSTRAR UNA NOTIFICACION DE QUE HA INICIADO CON EXITO
          this.settingToken(response.data.token)
          this.$router.push({name: 'Home'});
        }
      })
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
</style>