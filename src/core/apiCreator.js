import { mapObject } from './utils'
const FORM = { 'Content-Type': 'application/x-www-form-urlencoded' }
const JSON = { 'Content-Type': 'application/json' }

let defaultHandle = (err) => {
  console.log({ err })
}

let apiCreator = {
  init: init,
  errorHandle: defaultHandle
}

function init (config = {}) {
  const result = mapObject(config, generateApis)
  return result
}
function generateApis (api) {
  return {
    doGet: doRequest('GET', api, null),
    doPost: doRequest('POST', api, FORM),
    doPut: doRequest('PUT', api, FORM),
    doPatch: doRequest('PATCH', api, FORM),
    doPostJson: doRequest('POST', api, JSON),
    doPutJson: doRequest('PUT', api, JSON),
    doPatchJson: doRequest('PATCH', api, JSON),
    doDelete: doRequest('DELETE', api, null)
  }
}
function doRequest (method, url, headers) {
  const options = {}
  return function (params, options = {}) { // 接受参数
    // 匹配参数, 替换接口地址上的{xxx}
    let destUrl = url
    Object.keys(params).forEach(key => {
      let placeholder = `{${key}}`
      if (destUrl.includes(placeholder)) {
        destUrl = destUrl.replace(placeholder, params[key])
        delete params[key]
      }
    })
    // url 参数没有完全替换, 报错
    if (destUrl.indexOf('{') >= 0 || destUrl.indexOf('}') >= 0) {
      throw new Error(`${destUrl} is not valid request url, please check params in url had passed`)
    }

    options.method = method

    options.headers = { ...options.headers, ...headers }
    // todo 设置请求头
    // 请求参数格式化(get/post/postjson)
    console.log({ options })
    return fetch(destUrl, options)
      .then()
      .catch(err => {
      // format proto of err
      // preventDefault() to prevent errorHandle
        apiCreator.errorHandle(err)
        throw err
      })
  }
}

export default apiCreator
// app.apis.doGet(params)
