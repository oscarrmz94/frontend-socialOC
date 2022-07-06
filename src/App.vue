<template>
<body class="body">
  <div id="app">
    <div id="nav">
      <router-link class="link" :to="{name: 'Login'}">Login</router-link> |
      <router-link class="link" :to="{name: 'Register'}">Register</router-link>
    </div>
    <router-view/>
  </div>
</body>
</template>

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
