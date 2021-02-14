import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/storeIndex'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/month/:month'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginPageView')
    },
    {
      path: '/day/:day',
      name: 'day',
      component: () => import('../views/accountDayView')
    },
    {
      path: '/month/:month',
      name: 'month',
      component: () => import('../views/accountMonthView')
    },
    {
      path: '/year/:year',
      name: 'year',
      component: () => import('../views/accountYearView')
    },
    {
      path: '/write',
      name: 'write',
      component: () => import('../views/accountWriteView')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    next('/login')
    return
  }
  next()
})

export { router }
