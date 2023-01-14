import request from '@/utils/request'

// 查询首页活动管理列表
export function getVehicleList (query) {
  return request({
    url: '/system/vehicle/getList',
    method: 'get',
    params: query
  })
}

// 查询首页活动管理列表
export function syncCrossRecords (query) {
  return request({
    url: '/system/vehicle/syncCrossRecords',
    method: 'get',
    params: query
  })
}

export function getVehicleRecordist (query) {
  return request({
    url: '/system/vehicle/getVehicleRecordist',
    method: 'get',
    params: query
  })
}
