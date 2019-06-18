import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import Store from '../store'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (Store().getters['user/isLogged']) {
        if (to.path === 'auth/login') {
          next('')
        } else {
          next()
        }
      } else {
        next('/auth/signIn')
      }
    } else {
      next()
    }
  })

  return Router
}
