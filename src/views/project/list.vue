<template>
    <div class="project-list-container">
        <!-- Banners -->
        <div class="banners">
            <pageEnginer :data="renderBanner" @change="changeEvent" />
        </div>
        <div class="main">
            <!-- 热门解决方案 -->
            <div class="hot-list">
                <noticeFramer :data="projectData" @change="changeEvent" />
            </div>

            <div class="all-list">
                <h3 class="title">全部解决方案</h3>
                <div class="tabs">
                    <el-tabs v-model="activeName" @tab-click="handleTabClick">
                        <el-tab-pane v-for="(item,idx) in tabArr" :key="idx" :label="item.classifyName" :name="item.classifyId" />
                    </el-tabs>
                </div>
                <!-- 内容区域 -->
                <div class="content">
                    <div class="left-wrapper">
                        <!-- 左侧分类树 -->
                        <ul>
                            <li v-for="(item, idx) in outlines" :key="idx" :class="{ 'active':currItem && currItem.classifyId===item.classifyId }" @click="handleTreeClick(item)">
                                <span>{{ item.classifyName }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="main-wrapper">
                        <pageEnginer :data="renderLists" :listData="listData" @change="changeEvent" />
                    </div>
                </div>
                <!-- 分页 -->
                <div class="pages">
                    <pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
                </div>
            </div>
        </div>
        <!-- 底部信息 -->
        <commonFooter />
    </div>
</template>

<script>
    // 页面引擎基础数据
    import { pageEngIntData } from '@/config';
    // 引入页面渲染引擎
    import pageEnginer from '@/components/pageEnginer';
    // 门户菜单等组件
    import { portalMenu, noticeFramer, commonFooter } from '@/components/commons/index.js';
    // 接口
    import { getSelectTypeTree, getSelectTypelist, getInfoByClassifyId } from '@/api/solution';
    
    export default{
        name: 'project-list',
        components: {
            pageEnginer, commonFooter, noticeFramer
        },
        computed: {
            // 绑定banner页面渲染引擎
            renderBanner() {
                return Object.assign({}, pageEngIntData, { pageId:"5cc97f02-b942-4d09-9b3d-e6ece48e1303" });
            },
            // 绑定解决方案列表页面渲染引擎
            renderLists() {
                return Object.assign({}, pageEngIntData, { pageId:"0756c4c6-ddff-4caf-b4b7-25525f2c23c5" });
            }
        },
        data() {
            return {
                // 解决方案数据集
                projectData: {
                    showTitle:true,
                    title: '热门解决方案',
                    path: '/test',
                    grid: 4,
                    pageId:"0756c4c6-ddff-4caf-b4b7-25525f2c23c5",
                    // 上部分6个板块数据
                    listData: [
                        {
                            "id": "123456",
                            "title":"从海南自贸港到乡村振兴 核能绘就新图景",
                            "nickName": "张三",
                            "dateTime": "2022-07-30 16:45:57",
                            "source":"发现最美",
                            "content":"今年3月，我国自主第三代核电“华龙一号”示范工程已全面完成。此前，继“华龙一号”后又一自主创新重大成果“玲龙一号”示范工程（多用途模块式小型堆）也在去年7月正式开工。而未来，核能的角色将不止于提供电力。",
                            "cls":'col-2',
                        },
                        {
                            "id": "123456",
                            "title":"“了不起的中轴线，让我们一起来守护”小游戏助力申遗",
                            "nickName": "张三",
                            "dateTime": "2021-06-22 15:11:52",
                            "source":"了不起的",
                            "content":"中新网北京新闻6月13日电  为助力中轴线申遗，北京市文物局官方微信“北京文博”和官方微博@北京文博 两个新媒体平台12日共同推出“了不起的中轴线 让我们一起来守护”互动小游戏，邀请网友关注中轴线、参与保护中轴线，为中轴线申遗贡献自己的力量",
                        },
                        {
                            "id": "123456",
                            "title":"世界环境日，邀你一起云上直击污水变清流",
                            "nickName": "张三",
                            "dateTime": "2021-06-05 09:29:05",
                            "source":"环境日",
                            "content":"活动以视频直播的形式开展，将带领广大网友走进中国(三水)国际水都饮料食品基地，云上参观基地内的一家饮料公司以及一家污水处理厂，了解生产污水“变身记”，展示生态环境部门及企业为推动绿色发展所做的努力，提升市民的环保意识，倡导绿色生活方式",
                        },
                        {
                            "id": "123456",
                            "title":"从海南自贸港到乡村振兴 核能绘就新图景",
                            "nickName": "张三",
                            "dateTime": "2022-07-30 16:45:57",
                            "source":"发现最美",
                            "content":"今年3月，我国自主第三代核电“华龙一号”示范工程已全面完成。此前，继“华龙一号”后又一自主创新重大成果“玲龙一号”示范工程（多用途模块式小型堆）也在去年7月正式开工。而未来，核能的角色将不止于提供电力。"
                        },
                        {
                            "id": "123456",
                            "title":"“了不起的中轴线，让我们一起来守护”小游戏助力申遗",
                            "nickName": "张三",
                            "dateTime": "2021-06-22 15:11:52",
                            "source":"了不起的",
                            "content":"中新网北京新闻6月13日电  为助力中轴线申遗，北京市文物局官方微信“北京文博”和官方微博@北京文博 两个新媒体平台12日共同推出“了不起的中轴线 让我们一起来守护”互动小游戏，邀请网友关注中轴线、参与保护中轴线，为中轴线申遗贡献自己的力量",
                        },
                        {
                            "id": "123456",
                            "title":"世界环境日，邀你一起云上直击污水变清流",
                            "nickName": "张三",
                            "dateTime": "2021-06-05 09:29:05",
                            "source":"环境日",
                            "content":"活动以视频直播的形式开展，将带领广大网友走进中国(三水)国际水都饮料食品基地，云上参观基地内的一家饮料公司以及一家污水处理厂，了解生产污水“变身记”，展示生态环境部门及企业为推动绿色发展所做的努力，提升市民的环保意识，倡导绿色生活方式",
                            "cls":'col-2',
                        },
                    ],
                },
                // 解决方案分类标签页
                tabArr: [],
                // 激活分类标签页名
                activeName: '',
                // 解决方案分类树
                outlines: [],
                queryParams: {
                    pageNum: 1,
                    pageSize: 20
                },
                // 解决方案数据列表
                listData: [],
                total: 0,
                currItem: null,
            }
        },
        methods: {
            /**
             * @description 页面引擎上报事件
             */
            changeEvent(obj) {
                console.log('changeEvent=>', obj)
            },

            /**
             * @description 分类标签切换事件
             * @param {Object} tab
             */
            handleTabClick(tab) {
                this.activeName = tab.name;
                this.listTypeTree();
            },

            /**
             * @description 解决方案左侧树节点点击
             * @param {Object} item
             */
            handleTreeClick(item={}) {
                this.currItem = item;
                this.getList(item.classifyId);
            },

            /**
             * @description 获取解决方案列表
             */
            async getList(classifyId='') {
                var res = await getInfoByClassifyId({ classifyId });
                console.log('getList=>', res)
            },

            /**
             * @description 获取解决方案分类树
             */
            async listTypeTree() {
                var obj = _.find(this.tabArr, { classifyId:this.activeName });
                var condition = {
                    "classifyId": this.activeName,
                    "parentId": obj.parentId,
                    "orderNum": 1,
                    "status": 1
                }
                var res = await getSelectTypeTree(condition);
                // console.log('listTypeTree=>', res)
                if (res.code === 200) {
                    var lists = res.data.map(item => {
                        return {
                            ancestors: item.ancestors,
                            classifyId: item.classifyId,
                            classifyName: item.classifyName,
                            id: item.id,
                        }
                    });
                    this.outlines = lists;
                    this.getList(this.activeName);
                }
            },

            /**
             * @description 获取解决方案分类
             */
            async listClassify() {
                var res = await getSelectTypelist();
                // console.log('getSelectTypelist=>', res)
                if (res.code === 200 && res.rows.length) {
                    var lists = res.rows.map(item => {
                        return {
                            ancestors: item.ancestors,
                            classifyId: item.classifyId,
                            classifyName: item.classifyName,
                            id: item.id,
                        }
                    });
                    this.activeName = lists[0]['classifyId'];
                    this.tabArr = lists;
                    this.listTypeTree();
                }
            },
        },
        created() {
            this.listClassify();
        }
    }
</script>

<style lang="scss" scoped>
    @import './project-list.scss';
</style>
