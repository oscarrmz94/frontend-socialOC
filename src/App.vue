<template>
<body class="body">

      <header class="mb-5" v-if="($route.path.split('/')[1] !== 'login') && ($route.path.split('/')[1] !== 'register')"> 
        <navbar-component v-on:clear_user_uuid="getData()"/>   
      </header>
      
      <!-- CONTENEDOR PRINCIPAL -->
      <div class="main-container col-12 col-lg-9 mx-auto">
        <router-view/>
      </div>

      <footer v-if="($route.path.split('/')[1] !== 'login') && ($route.path.split('/')[1] !== 'register')">
        <footer-component />
      </footer>
</body>
</template>
<script>
import { mapActions } from 'vuex';
import navbarComponent from '@/components/layout/navbar.vue'
import footerComponent from '@/components/layout/footer.vue'
import utils from './libs/utils';

export default {
  components: {
    navbarComponent,
    footerComponent
  },  
  data() {
    return {
      user_uuid: ''
    }
  },
  methods: {
    ...mapActions(['readToken']),
    
    getUserUuid() {
      this.user_uuid = utils.getUserData().uuid;
    },
    getData() {
      this.user_uuid = ''; 
      this.readToken();
      this.getUserUuid();
    }
  },
  created() {
    console.log('He entrado a mi app')
    this.getData();
  }
}
</script>

<style>
.body{
  background-color: #2c2a2a;
  width: 100vw;
}
.main-container {
  min-height: 100vh;
}
</style>
