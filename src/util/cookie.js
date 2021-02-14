const date = new Date()
date.setTime(date.getTime() + 30 * 12 * 60 * 60 * 1000)

const expires = '; expires=' + date.toGMTString() + ';'
const min = new Date()
min.setTime(date.getTime() + 5 * 60 * 1000)
const expiresMin = '; expires=' + min.toGMTString() + ';'

function tokenSaveCookie (value) {
  document.cookie = `user=${value}` + expires + 'path=/;'
}

function findPwCookie (value) {
  document.cookie = `findPw=${value}` + expiresMin + 'path=/;'
}

function getAuthCookie () {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}

function getFindPwCookie () {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)findPw\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}

function deleteCookie (name) {
  const date = new Date()
  document.cookie = name + '=' + '; expires=' + date.toUTCString() + '; path=/'
}

export {
  tokenSaveCookie,
  getAuthCookie,
  deleteCookie,
  findPwCookie,
  getFindPwCookie
}
