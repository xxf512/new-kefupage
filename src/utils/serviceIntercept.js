import axios from 'axios'
import axiosService from 'axios-service'

const TIME_OUT = 15000

const axiosServiceReal = axiosService?.default ? axiosService.default : axiosService

console.log(axiosService)
axiosServiceReal.init(axios, {
  // 基础设置
  defaults: {
    withCredentials: true
  },
  requestDefaults: {
    // response.data下面的配置
    // server端请求msg(
    msgKey: 'msg',
    // server端数据的key
    dataKey: 'data',
    // server端请求状态的key
    codeKey: 'code',
    // server端请求成功的状态, 注意: 此为response.data下该接口请求成功状态码, 非浏览器中http请求返回的成功状态(200)
    successCode: 200
  }
})

// 超时时间
axios.defaults.timeout = TIME_OUT