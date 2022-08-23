import request from '@/utils/request'

// 查询题录分类统计
export function getTopicCategoryCount() {
    return request({
        url: '/standard/topic/getTopicCategoryCount',
        method: 'get',
    })
}
