<template>
    <div class="project-search-container">
        <main>
            <div class="search-content">
                <commonSearch :data="{ size:'mini', fetch:true, selected: false, hotWords }"  @change="executeSearch" style="width: 320px" />
            </div>

            <div class="content">
                <div class="left-wrapper">
                    <div class="search-conditions">
                        <ul>
                            <li style="margin-left: 40px; border: 0;">
                                <tabMenu size="mini" :data="conditionTabs" @change="changeSearch($event, 'esType')" />
                            </li>
                        </ul>
                        <el-form ref="queryForm" size="mini" label-width="80px" :model="query">
                            <el-form-item label="部门">
                                <commonDept :data="{'size':'small', 'multiple':false, 'deptId': query.ownerDept }" @change="changeSearch($event, 'ownerDept')"  />
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-radio-group v-model="query.status" @change="(val) => { changeSearch(val, 'status')}">
                                    <el-radio :label="0">全部</el-radio>
                                    <el-radio v-for="(item, idx) in statusList" :key="idx" :label="item.value">{{item.label}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="创建时间">
                                <el-date-picker
                                    size="small"
                                    v-model="formData.rangeDate"
                                    type="daterange" value-format="yyyy-MM-dd"
                                    ange-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerDateOptions"
                                    @change="(val) => { changeRangeTime(val, 'dateTime')}"/>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="primary" icon="el-icon-search" @click="getListData">立即检索</el-button>
                                <el-button size="small" icon="el-icon-refresh" @click="resetForm">重置查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!-- 查询列表展示 -->
                    <div class="list-datas">
                        <template v-if="listData.length">
                            <div class="orders">
                                <span style="width: 80px;">排序：</span>
                                <span>按发布日期
                                    <commonOrder @change="changeOrder" />
                                </span>
                                <span>按收藏数量
                                    <commonOrder @change="changeOrder" />
                                </span>
                            </div>
                            <div class="content" id="paroject-search-list">
                                <!-- 引擎渲染列表内容 -->
                                <pageEnginer :data="renderData" :listData="listData" @change="changeEvent" />
                            </div>
                            <div class="pages">
                                <pagingSmall :pageSize="query.pageSize" :currentPage="query.pageNum" :total="total" @change="changePagination" />
                            </div>
                        </template>
                        <p v-else class="empty">{{ loading ? '正在查询中...' : '暂无可查询的数据...'}}</p>
                    </div>
                </div>
                <!-- 右侧热词排名 -->
                <div class="right-wrapper">
                    <div class="hot-block">
                        <noticeFramer :data="hotwordData" />
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <commonFooter />
        </footer>

        <!-- 分享窗口 -->
        <el-dialog title="分享" custom-class="share-dialog" :visible.sync="dialogVisible" width="650px" append-to-body :close-on-click-modal="false">
            <commonShare />
        </el-dialog>
    </div>
</template>

<script>
    // 页面渲染引擎配置参数
    import { pageEngIntData, commonHeadMenus, statusList } from '@/config';
    // 页面渲染引擎
    import pageEnginer from '@/components/pageEnginer';
    // 通用组件
    import { tabMenu, noticeFramer, commonFooter, commonSearch, commonDept, commonOrder, commonShare } from '@/components/commons';
    // 分页组件
    import pagingSmall from '@/components/Pagination/pagingSmall';
    // 时间范围定义
    import { pickerDateOptions } from '@/config';
    // mock数据
    // import { knowledgeData, hotwordList } from '@/mock/exampleData';
    // API接口
    import { getPageListEs } from '@/api/solution';
    // vuex
    import { mapGetters } from 'vuex';

    export default {
        name: 'project-search',
        components: {
            pageEnginer, tabMenu, noticeFramer, commonFooter, commonSearch, commonDept, commonOrder, pagingSmall, commonShare
        },
        computed: {
            ...mapGetters(['hotWords', 'deptList', 'userList']),
            renderData() {
                return Object.assign({}, pageEngIntData, { pageId:"03aff90f-62a9-467f-9199-86f6ccfb0304" });
            },
        },
        watch: {
            hotWords: {
                handler(data) {
                    if(!_.isEmpty(data)) {
                        let listData = data.map((item, index) => {
                            return {
                                title: item.value,
                                number: index + 1
                            }
                        });
                        this.$set(this.hotwordData, 'listData', listData);
                    }
                },
                deep: true,
                immediate: true
            }
        },
        data() {
            return {
                loading: true,
                // 导航菜单条
                headerMenus: commonHeadMenus,
                conditionTabs: [
                    { label:'全站', value:'all'},
                    { label:'原子知识', value:'atom'},
                    { label:'解决方案', value:'solution'},
                    { label:'更多知识', value:'more'},
                    { label:'知识合辑', value:'album'},
                    { label:'评论', value:'comment'},
                    { label:'问答区', value:'question'},
                    { label:'用户', value:'user'},
                ],
                formData: {
                    deptId: undefined,
                    state: 0,
                    rangeDate: ''
                },
                pickerDateOptions,
                listData: [],           // knowledgeData,
                hotwordData: {
                    showTitle:true,
                    title: '热词排名',
                    align: 'left',
                    pageId: "106b00fd-9e5a-40d0-adc8-19c0d6ac7cbc",
                    listData: []
                },
                statusList,
                query: {
                    keyword: '',
                    esType: 'all',
                    status: 0,
                    orderColumn: '',
                    isAsc: false,
                    ownerDept: '',
                    beginTime: '',
                    endTime: '',
                    pageNum: 1,
                    pageSize: 30,
                },
                total: 0,
                dialogVisible: false
            }
        },
        methods: {
            /**
             * @description 执行关键字检索
             * @param{Object} obj
             */
            executeSearch(obj) {
                console.log('executeSearch', obj)
                let keyword = obj.value || this.hotWords[0]['value'];
                this.$set(this.query, 'keyword', keyword);
                // this.getListData();
            },
            resetForm() {
                this.resetForm("queryForm");
                this.getListData();
            },
            /**
             * @description 分页组件上报事件
             * @param{Object} obj
             */
            changePagination(obj={}) {
                console.log('project search changePagination', obj)
            },
            /**
             * @description 页面引擎上报事件
             * @param{String} orderBy
             */
            changeOrder(orderBy="", type="createTime") {
                this.$set(this.query, 'orderColumn', type);
                this.$set(this.query, 'isAsc', orderBy === 'asc');
                console.log('project search changeOrder', this.query);
                // this.getListData();
            },
            /**
             * @description 页面引擎上报事件
             * @param{Object} obj
             */
            changeEvent(obj={}, data={}) {
                console.log('project search changeEvent', obj, data)
                switch(obj.act) {
                    // 路由跳转
                    case 'url':
                        if (obj.data.path) {
                            let path = obj.data.path + '?tab=file';
                            if (obj.data.data) {
                                path += '&' + obj.data.data;
                            }
                            this.$router.push({ path });
                        }
                        break;
                    // 弹窗，须先注册el-dialog组件，然后调用子组件
                    case 'dialog':
                        this.dialogVisible = true;
                        break;
                }
            },
            /**
             *  @description 选择日期范围
             * @param{Array} times
             */
            changeRangeTime(times=[]) {
                console.log('changeRangeTime', times)
                if (times) {
                    this.$set(this.query, 'beginTime', times[0] + ' 00:00:00');
                    this.$set(this.query, 'endTime', times[1] + ' 23:59:59');
                } else {
                    this.$set(this.query, 'beginTime', '');
                    this.$set(this.query, 'endTime', '');
                }

                // this.getListData();
            },
            changeSearch(value, key="") {
                if (key === 'esType') {
                    value = value.value;
                }
                console.log('project search changeSearch', value, key)
                this.$set(this.query, key, value);
                // this.getListData();
            },
            /**
             * @description 关键字高亮显示
             */
            setHighLight() {
                let keyword = this.query.keyword;
                var itemNodes = document.querySelectorAll('#paroject-search-list .item-label');
                itemNodes.forEach(node => {
                    let textContent = node.textContent;
                    if(textContent.includes(keyword)) {
                        console.log('itemNodes', textContent)
                        let reg = new RegExp(keyword, 'g')
                        node.innerHTML = textContent.replace(reg, `<em class="high-light">${keyword}</em>`);
                    }
                })
            },
            /**
             * @description 获取数据
             */
            async getListData() {
                this.loading = true;
                var condition = {};
                for(let k in this.query) {
                    let value = this.query[k];
                    if (value) {
                        condition[k] = value;
                    }
                }

                var res = await getPageListEs(condition);
                console.log('getListData=>', res);
                if (res.code === 200) {
                    this.total = res.data.total;
                    this.listData = res.data.rows.map((item, index) => {
                        // conditionTabs
                        let tabData = _.find(this.conditionTabs, { value:item.es_type });
                        if (tabData) {
                            item.es_type = tabData.label;
                        }
                        item.number = index + 1;
                        let user = _.find(this.userList, { userId:item.owner });
                        item.nickName = user ? user.nickName : '未名';
                        let dept = _.find(this.userList, { userId:item.owner });
                        item.deptName = dept ? dept.deptName : '未定义';
                        let status = _.find(this.statusList, { value:item.status });
                        item.status = status ? status.label : '未定义';
                        item.publish_date = this.parseTime(item.publish_date);
                        // 点赞数等
                        item.likeCount = item.statistics ? item.statistics.likeCount||0 : 0;
                        item.commentCount = item.statistics ? item.statistics.commentCount||0 : 0;
                        item.readCount = item.statistics ? item.statistics.readCount||0 : 0;
                        item.collectionCount = item.statistics ? item.statistics.collectionCount||0 : 0;
                        item.shareCount = item.statistics ? item.statistics.shareCount||0 : 0;
                        return item;
                    })
                }
                this.loading = false;
                // 根据关键字高亮显示
                setTimeout(() => {
                    this.setHighLight();
                }, 500)

            }
        },
        created() {
            var query = this.$route.query;
            if (query) {
                if (query.esType) {
                    this.$set(this.query, 'esType', query.esType);
                }
                if (query.keyword) {
                    this.$set(this.query, 'keyword', query.keyword);
                }
            }

            this.getListData();
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/variables.scss";
    .project-search-container {
        height: 100%;
        background-color: #EAEAEA;
        overflow: auto;
        header{

        }
        main{
            margin: 15px auto;
            width: $page-width;
            .tagview-content{
                margin-bottom: 10px;
            }
            .content{
                display: flex;
                .left-wrapper{
                    flex:1;
                    .search-conditions{
                        padding: 15px;
                        margin:20px 0;
                        min-height: 100px;
                        background-color: #FFF;
                        border-radius: 5px;
                        box-shadow: 3px 3px 4px 0 rgba(0,0,0,.1);
                        >ul{
                            >li{
                                display: flex;
                                align-items: center;
                                padding: 5px 0;
                                border-bottom: 1px solid #EEE;
                                line-height: 2.5;
                                font-weight: bold;
                                .title{
                                    font-weight: bold;
                                    flex: 0 0 80px;
                                    text-align: right;
                                    margin-right: 5px;
                                    &::after{
                                        content: "：";
                                    }
                                }
                            }
                        }
                    }
                    .list-datas{
                        padding: 15px;
                        margin:20px 0;
                        min-height: 100px;
                        background-color: #FFF;
                        border-radius: 5px;
                        box-shadow: 3px 3px 4px 0 rgba(0,0,0,.1);
                        .orders{
                            line-height: 3;
                            border-bottom: 1px solid #EEE;
                            padding: 0 15px;
                            >span {
                                margin-right: 25px;
                            }
                        }
                        .pages{
                            padding: 10px 0;
                            display: flex;
                            justify-content: center;
                        }
                        ::v-deep em.high-light{
                            color:red;
                        }
                    }
                }
                .right-wrapper{
                    flex: 0 0 400px;
                    padding: 18px 0px 15px 20px;
                    .hot-block{
                        background-color: #FFF;
                        border-radius: 5px;
                        padding: 15px;
                        box-shadow: 3px 3px 4px 0 rgba(0,0,0,.1);
                        ::v-deep h3.title{
                            margin: 0 0 10px 0;
                            font-size: 16px;
                        }
                        ::v-deep .element-pane-container, .element-panel-container{
                            min-height: 35px;
                        }
                    }
                }
            }

        }
    }
    ::v-deep .share-dialog{
        .el-dialog__body{
            padding: 0;
        }
    }
</style>
