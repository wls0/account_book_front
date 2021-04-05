import {
  login,
  findId,
  signup,
  monthCost,
  yearCost,
  dayCost,
  write,
  edit,
  deleteAccount
} from '../api/url'
import { deleteCookie, tokenSaveCookie } from '../util/cookie'
import { router } from '../router/router'

const LOGIN = async ({ commit }, userForm) => {
  const data = await login(userForm)
  tokenSaveCookie(data.data.token.access_token)
  commit('SET_LOGIN', data)
}
const FIND_ID = async ({ commit }, id) => {
  const data = await findId(id)
  await commit('SET_FIND_ID', data)
}
const SIGN_UP = async ({ commit }, box) => {
  const data = await signup(box)
  await commit('SET_SIGN_UP', data)
}
const MOVE_SIGNUP_PAGE = async ({ commit }) => {
  router.push({ name: 'signup' })
}
const LOGOUT = async ({ commit }) => {
  deleteCookie('user')
  await commit('SET_LOGOUT')
  location.href = process.env.VUE_APP_API_URL + '/login'
}
const MONTH = async ({ commit }, date) => {
  const data = await monthCost(date)
  await commit('SET_MONTH_COST', data)
}
const MOVE_MONTH = async ({ commit }, date) => {
  const data = await monthCost(date)
  await commit('SET_MONTH_COST', data)
  router.push({ name: 'month', params: { month: date } })
}
const YEAR = async ({ commit }, date) => {
  const data = await yearCost(date)
  await commit('SET_YEAR_COST', data)
}
const MOVE_YEAR = async ({ commit }, date) => {
  const data = await yearCost(date)
  await commit('SET_YEAR_COST', data)
  router.push({ name: 'year', params: { year: date } })
}
const DAY = async ({ commit }, date) => {
  const data = await dayCost(date)
  router.push({ name: 'day', params: { day: date } })
  await commit('SET_DAY_COST', data)
}
const MOVE_DAY = async ({ commit }, date) => {
  const data = await dayCost(date)
  await commit('SET_DAY_COST', data)
  router.push({ name: 'day', params: { day: date } })
}
const WRITE = async ({ commit }, data) => {
  const result = await write(data)
  await commit('SET_WRITE', result)
  commit('SET_WRITE_TABLE', data)
}
const EDIT = async ({ commit }, data) => {
  await edit(data)
  location.href = process.env.VUE_APP_API_URL + `/day/${data.date}`
}
const DELETE = async ({ commit }, data) => {
  await deleteAccount(data.id)
  location.href = process.env.VUE_APP_API_URL + `/day/${data.date}`
  // router.push({ name: 'month', params: { month: data.month } })
}
export {
  LOGIN,
  FIND_ID,
  SIGN_UP,
  LOGOUT,
  MONTH,
  MOVE_MONTH,
  YEAR,
  MOVE_YEAR,
  DAY,
  MOVE_DAY,
  WRITE,
  EDIT,
  DELETE,
  MOVE_SIGNUP_PAGE
}
