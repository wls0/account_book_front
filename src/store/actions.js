import {
  login,
  monthCost,
  yearCost,
  dayCost,
  write
} from '../api/url'
import { deleteCookie, tokenSaveCookie } from '../util/cookie'
import { router } from '../router/router'

const LOGIN = async ({ commit }, userForm) => {
  const data = await login(userForm)
  tokenSaveCookie(data.data.access_token)
  commit('SET_LOGIN', data)
}
const LOGOUT = ({ commit }) => {
  deleteCookie('user')
  commit('SET_LOGOUT')
  location.href = process.env.VUE_APP_API_URL + '/login'
}
const MONTH = async ({ commit }, date) => {
  const data = await monthCost(date)
  commit('SET_MONTH_COST', data)
}
const MOVE_MONTH = async ({ commit }, date) => {
  const data = await monthCost(date)
  commit('SET_MONTH_COST', data)
  router.push({ name: 'month', params: { month: date } })
}
const YEAR = async ({ commit }, date) => {
  const data = await yearCost(date)
  commit('SET_YEAR_COST', data)
}
const MOVE_YEAR = async ({ commit }, date) => {
  const data = await yearCost(date)
  commit('SET_YEAR_COST', data)
  router.push({ name: 'year', params: { year: date } })
}
const DAY = async ({ commit }, date) => {
  const data = await dayCost(date)
  console.log(data)
  router.push({ name: 'day', params: { day: date } })
  await commit('SET_DAY_COST', data)
}
const MOVE_DAY = async ({ commit }, date) => {
  const data = await dayCost(date)
  commit('SET_DAY_COST', data)
  router.push({ name: 'day', params: { day: date } })
}
const WRITE = async ({ commit }, data) => {
  await commit('SET_WRITE_TABLE', data)
  const result = await write(data)
  commit('SET_WRITE', result)
}
export {
  LOGIN,
  LOGOUT,
  MONTH,
  MOVE_MONTH,
  YEAR,
  MOVE_YEAR,
  DAY,
  MOVE_DAY,
  WRITE

}
