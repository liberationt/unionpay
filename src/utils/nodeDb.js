/**
 * -------------------------------------------------------------------------------------------------------
 * @desc 系统全局通用数据处理，包括接口处理
 * @author sam.shen by 2021-10-28
 * -------------------------------------------------------------------------------------------------------
 */
import { v4 as uuidv4 } from 'uuid';
// import 
import { Message } from 'element-ui';
import { nodeDbs, nodeDocument, nodeFileSer } from '@/api/nodeServer';
import * as flowApi from '@/api/workflow';
export default {
    /**
     * @description 提交数据到redis
     */
    async putRedis(key="", data=null, nodeUrl) {
        var condition = {
            type: 'redis',
            key
        }
        if (data) {
            condition.data = data
        }
        return await nodeDbs(condition, nodeUrl);
    },

    async queryData(condition={}, nodeUrl='') {
        return await nodeDbs(condition, nodeUrl);
    },

    async queryApi(condition) {
        return await nodeDbs(condition);
    },
	
	/**
     * @description 请求JAVA后台接口
	 * @param {Object} params { apiName:"", append:true, data:{} } ==> append=true 表示URL后带参数
     */
	async postApi(params={}, url="") {
		if (params.apiName && typeof flowApi[params.apiName] === 'function' ) {
			var data = params.data || {};
			return await this.queryApi(flowApi[params.apiName](data, url)); //[params.apiName](data);
		} else {
			Message({
                message: '请求接口名称错误！',
                type: 'error'
            })
		}
		return null;
	},

    /**
     * @description node服务器写入文件
     * @param {Object}  params => { content, filepath }
     */
    async putFile(params={}, nodeUrl='') {
        var condition = _.merge({}, { type: 'writeFile' }, params);
        return await nodeDocument(condition, nodeUrl);
    },

    /**
     * @description node服务器读取文件
     * @param {Object}  params => { filepath }
     */
    async getFile(params={}, nodeUrl='') {
        var condition = _.merge({}, { type: 'readFile' }, params);
        var res = await nodeDocument(condition, nodeUrl);
        if (res.error_code === 200) {
            return res.data;
        }
        return null;
    },

    async uploadFile(formData=null, isSingle=false, nodeUrl="") {
        var res = await nodeFileSer(formData, nodeUrl);
        if (res.error_code === 200) {
            return !isSingle ? res.data : res.data[0]['outFile'];
        }
        return null;
    }
}
