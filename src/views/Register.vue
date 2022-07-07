<template>
  <div class="d-flex justify-content-center flex-wrap">
    <b-card
      style="min-width: 20rem;"
      class="mb-1"
      border-variant="warning"
      header="Social OC"
      header-bg-variant="warning"
    >
     <div >
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          placeholder="Enter Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Lastname:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.lastname"
          placeholder="Enter Lastname"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Cumpleaños:" label-for="input-2">
        <b-form-datepicker id="example-datepicker" v-model="form.date_birth" class="mb-2"></b-form-datepicker>
      </b-form-group>

      
      <b-form-group id="input-group-4" label="Nickname:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.nickname"
          placeholder="Enter Nickname"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Gender:" label-for="input-5">
        <b-form-select
          class="form-control"
          id="input-5"
          v-model="form.gender"
          placeholder="Enter name"
          :options="gender"
          required
        ></b-form-select>
      </b-form-group>
      
      <b-form-group id="input-group-6" label="Email:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="form.email"
          placeholder="Enter Email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-7" label="Password:" label-for="input-7">
        <b-form-input
          id="input-7"
          v-model="form.password"
          placeholder="Enter Password"
          required
          type="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="outline-warning">Submit</b-button>
      <b-button type="reset" variant="outline-secondary">Reset</b-button>
    </b-form>
    </div>
    </b-card>
  </div>
</template>

<script>
  import service_auth from '@/services/auth'

  export default {
    data() {
      return {
        form: {
          email: 'test@test.com',
          name: 'test',
          date_birth:'0',
          lastname:'test',
          nickname:'test nick',
          password:'Pass2018#',
          gender: 'Female',
        },
        gender: [{ text: 'Select One', value: 'male' }, 'Female', 'Masculine'],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()

        service_auth.register(this.form).then((response) => {

          
          console.log(response);
        })
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
    }
  }
</script>
<style>
.btn{
    margin: 10px;
}
</style>