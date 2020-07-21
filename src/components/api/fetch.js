import axios from 'axios'// 引入axios
import nprogress from 'nprogress'
// 引入样式
import 'nprogress/nprogress.css'
export function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({ // instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
      // 所有的请求都会带上这些配置，比如全局都要用的身份信息等。
      headers: {
        'Content-Type': 'application/json'
        // 'token_in_header': global_.token,//token从全局变量那里传过来
      },
      timeout: 30 * 1000 // 30秒超时
    })
    // 拦截器  请求之前请求头要添加token信息
    instance.interceptors.request.use((config) => {
    //   console.log(config)
      nprogress.start()
      config.headers.Authorization = window.sessionStorage.getItem('token')
      return config
    })
    instance.interceptors.response.use((config) => {
      //   console.log(config)
      nprogress.done()
      return config
    })

    instance(options)
      .then(response => { // then 请求成功之后进行什么操作
        resolve(response)// 把请求到的数据发到引用请求的地方
      })
      .catch(error => {
        console.log('请求异常信息：' + error)
        reject(error)
      })
  })
}
