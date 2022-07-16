import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/mainContainerHome.vue'),
    meta: {need_authentication: true}
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message.vue'),
    meta: {need_authentication: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
  path: '/toshare',
  name: 'ToShare',
  component: () => import('../views/Toshare.vue'),
  meta: {need_authentication: true}
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => import('../views/Notification.vue'),
    meta: {need_authentication: true}
  },
  {
    path: '/profile/:uuid',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {need_authentication: true}
  },
  {
    path: '/account/edit',
    name: 'EditProfile',
    component: () => import('../views/profile/editProfile.vue'),
    meta: {need_authentication: true}
  },
  {
    path: '/:pathMatch(.*)?',
    name: 'NotFound',
    component: () => import('../views/Error404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const authentication = to.matched.some(item => item.meta.need_authentication)
  if (authentication && localStorage.getItem('token') === null) {
    next({name: 'Login'})
  } else {

    next()
  }
})

export default router
