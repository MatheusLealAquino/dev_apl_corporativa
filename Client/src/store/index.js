import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import user from './user'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // then we reference it
      user
    },

    strict: false
  })

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./user'], () => {
      const newUser = require('./user').default
      Store.hotUpdate({ modules: { user: newUser } })
    })
  }

  return Store
}
