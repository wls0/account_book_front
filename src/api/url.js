import { instance, instanceAuth } from './urlIndex'
function login (data) {
  return instance.post('/user/login', data, { credentials: true }).catch(err => {
    return err.response
  })
}
function findId (data) {
  return instance.get(`/user/${data}`, { credentials: true }).catch(err => {
    return err.response
  })
}
function signup (data) {
  return instance.post('/user/signup', data, { credentials: true }).catch(err => {
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
function edit (data) {
  return instanceAuth.put('/account', data, { credentials: true }).catch(err => {
    return err.response
  })
}
function deleteAccount (id) {
  console.log(id)
  return instanceAuth.delete(`/account/${id}`, { credentials: true }).catch(err => {
    return err.response
  })
}
export {
  login,
  findId,
  signup,
  monthCost,
  yearCost,
  dayCost,
  write,
  edit,
  deleteAccount
}
