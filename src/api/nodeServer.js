import request from '@/utils/request';

var protocal = process.env.VUE_APP_NODE_API;

// 文本内容解析成math的XML
export function nodeDbs(data={}, url="") {
	if (url) {
		protocal = url;
	}
    return new Promise((resolve, reject) => {
        let response = request({
            url: protocal + '/nodedbs',
            method: 'post',
            data: data
        })
        resolve(response);
    })
}

export function nodeDocument(data={}, url="") {
	if (url) {
		protocal = url;
	}
    return new Promise((resolve, reject) => {
        let response = request({
            url: protocal + '/nodedocument',
            method: 'post',
            data: data
        })
        resolve(response);
    })
}
// 文件处理
export function nodeFileSer(data={}, url="") {
	if (url) {
		protocal = url;
	}
    return new Promise((resolve, reject) => {
        let response = request({
            url: protocal + '/nodefile',
            method: 'post',
            data: data
        })
        resolve(response);
    })
}
