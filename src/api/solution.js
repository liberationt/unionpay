import request from '@/utils/request';

/**
 * @description 获取待办|已办 我的解决方案等
 * @param {data}  数据参数 { params: {codeId:"", ...}  }
 */
export function getTabBottomMsg(params={}) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/index/tabBottomMsg',
            method: 'get',
            params
        })
        resolve(response);
    })
}


/**
 * @description 技术能力手册目录章节树
 * @param {data}  数据参数 { params: {codeId:"", ...}  }
 */
export function getManualCatalogTree(data={}) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/manualCatalog/treeselect',
            method: 'post',
            data: data
        })
        resolve(response);
    })
}

/**
 * @description 技术能力手册目录列表
 * @param {data}  数据参数 { params: {codeId:"", ...}  }
 */
export function manualCatalogList(data={}) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/manualCatalog/list',
            method: 'post',
            data: data
        })
        resolve(response);
    })
}

/**
 * @description 获取技术能力手册目录详细信息
 * @param {data}  数据参数 { params: {codeId:"", ...}  }
 */
export function manualCatalogDetail(id="") {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/manualCatalog/' + id,
            method: 'get'
        })
        resolve(response);
    })
}

/**
 * @description 删除技术能力手册目录
 * @param {data}  数据参数 { params: {codeId:"", ...}  }
 */
export function removeManualCatalog(id="") {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/manualCatalog/' + id,
            method: 'delete'
        })
        resolve(response);
    })
}

/**
 * @description 获取专家用户
 * @param {data}  数据参数 { userType: 用户类型 0.用户库,1.专家库  } solution/index/topUsers/{userType}
 */
export function getTopUsers(type="") {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/index/topUsers/' + type,
            method: 'get'
        })
        resolve(response);
    })
}

/**
 * @description 获取知识列表
 * @param {data}
 */
export function getKnowledgeList(data={}) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/knowledge/list',
            method: 'post',
            data
        })
        resolve(response);
    })
}


/**
 * @description 热词检索
 * @param {data}
 */
export function getSearchKeyword(key='') {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/behaviorRecord/getSearchKeyword/' + key,
            method: 'get'
        })
        resolve(response);
    })
}


/**
 * @description 全文检索
 * @param {data}
 */
export function getPageListEs(data={}) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/search/pageListEs',
            method: 'post',
            data
        })
        resolve(response);
    })
}

/**
 * @description 解决方案分类
 * @param {data}
 */
export function getSelectTypelist(data={}) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/solutionClassify/list',
            method: 'post',
            data
        })
        resolve(response);
    })
}

/**
 * @description 解决方案分类树
 * @param {data}
 */
export function getSelectTypeTree(data={}) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/solutionClassify/selectTypeTree',
            method: 'get'
        })
        resolve(response);
    })
}

/**
 * @description 获取指定分类和指定分类的所有子级分类解决方案
 * @param {data}
 */
export function getInfoByClassifyId(params={}) {
    return new Promise((resolve, reject) => {
        let response = request({
            url: '/solution/knowledgeSolution/getInfoByClassifyIdOrAncestors',
            method: 'get',
            params
        })
        resolve(response);
    })
}
