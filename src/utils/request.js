/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import axios from 'axios'
// import toast from './toast'

function myToast(msg) {
  return new toast(msg)
}

let TOKEN = ''

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function() {
        callback(WebViewJavascriptBridge)
      },
      false
    )
  }

  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

function getUserInfo() {
  if (/android/i.test(navigator.userAgent)) {
    try {
      let userInfo = eval('(' + window.android.getInfo() + ')')
      return userInfo
    } catch (e) {
      console.log(e, 'android报错')
    }
  } else if (/ios|iphone|ipod|pad/i.test(navigator.userAgent)) {
    try {
      setupWebViewJavascriptBridge(function(bridge) {
        var data = 'hello'
        bridge.callHandler('getInfo', data, function(resp) {
          return resp
        })
      })
    } catch (e) {
      console.log(e, 'ios报错')
    }
  }
}

const TEMP_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzk3Mjk0NzEsImlhdCI6MTYwNjM3NzMxOCwidWlkIjozNzk3NTA4LCJyb2xlX2lkIjowLCJ1c2VyX2RhdGEiOiJ7XCJ1aWRcIjowLFwiZGV2aWNlX2lkXCI6XCI0QTgzNTBCMi02NzZFLTQ1QjUtOTRFQi05QzBCNTI0MkM1RjlcIixcImxvZ2luX3BsYXRcIjoyfSJ9.DdWUZN-R3eiiCH9HlNrk-FnVuCjOP6riH__rOMLDqLQ'

TOKEN = TEMP_TOKEN

// TOKEN = getUserInfo().token

const baseURL = 'http://api-test.yingtaoclub.net/v1/' // 测试环境
// const baseURL = 'https://slb.yingtaoclub.net/v1/' // 生产环境

// axios 实例
const request = axios.create({
  baseURL,
  withCredentials: true, // 跨域请求时发送cookie
  timeout: 6000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // config 中包含了所有的请求参数，可以在这里对请求参数进行处理，如：添加默认请求参数，扩展管理等

    // 添加 token 设置data默认值
    config.headers['Authorization'] = TOKEN
    config.data = config.data || {}

    return config
  },
  (error) => {
    // do something with request error
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // const res = response.data

    // // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    return response.data
  },
  (error) => {
    // const data = error.response.data
    // const status = error.response.status

    // 对不同状态码进行管理
    // if (status === 401) {
    //   console.log('登录已过期')
    // } else if (status === 500) {
    //   console.log('服务器错误')
    // }
    return Promise.reject(error)
  }
)

export default request
