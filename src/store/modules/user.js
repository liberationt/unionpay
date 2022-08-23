import { login, logout, getInfo, refreshToken } from '@/api/login';
import {
    getToken,
    setToken,
    setExpiresIn,
    removeToken
} from '@/utils/auth';

import { clearDataField } from '@/utils/ruoyi';

import { listAllUser } from '@/api/system/user';

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: require('@/assets/images/profile.jpg'),
        roles: [],
        permissions: [],
        userList: [],
		userInfo: null,
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_EXPIRES_IN: (state, time) => {
            state.expires_in = time;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions;
        },
		// sam add
		SET_USER_INFO: (state, data) => {
            state.userInfo = data;
        },
        SET_LIST: (state, data) => {
            state.userList = data;
        }
    },

    actions: {
        getUserList({ commit }) {
            listAllUser().then(res => {
                console.log('listUser', res);
                let list = res.rows.map(item => {
                    item = clearDataField(item);
                    return item;
                })
                commit('SET_LIST', list);
            })
        },
        // 登录
        Login({ commit }, userInfo={}) {
            const username = userInfo.username.trim();
            const password = userInfo.password;
            const code = userInfo.code;
            const uuid = userInfo.uuid;
            return new Promise((resolve, reject) => {
                login(username, password, code, uuid).then(res => {
                    let data = res.data;
                    setToken(data.access_token);
                    commit('SET_TOKEN', data.access_token);
                    setExpiresIn(data.expires_in);
                    commit('SET_EXPIRES_IN', data.expires_in);
                    resolve();
                }).catch(error => {
                    reject(error);;
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    const user = res.user;
                    const avatar = (user.avatar == "" || user.avatar == null) ? require("@/assets/images/profile.jpg") : user.avatar;
                    if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', res.roles);
                        commit('SET_PERMISSIONS', res.permissions);
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT']);
                    }
					commit('SET_USER_INFO', user);
                    commit('SET_NAME', user.userName);
                    commit('SET_AVATAR', avatar);
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        // 刷新token
        RefreshToken({ commit, state }) {
            return new Promise((resolve, reject) => {
                refreshToken(state.token).then(res => {
                    setExpiresIn(res.data)
                    commit('SET_EXPIRES_IN', res.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_PERMISSIONS', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user;
