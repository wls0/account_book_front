import { instance, instanceAuth } from './urlIndex'
function login (data) {
  return instance.post('/user/login', data, { credentials: true }).catch(err => {
    return err.response
  })
}
function monthCost (date) {
  return instanceAuth.get(`/account/month/${date}`, { credentials: true }).catch(err => {
    return err.response
  })
}
function yearCost (date) {
  return instanceAuth.get(`/account/year/${date}`, { credentials: true }).catch(err => {
    return err.response
  })
}
function dayCost (date) {
  return instanceAuth.get(`/account/day/${date}`, { credentials: true }).catch(err => {
    return err.response
  })
}
function write (data) {
  return instanceAuth.post('/account', data, { credentials: true }).catch(err => {
    return err.response
  })
}
export {
  login,
  monthCost,
  yearCost,
  dayCost,
  write
}
