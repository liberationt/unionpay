<template>
    <div class="index-new-container">
        <div class="search-content">
            <commonSearch :data="{size:'mini', fetch:true, selected:true}" autoSearch="search-news" :typeArr="typeArr"  @change="executeSearch" style="width: 450px;" />
        </div>
        <!-- 通知公告 -->
        <div class="notice-content">
            <div class="data-lists">
                <noticeFramer v-if="!loading" :data="noticeData" @change="changeEvent" />
            </div>
            <div class="pages">
                <pagination :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="handleQuery" />
            </div>
        </div>

        <!-- 页面底部 -->
        <commonFooter />
    </div>
</template>

<script>
    // 页面引擎基础数据
    import { pageEngIntData } from '@/config';
    // 引入页面渲染引擎
    import pageEnginer from '@/components/pageEnginer';
    // 门户菜单等组件
    import { noticeFramer, commonFooter, commonSearch } from '@/components/commons/index.js';
    // 通知公告数据接口
    import { listNotice } from '@/api/system/notice';
    // 缓存
    import { storeData } from '@/utils/index';
    export default {
        name: 'index-news',
        dicts: ['sys_notice_source'],
        components: {
            noticeFramer, commonFooter, commonSearch
        },
        data() {
            return {
                typeArr: [
                    { label: '标准管理平台', value:'standard' }, // , checked:true  默认选中
                    { label: '解决方案', value:'solution' },
                ],
                // 通知公告数据
                noticeData: {
                    // showTitle: true,
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
                queryParams: {
                    "pageNum": 1,
                    "pageSize": 10,
                    "orderByColumn": "createTime",
                    "isAsc": "desc",
                    "noticeTitle": "",
                    "noticeType": null,
                    "noticeSource": "", // ""=> 门户 solution=> 解决方案 standard=> 标准管理平台
                    "status": 2
                },
                total: 0,
                loading: false
            }
        },
        methods: {
            executeSearch(obj) {
                console.log('executeSearch=>', obj)
                this.$set(this.queryParams, 'noticeTitle', obj.value);
                this.$set(this.queryParams, 'noticeSource', obj.type);
                /* if (obj.type) {
                    this.$set(this.queryParams, 'noticeSource', obj.type)
                } else {
                    delete this.queryParams.noticeType;
                } */
                this.getListNotice();
            },
            changeEvent(obj) {
                console.log('index changeEvent', obj)
                switch(obj.act) {
                    // 链接跳转
                    case 'changeTab':
                        if (obj.data.type === 'notice') {
                            this.$set(this.noticeData, 'listData', []);
                            this.$set(this.queryParams, 'noticeSource', obj.data.name);
                            this.getListNotice();
                        } else if (obj.data.type === 'project') {
                            this.$set(this.projectData, 'listData', []);
                        }
                        break;
                    // 链接跳转
                    case 'url':
                        if (obj.data.path) {
                            storeData.set('news', obj.data.data, true);
                            this.$router.push({path:obj.data.path});
                        } else {
                            this.$message.error('未定义路径！');
                        }
                        break;
                }
            },
            handleQuery(){
                this.getListNotice();
            },
            /**
             * @description 获取通知公告
             * @param {Object} obj
             */
            async getListNotice(source='noticeData') {
                this.loading = true;
                var res = await listNotice(this.queryParams);
                // console.log(res)
                if (res.code === 200) {
                    this.total = res.total;
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
                    this.$set(this[source], 'listData', listData)
                    this.loading = false;
                }
            },
        },
        created() {
            this.getListNotice('noticeData');
            var query = this.$route.query;
            if (query && query.type) {
                this.$set(this.noticeData, 'activeName', query.type);
                // 更新搜索框的默认选中
                var typeData = _.find(this.typeArr, { value:query.type });
                var typeIndex = _.findIndex(this.typeArr, { value:query.type });
                if (typeData) {
                    typeData.checked = true;
                    this.$set(this.typeArr, typeIndex, typeData)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/variables.scss";
    .index-new-container{
        padding: 30px;
        .search-content{
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
        }
        .notice-content{
            margin: 0 auto;
            padding: 10px 30px;
            width: $page-width;
            background-color: #FFF;
            border: 1px solid #DDD;
            border-radius: 5px;
            box-shadow: 3px 3px 4px 0 rgba(0,0,0,.1);
            .data-lists{

            }
            .pages{
                padding: 10px 0;
                height: 60px;
                ::v-deep .pagination-container{
                    padding: 0 !important;
                    margin: 0 !important;
                    height: auto !important;
                }
            }
        }
    }
</style>
