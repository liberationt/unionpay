import request from '@/utils/request'

// 获取代办数量
export function getTodoCount(query={}) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/system/todoTask/getTodoCount',
            method: 'get'
        })
        resolve(response);
    })
}

// 获取代办列表
export function listTodo(data) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/system/todoTask/list',
            method: 'post',
            data: data
        })
        resolve(response);
    })
}

// 获取当前用户的各任务类型代办任务数量
export function getTypeCount(data) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/system/todoTask/getTypeCount',
            method: 'get'
        })
        resolve(response);
    })
}

// 获取当前用户的某项任务类型代办状态
export function getStatusCountByType(type) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/system/todoTask/getStatusCountByType/' + type,
            method: 'get'
        })
        resolve(response);
    })
}