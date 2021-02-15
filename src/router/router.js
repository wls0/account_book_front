import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/storeIndex'
import dayjs from 'dayjs'
Vue.use(VueRouter)
const date = dayjs(new Date()).format('YYYY-MM')
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: `/month/${date}`
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginPageView')
    },
    {
      path: '/day/:day',
      name: 'day',
      component: () => import('../views/accountDayView'),
      meta: {
        auth: true
      }
    },
    {
      path: '/month/:month',
      name: 'month',
      component: () => import('../views/accountMonthView'),
      meta: {
        auth: true
      }
    },
    {
      path: '/year/:year',
      name: 'year',
      component: () => import('../views/accountYearView'),
      meta: {
        auth: true
      }
    },
    {
      path: '/write',
      name: 'write',
      component: () => import('../views/accountWriteView'),
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    next('login')
    return
  }
  next()
})

export { router }
