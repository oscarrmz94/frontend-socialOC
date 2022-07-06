<template>
<body class="body">
  <div id="app">
    <div id="nav">

      <header class="mb-5"> 
        <!-- UN COMPONENTE DONDE IRA NUESTRO NAVBAR -->
          <router-link class="link" :to="{name: 'Home'}">home</router-link> |
          <router-link class="link mb-5" :to="{name: 'About'}">about</router-link> |
          <button class="link mb-5" @click="logout">Cerrar sesion</button> 

      </header>
      
      <!-- CONTENEDOR PRINCIPAL -->
      <router-view/>

      <footer>
        <!-- UN COMPONENTE DONDE IRA NUESTRO FOOTER -->

      </footer>
    </div>
  </div>
</body>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout']),
  }
}
</script>

<style>
.body{
  background-color: #000000;
  height: 100vh;
  width: 100vw;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #f3a310;
}
.link{
    text-decoration-line: none;
}
</style>
