import request from '@/utils/request';

/**
 * @description 获取流程模板列表
 * @param {data}  数据参数 {  }
 */
var protocal = process.env.VUE_APP_BASE_API;
/* if(process.env.NODE_ENV !== 'development'){
    protocal = process.env.VUE_APP_BASE_API;
} */

// 获取流程模板
export function getFlowTemplate(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/template/getWFTemplateListJson',
		params: data
	}
}

/**
 * @description 创建流程实例
 * @param {data}  数据参数 { templateId:"", businessId:"", businessType: "", }
 */
export function createInstance(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/instance/createInstanceJson',
		params: data
	}
}

/**
 * @description 更新流程实例
 * @param {data}  数据参数 { instanceId:"", templateId:"" }
 */
export function updateInstance(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/instance/updateInstanceJson',
		params: data
	}
}

/**
 * @description 获取流程实例相关数据
 * @param {data}  数据参数 { instanceId:"" }
 */
export function getInstanceInfo(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/instance/getInstanceInfoJson',
		params: data
	}
}

/**
 * @description 流程实例运行流转
 * @param {data}  数据参数 { instanceId:"", currentNodeId:"", stepParams:JSON.stringify, formData:JSON.stringify }
 */
export function runInstance(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/instance/runInstanceJson',
		params: data
	}
}

/**
 * @description 流程实例路径历史
 * @param {data}  数据参数 { instanceId:"" }
 */
export function getInstanceHistory(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/instance/getInstanceHistoryJson',
		params: data
	}
}

/**
 * @description 查询当前节点流程实例
 * @param {data}  数据参数 { instanceId:"" }
 */
export function getInstanceCurrentNode(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/instance/getInstanceCurrentNodeJson',
		params: data
	}
}

/**
 * @description 流程撤回
 * @param {data}  数据参数 { instanceId:"", trailId:"" }
 */
export function rollbackStep(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/instance/rollbackStepJson',
		params: data
	}
}

/**
 * @description 获取API接口列表
 * @param {data}  数据参数 { pageNum:1, pageSize:20 }
 */
export function getApiCodeList(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/code/getApiCodeList',
		params: data
	}
}

/**
 * @description 新增API接口
 * @param {data}  数据参数 { codeName:"", code:"" }
 */
export function addApiCode(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/code/addApiCodeJson',
		params: data
	}
}

/**
 * @description 修改API接口
 * @param {data}  数据参数 { codeId:"", codeName:"", code:"" }
 */
export function editApiCode(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/code/editApiCodeJson',
		params: data
	}
}

/**
 * @description 获取API接口代码
 * @param {data}  数据参数 { codeId:"" }
 */
export function getApiCode(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/code/getApiCode/' + data.codeId,
		params: data
	}
}

/**
 * @description 执行API接口代码
 * @param {data}  数据参数 { params: {codeId:"", ...}  }
 */
export function runApiCode(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/code/runApiCodeJson',
		params: data
	}
}


/**
 * @description 获取组织部门
 * @param {data}  数据参数 { params: {codeId:"", ...}  }
 */
export function getOrgList(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/assist/auth/getOrgList',
		params: data
	}
}


/**
 * @description 获取组织部门
 * @param {data}  数据参数 { params: {codeId:"", ...}  }
 */
export function getRoleList(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/assist/auth/getRoleList',
		params: data
	}
}


/**
 * @description 获取用户
 * @param {data}  数据参数 { params: {codeId:"", ...}  }
 */
export function getUserList(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/assist/auth/getUserList',
		params: data
	}
}

/**
 * @description 根据角色获取用户
 * @param {data}  数据参数 { params: {codeId:"", ...}  }
 */
export function getUserListByRole(data, url="") {
	if (url) {
		protocal = url;
	}
	return {
		type: "remoteUrl",
		method: "post",
		url: protocal + '/assist/auth/getUserListByRole',
		params: data
	}
}
