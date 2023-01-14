import request from '@/utils/request'

// 查询首页活动管理列表
export function listActivity (query) {
  return request({
    url: '/system/person/getList',
    method: 'get',
    params: query
  })
}

export function syncEvents (query) {
  return request({
    url: '/system/person/syncEvents',
    method: 'get',
    params: query
  })
}

// 查询首页活动管理列表
export function getPersonRecordList (personId) {
  return request({
    url: '/system/person/getPersonRecordList/' + personId,
    method: 'get'
  })
}
