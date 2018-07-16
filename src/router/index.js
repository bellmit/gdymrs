import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import home from './home'
import proposal from './proposal'
import backlog from './backlog'
import policy_list from './policy'
import test from './test'
import logins from './logins'
import down from './down'
import service from './service'
import productManual from './productManual'
import personal from './personal'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/logins/login'
    },
    ...logins,
    ...home,
    ...backlog,
    ...proposal,
    ...policy_list,
    ...test,
    ...down,
    ...service,
    ...productManual,
    ...personal
  ]
})
router.beforeEach((to, from, next) => {
  store.commit('TOGGLE_HEADER', to.meta.hasHeader != false)
  store.commit('TOGGLE_FOOTER', to.meta.hasFooter != false)
  store.commit('TOGGLE_TABS', to.meta.hasTabs == true)
  if (to.meta.login != false && !store.state.common.user) {
    store.commit('TOGGLE_TOAST', {
      toast: true,
      toastMsg: '请先登录！'
    })
    next('/page/login')
  } else {
    next()
  }
})

export default router