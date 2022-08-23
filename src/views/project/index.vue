<template>
    <div class="project-index-container">
        <header>
            <div class="search-content">
                <commonSearch :data="{ size:'small', fetch:true, selected:true, hotWords }" :typeArr="typeArr"  @change="executeSearch" style="width: 450px;" />
            </div>
            <div class="hive-content">
                <!-- 蜂巢组件 -->
                <pageEnginer v-if="loadedHive" :data="renderHive" :itemData="itemData" @change="changeEvent" />
                <div class="tools" @click.stop.prevent="refreshHive">
                    <i class="el-icon-refresh"></i>
                    <span>恢复</span>
                </div>
            </div>
        </header>

        <main>
            <!-- 解决方案新闻资讯 -->
            <div class="hot-content">
                <noticeFramer :data="hotData" @change="changeEvent" />
            </div>
            <!-- 专家列表等 -->
            <div class="user-content">
                <div class="">
                    <usersFramer :data="expertData" @change="changeUserEvent" />
                </div>
                <div class="">
                    <usersFramer :data="userData" @change="changeUserEvent" />
                </div>
            </div>
        </main>
        <!-- 待办工作|已办工作等 -->
        <div class="my-work">
            <div class="tabs">
                <ul>
                    <li v-for="(tab, idx) in workTabs" :key="idx" :class="{'active': tab.name===activeName}" @click="handleClickTab(tab)">
                        <el-badge :value="tab.nums" :hidden="!tab.nums">
                            <label>{{tab.label}}</label>
                        </el-badge>
                    </li>
                </ul>
            </div>
            <!-- 工作列表 -->
            <div class="datas">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="type" label="类别" width="120">
                        <template slot-scope="scope">
                            <el-tag :type="parseType(scope.row.catalogName)">{{scope.row.catalogName}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="名称">
                        <template slot-scope="scope">
                            <div>{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="日期" width="175">
                        <template slot-scope="scope">
                            <div>{{scope.row.createTime}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 页面底部信息 -->
        <footer>
            <commonFooter />
        </footer>
    </div>
</template>

<script>
    // 页面渲染引擎配置参数
    import { pageEngIntData, commonHeadMenus } from '@/config';
    // 页面渲染引擎
    import pageEnginer from '@/components/pageEnginer';
    // 门户菜单等组件
    import { portalMenu, noticeFramer, usersFramer, commonFooter, commonSearch } from '@/components/commons/index.js';
    // 本地缓存处理
    import { storeData } from '@/utils/index.js';
    // API接口，用户|专家 | 热词
    import { getTabBottomMsg, getTopUsers, getSearchKeyword } from '@/api/solution';
    // API接口，新闻咨询
    import { listNotice } from '@/api/system/notice';
    // API接口，代办任务等
    import { getTodoCount, listTodo } from '@/api/system/todo';
    // vuex
    import { mapGetters } from 'vuex';
    export default {
        name: 'project-index',
        components: {
            pageEnginer, portalMenu, noticeFramer, usersFramer, commonFooter, commonSearch
        },
        computed: {
            ...mapGetters(['hotWords']),
            renderHive() {
                return Object.assign({}, pageEngIntData, { pageId:"b8899b14-b312-489f-a8e6-2e75e239515a" });
            }
        },
        data() {
            return {
                // 导航菜单条
                headerMenus: commonHeadMenus,
                typeArr: [
                    { label: '原子知识', value:'atom' },
                    { label: '解决方案', value:'solutuion' },
                    { label: '更多知识', value:'more' },
                    { label: '知识合辑', value:'album' },
                ],
                loadedHive: true,
                // 蜂巢路由列表
                itemData: {
                    urlPaths: [{ label:'测试一',value:'/test' }, { label:'测试二',value:'/test' }],       // 系统默认跳转的路由列表，应从接口获取
                    arrList: [],                                                                         // 用户自定义蜂巢数据，应从接口获取
                },
                hotData: {
                    showTitle:true,
                    clickAll: true,
                    title: '新闻资讯',
                    align: 'left',
                    path: '/news',
                    pageId:"ee1454b4-7525-4301-8eee-ec08047e0a36",
                    listData: []
                },
                expertData: {
                    showTitle:true,
                    clickAll: true,
                    title: '专家库',
                    grid: 3,
                    align: 'left',
                    pageId: "510ee71d-1fe0-4656-9f29-2f65e91e1c5a",
                    path: '/project/users',
                    listData: []
                },
                userData: {
                    showTitle:true,
                    clickAll: true,
                    title: '用户库',
                    grid: 3,
                    align: 'left',
                    pageId: "510ee71d-1fe0-4656-9f29-2f65e91e1c5a",
                    path: '/project/users',
                    listData: []
                },
                activeName: 'todo',
                workTabs: [
                    { label:'待办工作', name:'todoTask', nums:0 },
                    { label:'已办工作', name:'doneTask', nums:0 },
                    { label:'我的解决方案', name:'solution', nums:0 },
                    { label:'我的消息', name:'msg', nums:0 },
                    { label:'浏览记录', name:'viewRecord', nums:0 },
                ],
                tableData: []
            }
        },
        methods: {
            /**
             * @description 按标签类别定义样式
             * @param{Int} type
             */
            parseType(type='') {
                switch(type) {
                    case '标准制修订':
                        return 'success';
                    case '知识共创':
                        return 'info';
                    default:
                        return 'cyan';
                }
            },

            /**
             * @description 接收用户列表事件
             * @param{Object} obj
             */
            changeUserEvent(obj) {
                console.log('changeUserEvent==>', obj);
                switch(obj.act) {
                    case 'url':
                        if(obj.data.data.path) {
                            this.$router.push({ path:obj.data.data.path });
                        } else {
                            this.$message.error('未定义路径！请检查数据')
                        }
                        break;
                    case 'all':
                        break;
                }
            },

            /**
             * @description 执行搜索
             * @param{Object} searchObj
             */
            executeSearch(searchObj="") {
                var obj = {
                    esType: searchObj.type || 'all',
                    keyword: searchObj.value || this.hotWords[0]['value']
                }
                this.$router.push({ path:'/project/search', query:obj });
            },

            /**
             * @description 修改数据后提交保存
             * @param {Object} obj
             * @param {Object} item 元素数据
             */
            changeEvent(obj={}, item={}) {
                console.log('project changeEvent=>', obj, item)
                switch(obj.act) {
                    // 用户自行配置蜂巢后提交保存到个人信息中
                    case 'changeHive':
                        storeData.set('hiveList', obj.data);
                        break;
                    // 路由跳转
                    case 'url':
                        if (obj.data.path) {
                            if (obj.data.path === '/news/detail') {
                                storeData.set('news', obj.data.data, true);
                            }
                            this.$router.push({ path:obj.data.path });
                        }
                        break;
                }
            },

            /**
             * @description 待办已办等Tab标签点击事件
             * @param{Object} tab
             */
            handleClickTab(tab={}) {
                this.activeName = tab.name;
                // console.log('handleClickTab=>', this.activeName);
                this.getToDoList(this.activeName);
                // 根据标签获取对应的数据
            },

            /**
             * @description 恢复蜂巢原始数据
             */
            refreshHive() {
                this.$confirm('确定恢复系统默认的蜂巢数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loadedHive = false;
                    setTimeout(() => {
                        storeData.remove('hiveList');
                        this.$set(this.itemData, 'arrList', []);
                        this.loadedHive = true;
                    }, 50)
                }).catch(() => {});
            },
            /**
             * @description 获取蜂巢数据（用户自定义的本地缓存）
             */
            async getMyHiveList() {
                var arrList = storeData.get('hiveList');
                if (arrList) {
                    this.$set(this.itemData, 'arrList', arrList);
                }
            },

            /**
             * @description 获取新闻咨询
             */
            async getNoticeList() {
                var condition = {
                    "pageNum": 1,
                    "pageSize": 5,
                    "orderByColumn": "createTime",
                    "isAsc": "desc",
                    "noticeType": 1,
                    "noticeSource": "solution",
                    "status": 2
                }
                var res = await listNotice(condition);
                // console.log(res)
                if (res.code === 200) {
                    var listData = res.rows.map(item => {
                        item = this.clearDataField(item);
                        item.noticeSource = '解决方案';
                        // 图片
                        if (item.picContent) {
                            let picContent = JSON.parse(item.picContent);
                            if (!_.isEmpty(picContent)) {
                                item.picContent = picContent[0];
                            } else {
                                item.picContent = "";
                            }
                        }
                        return item;
                    });
                    this.$set(this.hotData, 'listData', listData)
                }
            },

            /**
             * @description 获取专家库(1)|用户库(0)
             * @param{Int} type
             */
            async getTopUserList(type=0) {
                var res = await getTopUsers(type);
                if (res.code === 200) {
                    var list = res.data.map(item => {
                        item = this.clearDataField(item, ['avatar','nickName','sex','userId','degree'], true);
                        if (!item.avatar) {
                            item.avatar = process.env.VUE_APP_NODE_URL + '/files/images/profile.jpg';
                        }
                        // 定义点击后路由跳转
                        item.path = '/project/users/' + item.userId
                        return item;
                    });
                    if (type === 0) {
                        this.$set(this.userData, 'listData', list);
                        this.getTopUserList(1);
                    } else {
                        this.$set(this.expertData, 'listData', list);
                    }
                }
            },
            /**
             * @description 获取用户待办等
             * @param{Int} type
             */
            async getToDoList(catalog='') {
                // 获取待办数量
                /* var res = await getTodoCount();
                if (res.code === 200) {
                    var tabData = this.workTabs[index];
                    tabData.nums = res.data;
                    this.$set(this.workTabs, index, tabData);
                } */
                // 获取待办列表

                this.tableData = [];
                // res = await listTodo({ "taskSource": "solution", "status": 1});
                var res = await getTabBottomMsg({ catalog });
                console.log('listTodo', res);
                if (res.code === 200) {
                    this.tableData = res.data;
                    let tabData = _.find(this.workTabs, { name:catalog });
                    let tabIndex = _.findIndex(this.workTabs, { name:catalog });
                    if (!!~tabIndex) {
                        tabData.nums = res.total || res.data.length;
                        this.$set(this.workTabs, tabIndex, tabData)
                    }
                }
                // 获取已办数量
                

            },

            async getHotWords() {
                var res = await getSearchKeyword();
                console.log('getHotWords', res);
                this.hotWords = res.data || []
            }
        },
        created() {
            this.getMyHiveList();
            this.getNoticeList();
            this.getTopUserList(0);
            this.getToDoList('todoTask');
        }
    }
</script>

<style lang="scss" scoped>
    @import "./project-index.scss";
</style>
