<template>
<body class="body">

      <header class="mb-5" v-if="($route.path.split('/')[1] !== 'login') && ($route.path.split('/')[1] !== 'register')"> 
        <navbar-component :user_uuid="user_uuid"/>   
      </header>
      
      <!-- CONTENEDOR PRINCIPAL -->
      <div class="main-container col-9 mx-auto">
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
            console.log('he entrado al método')

      this.user_uuid = utils.getUserData().uuid;
    }
  },
  created() {
    console.log('hello')
    this.readToken();
    this.getUserUuid();

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
