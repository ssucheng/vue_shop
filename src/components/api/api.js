import { fetch } from './fetch' // 引用fetch.js
import api from './url' // 引用url.js

// 查看用户
// export function lookOption (issuer, userId) { // lookOption是你要调用接口的名字，issuer,userId是传进来的参数
//   return fetch({
//     // api.Hallowmas 引用url.js里面的数据
//     url: api.Hallowmas + '/halloween/' + issuer + '/question',
//     method: 'get', // 请求方法
//     params: {
//       currentUserId: userId // 传过去的参数
//     }
//   })
// }

// 用户列表方法
export function getRoles (url) { // lookOption是你要调用接口的名字，issuer,userId是传进来的参数
  return fetch({
    // api.Hallowmas 引用url.js里面的数据
    url: api.Hallowmas + url,
    method: 'get' // 请求方法

  })
}

// 分配用户角色
export function assginRole (url, params) {
  return fetch({
    url: api.Hallowmas + url + '/' + params.id + '/role',
    method: 'put',
    data: {
      rid: params.rid
    }
  })
}
// 商品分类数据列表
export function getCate (url, params) {
  return fetch({
    url: api.Hallowmas + url,
    method: 'get',
    params: {
      type: params.type,
      pagenum: params.pagenum,
      pagesize: params.pagesize
    }
  })
}

// 有新接口的时候像上面那样再来一次
// //修改昵称接口
// export function userID(name){
//   return fetch({
//     url:api.myself_name,
//     method:"put",
//     data:{
//       nickname:name
//     }
//   })
// }
//
//
// //取消转发赞踩接口
// export function cancelForward(articleId,type){
//   return fetch({
//     url:api.detail_article+articleId+"/forwarded_impress",
//     method:"delete",
//     params:{
//       type:type
//     }
//   })
// }
