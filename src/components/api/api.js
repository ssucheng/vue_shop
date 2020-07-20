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

// 添加分类
export function addCateApi (url, params) {
  return fetch({
    url: api.Hallowmas + url,
    method: 'post',
    data: {
      cat_pid: params.cat_pid,
      cat_name: params.name,
      cat_level: params.cat_level
    }
  })
}

// 编辑提交分类
export function editCateApi (url, params) {
  return fetch({
    url: api.Hallowmas + url + '/' + params.id,
    method: 'put',
    data: {
      cat_name: params.name
    }
  })
}

// 删除分类
export function delCateApi (url, params) {
  return fetch({
    url: api.Hallowmas + url + '/' + params.id,
    method: 'delete'
  })
}

// 分类参数管理参数列表
export function getCateAttributesApi (url, params) {
  return fetch({
    url: api.Hallowmas + url + '/' + params.cateId + '/' + 'attributes',
    method: 'get',
    params: {
      sel: params.activeName
    }
  })
}

// 添加董改参数或者静态属性
export function addCateOrApi (url, params) {
  return fetch({
    url: api.Hallowmas + url + '/' + params.cateId + '/' + 'attributes',
    method: 'post',
    data: {
      attr_name: params.attr_name,
      attr_sel: params.attr_sel
    }
  })
}

// 编辑提交参数
export function putCateAttrApi (url, params) {
  return fetch({
    url: api.Hallowmas + url + '/' + params.id + '/' + 'attributes' + '/' + params.attr_id,
    method: 'put',
    data: {
      attr_name: params.attr_name,
      attr_sel: params.attr_sel,
      attr_vals: params.attr_vals
    }
  })
}

// 删除参数
export function delCateAttrApi (url, params) {
  return fetch({
    url: api.Hallowmas + url + '/' + params.id + '/' + 'attributes' + '/' + params.attr_id,
    method: 'delete'

  })
}

// 商品列表数据
export function getGoodsApi (url, params) {
  return fetch({
    url: api.Hallowmas + url,
    method: 'get',
    params: {
      query: params.query,
      pagenum: params.pagenum,
      pagesize: params.pagesize
    }

  })
}

// 删除商品
export function delGoodsApi (url, params) {
  return fetch({
    url: api.Hallowmas + url + '/' + params.id,
    method: 'delete'
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
