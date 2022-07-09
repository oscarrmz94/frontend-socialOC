<template>
<body class="body">

      <header class="mb-5" v-if="($route.path.split('/')[1] !== 'login') && ($route.path.split('/')[1] !== 'register')"> 
        <!-- UN COMPONENTE DONDE IRA NUESTRO NAVBAR -->
        <div>
          <b-navbar toggleable="lg"  variant="warning" class="nav">
            <b-navbar-brand class="mx-2">Social CO</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-form>
                  <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                </b-nav-form>
              </b-navbar-nav>
              
              <b-navbar-nav>
                <b-nav-item :to="{name: 'Home'}">
                  <b-icon icon="house-door"/>
                </b-nav-item>
                <b-nav-item :to="{name: 'Message'}">
                  <b-icon icon="chat"/>
                </b-nav-item>
              <b-nav-item :to="{name: 'ToShare'}">
                  <b-icon icon="arrow-up-right-square"/>
                </b-nav-item>
                <b-nav-item :to="{name: 'Notification'}">
                  <b-icon icon="heart"/>
                </b-nav-item>
                <b-nav-item href="#">
                  <b-icon icon="person-lines-fill"/>
                  </b-nav-item>
                <b-nav-item-dropdown>
                  <b-dropdown-item href="#">Perfil</b-dropdown-item>
                  <b-dropdown-item href="#">Configuraciónes</b-dropdown-item>
                  <b-dropdown-item @click="logout">Cerrar sesion</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
              
       
              
              

            </b-collapse>
          </b-navbar>
        </div>


      </header>
      
      <!-- CONTENEDOR PRINCIPAL -->
      <router-view/>

      <footer>
        <!-- UN COMPONENTE DONDE IRA NUESTRO FOOTER -->

      </footer>
</body>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout', 'readToken']),
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

.nav {
  padding: 10px;
}


.nav a.router-link-exact-active {
  font-size: 20px;
}
</style>
