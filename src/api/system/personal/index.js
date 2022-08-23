import request from '@/utils/request'
//消息列表
export function getMessageList(data) {
    return request({
      url: '/system/message/list',
      method: 'post',
      data
    })
}
// 待办列表
export function getTodoTaskList(data) {
    return request({
      url: '/system/todoTask/list',
      method: 'post',
      data
    })
}
//获取各任务类型代办任务数量
export function getTypeCount(){
  return request({
    url: '/system/todoTask/getTypeCount',
    method: 'get',
  })
}
//获取前用户的某项任务类型代办状态
export function getStatusCount(type){
  return request({
    url: `/system/todoTask/getStatusCountByType/${type}`,
    method: 'get',
  })
}


//收藏列表  用户行为
export function getBehaviorRecordList(data) {
  return request({
    url: '/solution/behaviorRecord/list',
    method: 'post',
    data
  })
}
// 知识列表
export function getKnowledgeList(data) {
  return request({
    url: '/solution/knowledge/myKnowledge',
    method: 'post',
    data
  })
}