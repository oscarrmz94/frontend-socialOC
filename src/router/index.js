import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {need_authentication: true}
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
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
  // {
  //   path: '/:pathMatch(.*)?',
  //   name: 'NotFound',
  //   component: () => import('../views/404.vue')
  // },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const authentication = to.matched.some(item => item.meta.need_authentication)
  console.log(localStorage.getItem('token') === null)
  if (authentication && localStorage.getItem('token') === null) {
    console.log('he entrado en el primero')

    next({name: 'Login'})
  } else {

    next()
  }
})

export default router
