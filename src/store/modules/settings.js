// sam add
import { getSearchKeyword } from '@/api/solution';
import { listDept } from '@/api/system/dept';
import { clearDataField } from '@/utils/ruoyi';


import defaultSettings from '@/settings';

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings;

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || '';
const state = {
    title: '',
    theme: storageSetting.theme || '#409EFF',
    sideTheme: storageSetting.sideTheme || sideTheme,
    showSettings: showSettings,
    topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
    tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
    fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
    sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
    dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
    deptList: [],
    hotWords: []
}
const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value;
        }
    },
    SET_HOT_WORDS: (state, data) => {
        state.hotWords = data;
    },
    SET_DEPT_LIST: (state, data) => {
        state.deptList = data;
    }
}

const actions = {
    // 修改布局设置
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data);
    },
    // 设置网页标题
    setTitle({ commit }, title) {
        state.title = title;
    },
    // 获取热词列表
    async getHotWords({ commit }) {
        var res = await getSearchKeyword();
        if (res.code === 200) {
            let list = res.data.map(str => {
                return {
                    value: str
                }
            })
            commit('SET_HOT_WORDS', list);
        }
    },
    // 获取热词列表
    async getDeptList({ commit }) {
        listDept().then(res => {
            if (res.code === 200) {
                console.log('getDeptList', res);
                let list = res.data.map(item => {
                    item = clearDataField(item);
                    return item;
                })
                commit('SET_DEPT_LIST', list);
            }
        });
        
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
