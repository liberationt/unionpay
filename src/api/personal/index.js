import request from '@/utils/request'

// 获取用户详细信息
export function getUserInfo(userId) {
  return request({
    url: '/system/user/' + userId,
    method: 'get'
  })
}


// 修改用户信息
export function updateUserInfo(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data
  })
}

