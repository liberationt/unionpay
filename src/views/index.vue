<template>
    <div class="portal-home">
        <div class="banners">
            <pageEnginer :data="renderBanner" @change="changeEvent" />
        </div>

        <main>
            <!-- 通知公告 -->
            <div class="notice-content">
                <div class="lists">
                    <noticeFramer :data="noticeData" @change="changeEvent" />
                </div>
            </div>
            <!-- 解决方案 -->
            <div class="project-content">
                <div class="lists">
                    <noticeFramer :data="projectData" @change="changeEvent" />
                </div>
            </div>
            <!-- 知识社区 -->
            <div class="knowledge-content">
                <div class="lists">
                    <noticeFramer :data="knowledgeData" @change="changeEvent" />
                </div>
            </div>
        </main>

        <!-- 页面底部 -->
        <commonFooter />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    // 页面引擎基础数据
    import { pageEngIntData } from '@/config';
    // 引入页面渲染引擎
    import pageEnginer from '@/components/pageEnginer';
    // 门户菜单等组件
    import { noticeFramer, commonFooter } from '@/components/commons/index.js';
    // 通知公告数据接口
    import { listNotice } from '@/api/system/notice';
    // 解决方案知识接口
    import { getKnowledgeList } from '@/api/solution';
    // 缓存
    import { storeData } from '@/utils/index';
    export default {
        name: 'Index',
        dicts: ['sys_notice_source'],
        components: {
            pageEnginer, noticeFramer, commonFooter
        },
        computed: {
            ...mapGetters(['userList']),
            renderBanner() {
                return Object.assign({}, pageEngIntData, { pageId:"8a409d6f-248b-4aac-a040-079627f70cae" });
            }
        },
        data() {
            return {
                // 通知公告数据
                noticeData: {
                    showTitle: true,
                    clickAll: true,
                    title: '通知公告',
                    path: '/news',
                    activeName: 'standard',
                    tabs:[
                        { label:'标准管理平台', noticeId:'1', name:'standard', type:'notice', path:'/news' },
                        { label:'解决方案', noticeId:'2', name:'solution', type:'notice', path:'/news' },
                        // {label:'国际标准社区', noticeId:'2134', name:'wiki' }
                    ],
                    pageId:"ee1454b4-7525-4301-8eee-ec08047e0a36",
                    listData: []
                },
                // 解决方案数据
                projectData: {
                    showTitle:true,
                    clickAll: true,
                    title: '解决方案',
                    path: '/project',
                    grid: 4,
                    pageId:"0756c4c6-ddff-4caf-b4b7-25525f2c23c5",
                    activeName: 'atom',
                    tabs: [
                        { label:'原子知识', name: 'atom', type:'project', path: '/project/list?type=atom'},
                        { label:'解决方案', name: 'solution', type:'project', path: '/project/list?type=solution'},
                        { label:'更多知识', name: 'more', type:'project', path: '/project/list?type=more'}
                    ],
                    listData: []
                },
                // 知识社区数据
                knowledgeData: {
                    showTitle: true,
                    title: '知识社区',
                    path: '/project/knowledge',
                    pageId:"ee1454b4-7525-4301-8eee-ec08047e0a36",
                    listData: []
                },

                queryParams: {
                    "pageNum": 1,
                    "pageSize": 5,
                    "orderByColumn": "createTime",
                    "isAsc": "desc",
                    "noticeType": null,
                    "noticeSource": "standard", // ""=> 门户 solution=> 解决方案 standard=> 标准管理平台
                    "status": 2
                }
            };
        },
        methods: {
            handleClick(tab) {
                console.log('handleClick', tab)
            },
            /**
             * @description 页面引擎上报事件
             * @param {Object} obj
             */
            changeEvent(obj={}) {
                console.log('index changeEvent', obj)
                switch(obj.act) {
                    // 链接跳转
                    case 'changeTab':
                        // 新闻公告
                        if (obj.data.type === 'notice') {
                            this.$set(this.noticeData, 'listData', []);
                            this.$set(this.queryParams, 'noticeSource', obj.data.name);
                            this.getListNotice();
                        // 解决方案
                        } else if (obj.data.type === 'project') {
                            this.$set(this.projectData, 'activeName', obj.data.name)
                            this.listKnowledge(obj.data.name);
                        }
                        break;
                    // 链接跳转，显示全部
                    case 'all':
                        if (obj.data.path) {
                            let route = { path:obj.data.path, query: {}  };
                            // 类型
                            if (obj.data.name) {
                                route.query = {
                                    type:obj.data.name
                                }
                            }
                            this.$router.push(route);
                        }
                        break;
                    // 链接跳转
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
             * @description 获取通知公告
             * @param {String} source
             */
            async getListNotice() {
                var res = await listNotice(this.queryParams);
                // console.log(res)
                if (res.code === 200) {
                    var listData = res.rows.map(item => {
                        item = this.clearDataField(item);
                        // 来源
                        let noticeSource = _.find(this.dict.type.sys_notice_source, { value:item.noticeSource });
                        item.noticeSource = noticeSource ? noticeSource.label : item.noticeSource;
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
                    // console.log('listData', listData)
                    this.$set(this.noticeData, 'listData', listData);
                }
            },

            /**
             * @description 获取知识列表
             */
            async listKnowledge(type="solution") {
                var condition = {
                    "pageNum": 1,
                    "pageSize": 8,
                    "orderByColumn": "createTime",
                    "isAsc": "desc",
                    "klgType": type,
                    "status": 2,
                    "isPublic": 1
                }
                var res = await getKnowledgeList(condition);
                if (res.code === 200) {
                    var listData = res.rows.map(item => {
                        item = this.clearDataField(item, ['createTime','docId','id','isPublic','klgId','klgName','klgType','publishDate','createUser','status','summary'], true);
                        let user = _.find(this.userList, { userId:item.createUser });
                        item.nickName = user ? user.nickName : '未名';
                        return item;
                    });
                    this.$set(this.projectData, 'listData', listData);
                }
            }
        },
        created() {
            this.getListNotice('noticeData');
            this.listKnowledge();
        }
    };
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/variables.scss";
    .portal-home {
        padding:0;
        height: 100%;
        overflow: auto;
        background-color: #FFF;
        main{
            .notice-content{
                // background-color: #FFF;
                .lists{
                    margin: 30px auto;
                    width: $page-width;
                }
            }
            .project-content{
                padding: 15px 0 35px 0;
                background-color: #EAEAEA;
                .lists{
                    margin: 10px auto;
                    width: $page-width;
                }
            }
            .knowledge-content{
                padding: 15px 0 35px 0;
                background-color:#FFF;
                .lists{
                    margin: 30px auto;
                    width: $page-width;
                    /* ::v-deep .notice-framer{
                        background-color: #FFF;
                        padding:20px;
                    } */
                }
            }
        }
        ::v-deep .common-footer{
            background-color: #F7F7F7;
        }
    }
</style>
