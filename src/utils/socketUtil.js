import { isJSON } from './ruoyi';
import $bus from './bus';
export default {
    socketInstance: null,       // socket实例
    socketId: "123",            // 通信ID
	clientName: "",             // 客户 用户名
    /**
     * @description 初始化SOCKET
     * @param{String} origin socket地址： ws://* 或 wss://*
     * @param{Object} params
     */
    initSocket(origin="", params={}) {
        this.socketId = 'user_' + params.userId;
        this.clientName = params.userName;
        this.socketInstance = new WebSocket(origin||process.env.VUE_APP_SOCKET_URL);
        this.socketInstance.onopen = () => {
            if (this.socketInstance.readyState === 1) {
                let msg = {
                    clientId: this.socketId,
                    type: 'LOGIN',
                }
                this.socketInstance.send(JSON.stringify(msg));
                console.log('%c%s', 'color:purple;', `=============SOCKET服务器已连接 接口:${origin}=============`);
            }
        }

        this.socketInstance.onmessage = (msg) => {
            if (msg && msg.data && isJSON(msg.data)) {
                let message = JSON.parse(msg.data);
                if(message.type == "ALL" || message.type == "REQ"){
                    console.info("socket message=>", message)
                    $bus.$emit('onmessage', message.t);
                }
            }
        };
        //关闭事件
        this.socketInstance.onclose = function() {
            console.log("websocket已关闭");
        };
        //发生了错误事件
        this.socketInstance.onerror = function() {
            console.log("websocket发生了错误");
        }
    },
    // 关闭socket连接
    closeSocket() {
        this.socketInstance.close();
        this.socketInstance = null;
        console.log("websocket客户端已关闭");
    },

    /**
     * @description 发送消息
     * @param{Object} data
     */
    sendMsg(data={}) {
        var msg = Object.assign({}, {
            clientId: this.socketId,
			clientName: this.clientName,
            type: 'ALL'
        }, data);
        msg = JSON.stringify(msg);
        this.socketInstance.send(msg);
    },
}
