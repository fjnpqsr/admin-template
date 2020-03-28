export const login = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    if (username === 'admin' && password === 'admin') {
      setTimeout(function () {
        resolve({ success: true, user: { username, password } })
      }, 2000)
    } else {
      setTimeout(function () {
        reject(new Error('账号或密码错误'))
      }, 2000)
    }
  })
}
