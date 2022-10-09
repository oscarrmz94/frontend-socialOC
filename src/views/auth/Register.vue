<template>
  <div class="d-flex justify-content-center align-items-center app">
    <b-card
      style="min-width: 20rem;"
      class="mb-1"
      border-variant="warning"
      header="Social OC"
      header-bg-variant="warning"
    >
    <b-icon class="float-start arrow-circle-back" icon="arrow-left-circle-fill" variant="seconday" @click="$router.push({name: 'Login'})"/>
     <div >
        <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="mt-3">

          <b-form-group
            id="input-group-1"  
          >
            <b-icon class="icon" icon="person-fill" variant="warning"/>
            <label>Name:</label>
            <b-form-input
              id="input-1"
              v-model="form.name"
              placeholder="Enter Name"
              :state="state_name"
            ></b-form-input>
          </b-form-group>
          <b-form-group 
              id="input-group-2"  
              label-for="input-2">
              <b-icon class="icon" icon="person-badge" variant="warning"/>
              <label>Lastname:</label>
            <b-form-input
              id="input-2"
              v-model="form.lastname"
              placeholder="Enter Lastname"
              :state="state_lastname"
            ></b-form-input>
          </b-form-group>

          <b-form-group 
              id="input-group-2"  
              label-for="input-2">
              <b-icon class="icon" icon="gift" variant="warning"/>
              <label>Birthday:</label>
            <b-form-datepicker 
              id="example-datepicker" 
              v-model="form.date_birth" 
              class="mb-2"
              :state="state_birth"
            >
            </b-form-datepicker>
          </b-form-group>
    
          <b-form-group 
            id="input-group-4" 
            label-for="input-4"
          >
            <b-icon class="icon" icon="joystick" variant="warning"/>
            <label>Nickname:</label>
            <b-form-input
              id="input-4"
              v-model="form.nickname"
              placeholder="Enter Nickname"
              :state="state_nickname"
            ></b-form-input>
          </b-form-group>

          <b-form-group 
              id="input-group-5" 
              label-for="input-5">
              <b-icon class="icon" icon="gender-ambiguous" variant="warning"/>
              <label>Gender:</label>
            <b-form-select
              class="form-control"
              id="input-5"
              v-model="form.gender"
              placeholder="Enter name"
              :options="gender"
              :state="state_gender"
            ></b-form-select>
          </b-form-group>
          
          <b-form-group 
            id="input-group-6"
            label-for="input-6"
          >
            <b-icon class="icon" icon="envelope" variant="warning"/>
            <label>Email:</label>
            <b-form-input
              id="input-6"
              v-model="form.email"
              placeholder="Enter Email"
              :state="state_email"
            >
            </b-form-input>
            <span class="text-danger alert-error-register" v-if="mail_already_exists">This email is already in 
              use
            </span>
          </b-form-group>

          <b-form-group 
            id="input-group-7" 
            label-for="input-7"
          >
            <b-icon class="icon" icon="lock" variant="warning"/>
            <label>Password:</label>
            <b-form-input
              id="input-7"
              v-model="form.password"
              placeholder="Enter Password"
              type="password"
              :state="state_password"
            ></b-form-input>
            <span class="text-danger alert-error-register" v-if="strong_password_label">It is not a strong password</span>
          </b-form-group>

          <b-button type="submit" variant="outline-warning">Submit</b-button>
          <b-button type="reset" variant="outline-secondary">Reset</b-button>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<script>
import service_auth from '@/services/auth';
import utils from '@/libs/utils';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        date_birth: '',
        lastname: '',
        nickname: '',
        password: '',
        gender: null,
      },
      gender: [
        {text: 'Select one gender', value: null}, 
        {text: 'Female', value: 'female'},
        {text: 'Male', value: 'male'}],
      show: true,
      strong_password_label: false,
      mail_already_exists: false
    }
  },
  computed: {
    state_name() {
      return this.form.name.length >= 4;
    },
    state_lastname() {
      return this.form.lastname.length >= 4;
    },
    state_birth() {
      return this.form.date_birth !== '';
    },
    state_nickname() {
      return this.form.nickname.length >= 4;
    },
    state_gender() {
      return this.form.gender !== null;
    },
    state_email() {
      return utils.isEmail(this.form.email) === false;
    },
    state_password() {
      return this.form.password.length >= 8;
    },
  },
  methods: {
    ...mapActions(['settingToken']),    
    onSubmit(event) {
      event.preventDefault()

      if (this.state_name && this.state_lastname && this.state_birth && this.state_gender && this.state_nickname && this.state_email && this.state_password) {
        service_auth.register(this.form).then((response) => {
          if (response.status >= 300) {
            if (response.data.key === 'not_strong_password')
              this.strong_password_label = true;
            else if (response.data.key === 'email_already_used')
              this.mail_already_exists = true;
          } else {
            this.strong_password_label = false; this.mail_already_exists = false;
            this.settingToken(response.data.data.token);
            localStorage.setItem('token', response.data.data.token);
            service_auth.dashboard().then((user_data) => {
              localStorage.setItem('user_data', JSON.stringify(user_data));
              this.$vToastify.success({
                position: 'center-left',
                title: `Welcome ${user_data.name} ${user_data.lastname}`,
                body: `You have logged in`,
                hideProgressbar: true,
                successDuration: 3000,
              });
              this.$router.push({name: 'Home'}); 
            });
  
          }
        });
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.date_birth = ''
      this.form.lastname = ''
      this.form.nickname =''
      this.form.password =''
      this.form.gender = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
}
</script>
<style>
.btn{
    margin: 10px;
}
.icon{
  margin-right: 8px;
  margin-top: 10px;
}
.app {
  text-align: center;
  height: 100vh;
}
.alert-error-register {
  font-size: 0.875em;
}
.arrow-circle-back {
  font-size: 28px;
  position: absolute;
  left: 10px;
  top: 7px;
  cursor: pointer;
}
</style>