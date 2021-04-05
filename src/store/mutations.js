
import dayjs from 'dayjs'
// import { router } from '../router/router'

const error = (state, result) => {
  state.msg = result
  state.msgModal = true
}

const SET_LOGIN = async (state, result) => {
  if (result.statusText === 'OK') {
    const date = dayjs(new Date()).format('YYYY-MM')
    location.href = process.env.VUE_APP_API_URL + `/month/${date}`
    // router.push({ name: 'month', params: { month: date } })
  } else {
    console.log(result)
    error(state, result.data)
  }
}
const SET_FIND_ID = async (state, result) => {
  if (result.status === 200) {
    state.idCheck = false
  } else {
    error(state, result.data.data)
  }
}
const SET_SIGN_UP = async (state, result) => {
  if (result.status === 200) {
    state.idCheck = false
    location.href = process.env.VUE_APP_API_URL + '/login'
  } else {
    error(state, result.data.data)
  }
}
const SET_LOGOUT = (state) => {
  state.token = ''
}
const SET_MONTH_COST = (state, result) => {
  if (result.statusText === 'OK') {
    console.log(result.data)
    state.cash = result.data.cash
    state.costList = result.data.costList
    state.hyundai = result.data.hyundai
    state.kb = result.data.kb
    state.lotte = result.data.lotte
    state.samsung = result.data.samsung
    state.shinhan = result.data.shinhan
    state.total = result.data.total
    state.woori = result.data.woori
    state.revenue = result.data.revenue
    state.addAccountList = []
  } else {
    console.log(result)
    error(state, result.data)
  }
}
const SET_YEAR_COST = (state, result) => {
  if (result.statusText === 'OK') {
    console.log(result.data)
    state.cash = result.data.cash
    state.hyundai = result.data.hyundai
    state.kb = result.data.kb
    state.lotte = result.data.lotte
    state.samsung = result.data.samsung
    state.shinhan = result.data.shinhan
    state.total = result.data.total
    state.woori = result.data.woori
    state.revenue = result.data.revenue
    state.addAccountList = []
  } else {
    console.log(result)
    error(state, result.data)
  }
}
const SET_DAY_COST = (state, result) => {
  if (result.statusText === 'OK') {
    console.log(result.data)
    // state.dayAccount = result.data.list
    state.cash = result.data.cash
    state.hyundai = result.data.hyundai
    state.kb = result.data.kb
    state.lotte = result.data.lotte
    state.samsung = result.data.samsung
    state.shinhan = result.data.shinhan
    state.total = result.data.total
    state.woori = result.data.woori
    state.revenue = result.data.revenue
    state.accountList = result.data.list
    state.addAccountList = []
  } else {
    console.log(result)
    error(state, result.data)
  }
}
const SET_WRITE = (state, result) => {
  if (result.statusText !== 'OK') {
    error(state, result.data)
  }
}
const SET_WRITE_TABLE = (state, result) => {
  const list = state.addAccountList
  list.push(result)
}
export {
  SET_LOGIN,
  SET_FIND_ID,
  SET_SIGN_UP,
  SET_LOGOUT,
  SET_MONTH_COST,
  SET_YEAR_COST,
  SET_DAY_COST,
  SET_WRITE,
  SET_WRITE_TABLE
}
