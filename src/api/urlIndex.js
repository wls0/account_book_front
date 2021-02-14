import axios from 'axios'
import { setInterceptors } from './common/interceptor'

function createInstance () {
  return axios.create({
    baseURL: process.env.VUE_APP_CONNECT
  })
}

function createInstanceWithAuth () {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_CONNECT
  })
  return setInterceptors(instance)
}

const instance = createInstance()
const instanceAuth = createInstanceWithAuth()
export { instance, instanceAuth }
