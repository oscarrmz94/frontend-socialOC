<template>
  <!-- <b-navbar toggleable="lg" variant="nav" class="nav px-5">
    <div class="d-flex flex-row">
      <b-navbar-brand class="mx-2 text-white d-block mr-5">Social CO</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="d-block">
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
          </b-nav-form>
        </b-navbar-nav>

        <b-navbar-nav class="d-flex">
          <b-nav-item :to="{ name: 'Home' }">
            <b-icon icon="house-door" variant="light" />
          </b-nav-item>
          <b-nav-item :to="{ name: 'Message' }">
            <b-icon icon="chat" variant="light" />
          </b-nav-item>
          <b-nav-item :to="{ name: 'ToShare' }">
            <b-icon icon="arrow-up-right-square" variant="light" />
          </b-nav-item>
          <b-nav-item :to="{ name: 'Notification' }" variant="light">
            <b-icon icon="heart" variant="light" />
          </b-nav-item>
          <b-nav-item href="#">
            <b-icon icon="person-lines-fill" variant="light" />
          </b-nav-item>
          <b-nav-item-dropdown variant="light" class="text-white">
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item href="#">Configuraciónes</b-dropdown-item>
            <b-dropdown-item @click="logout">Cerrar sesion</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar> -->


  <nav class="main-nav text-white">
    <div class="d-flex justify-content-between align-items-center col-11 col-lg-9">
      <router-link to="/" class="text-decoration-none text-white">
        <div class="logo-brand h2">SocialOC</div>

      </router-link>

      <div class="d-flex align-items-center d-none d-lg-flex">
        <div class="search-container">
          <b-input-group class="b-icon-sarch">
            <b-form-input class="input-search" placeholder="Busca algo ..."></b-form-input>
            <b-input-group-prepend is-text class="button-search">
                <b ><b-icon icon="search" /></b>
            </b-input-group-prepend>
          </b-input-group>
        </div>
        <b-nav-item :to="{ name: 'Home' }">
          <b-icon icon="house-door" variant="light" />
        </b-nav-item>
        <b-nav-item :to="{ name: 'Message' }">
          <b-icon icon="chat" variant="light" />
        </b-nav-item>
        <b-nav-item :to="{ name: 'ToShare' }">
          <b-icon icon="arrow-up-right-square" variant="light" />
        </b-nav-item>
        <b-nav-item :to="{ name: 'Notification' }" variant="light">
          <b-icon icon="heart" variant="light" />
        </b-nav-item>
        <b-nav-item href="#">
          <b-icon icon="person-lines-fill" variant="light" />
        </b-nav-item>
        <b-nav-item-dropdown variant="light" class="text-white dropdown-nav">
          <b-dropdown-item @click="redirectProfile">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
          <b-dropdown-item @click="logoutAction()">Log out</b-dropdown-item>
        </b-nav-item-dropdown>
      </div>

      <!-- HAMBURGER DISPLAY -->

      <b-icon icon="list" variant="light" class="list-icon d-lg-none" @click="open_hamburger = !open_hamburger"/>

      <b-collapse v-model="open_hamburger" class="collapse-hamburger d-lg-none">
          <b-input-group class="b-icon-sarch p-2">
            <b-form-input class="input-search" placeholder="Busca algo ..."></b-form-input>
            <b-input-group-prepend is-text class="button-search">
                <b ><b-icon icon="search" /></b>
            </b-input-group-prepend>
          </b-input-group>

          <b-nav-item :to="{ name: 'Home' }" class="p-2 nav-item-my" @click="open_hamburger = !open_hamburger">
            <b-icon icon="house-door" variant="light" />
            <span class="ms-1">Home</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'Message' }" class="p-2" @click="open_hamburger = !open_hamburger">
            <b-icon icon="chat" variant="light" />
            <span class="ms-1">Messages</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'ToShare' }" class="p-2" @click="open_hamburger = !open_hamburger">
            <b-icon icon="arrow-up-right-square" variant="light" />
            <span class="ms-1">Share</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'Notification' }" variant="light" class="p-2" @click="open_hamburger = !open_hamburger">
            <b-icon icon="heart" variant="light" />
            <span class="ms-1">Notifications</span>
          </b-nav-item>

          <b-nav-item :to="{ name: 'Message' }" class="p-2" @click="redirectProfile">
            <span class="ms-1">Profile</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'ToShare' }" class="p-2" @click="open_hamburger = !open_hamburger">
            <span class="ms-1">Settigns</span>
          </b-nav-item>
          <b-nav-item :to="{ name: 'Notification' }" variant="light" class="p-2" @click="logoutAction()">
            <span class="ms-1">Log out</span>
          </b-nav-item>
      </b-collapse>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";
import utils from "@/libs/utils";

export default {
  data() {
    return {
      open_hamburger: false
    }
  },
  methods: {
    ...mapActions(["logout"]),

    redirectProfile() {
      this.open_hamburger = false;
      this.$router.push({name: 'Profile', params:{uuid: utils.getUserData().uuid}}).catch(() => {})
    },
    logoutAction() {
      this.$emit('clear_user_uuid');
      localStorage.clear();
      this.logout();

    }
  }
};
</script>

<style>
.main-nav {
  padding: 10px;
  background-color: #444;
  display: flex;
  justify-content: center;
  height: 80px;
  list-style: none;
}
.main-nav a.router-link-exact-active {
  font-size: 20px;
}
.search-container {
  margin-right: 5em;
  
}
.button-search:hover {
  cursor: pointer;
}
.input-group-text:hover {
  background-color: #FFC107;
  transition: all 200ms;
  border: 1px solid rgb(124, 124, 124);
  
}
.input-group-text:active {
  background-color: #c49407 !important;
}
.input-search {
    outline: none !important;

  background: rgb(46, 46, 46) !important;
  border-color: rgb(124, 124, 124) !important;
  color: white !important;
}
.input-search:focus {
  border: 1px solid #FFC107 !important;
  outline: none !important;
}
.form-control {
  outline: none !important;
}
.dropdown-nav a {
  color: white;
}
.dropdown-nav ul {
  background: gray ;
}
.list-icon {
  font-size: 30px;
}
.list-icon:hover {
  cursor: pointer;
}
.collapse-hamburger {
  z-index: 100;
  position: absolute;
  width: 100%;
  top: 5em;
  left: 0;
  background-color: #444;
  color: white;
  
}
.collapse-hamburger a {
  color: white;
}
.nav-item:hover{
  background-color: rgb(108, 108, 108);
}
</style>