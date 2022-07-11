<template>
<body class="body">

      <header class="mb-5" v-if="($route.path.split('/')[1] !== 'login') && ($route.path.split('/')[1] !== 'register')"> 
        <navbar-component />   
      </header>
      
      <!-- CONTENEDOR PRINCIPAL -->
      <div class="d-flex justify-content-center">
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

export default {
  components: {
    navbarComponent,
    footerComponent
  },  
  methods: {
    ...mapActions(['readToken']),
  },
  created() {
    this.readToken();
  }
}
</script>

<style>
.body{
  background-color: #000000;
  height: 100vh;
  width: 100vw;
}
</style>
