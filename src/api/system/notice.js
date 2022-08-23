import request from '@/utils/request'

// 查询公告列表
export function listNotice(query={}) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/system/notice/list',
            method: 'post',
            data: query
        })
        resolve(response);
    })
}

// 查询公告详细
export function getNotice(noticeId) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/system/notice/' + noticeId,
            method: 'get'
        })
        resolve(response);
    })
}

// 新增公告
export function addNotice(data) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/system/notice',
            method: 'post',
            data: data
        })
        resolve(response);
    })
}

// 修改公告
export function updateNotice(data) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/system/notice',
            method: 'put',
            data: data
        })
        resolve(response);
    })
}

// 删除公告
export function delNotice(noticeId) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/system/notice/' + noticeId,
            method: 'delete'
        })
        resolve(response);
    })
}
