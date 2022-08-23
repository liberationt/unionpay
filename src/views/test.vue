<template>
    <div class="test-container">
        <div class="test-left-wrapper" :class="{'hide':isEditing}">
            <div class="header">
                <span>页面列表</span>
                <el-button size="mini" @click.stop.prevent="createPage">新建</el-button>
            </div>
            <div class="lists">
                <el-scrollbar class="scrollbar ver">
                    <ul>
                        <li v-for="(item, idx) in initData.pageList" :key="idx">
                            <span>{{item.label}}</span>
                            <el-button-group>
                                <el-button size="small" type="text" icon="iconfont icon-buju" title="预览页面" @click="viewPage(item)"></el-button>
                                <el-button size="small" type="text" icon="iconfont icon-editor" title="编辑页面" @click="editPage(item)"></el-button>
                            </el-button-group>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
        </div>
        <div class="test-main-wrapper">
            <page-editor v-if="isEditing" :data="pageData" :attInfo="initData" @change="changeEvent" />
            <page-enginer v-else :data="initData" :listData="listData" @change="changeEvent" />
        </div>
    </div>
</template>

<script>
    import { pageEditor, pageFun } from 'samshen-editor';
    import 'samshen-editor/dist/samshenEditor.css';
    import { storeData } from '@/utils/index.js';
    // 再封装后的页面引擎组件
    import pageEnginer from '@/components/pageEnginer';
    import { listData } from '@/mock/exampleData';
    export default {
        name: 'test-cmp',
        components: {
            pageEditor, pageEnginer
        },
        computed: {
            leftStyle() {
                return {
                    flex: !this.isEditing ? '0 0 200px' : '0'
                }
            }
        },
        data() {
            return {
                initData: {
                    apiUrl: process.env.VUE_APP_API,			// JAVA接口地址
                    nodeUrl: process.env.VUE_APP_NODE_URL,	    // NodeServer地址
                    dbName: 'bzton-union-pay',                  // 数据库名
                    tableName: 'fe_form_page',                  // 数据表名
                    serverAddr: '140',                          // 140服务器
                    exportData: false,                          // 直接输出数据，不在编辑器中保存
                    pageId: '',                                 // 页面ID
                    pageList: [],
                },
                pageData: null,
                isEditing: false,
                listData,
                showMock: false
            }
        },
        methods: {
            /**
             * @description 页面引擎上报事件
             * @param {Object} obj
             */
            changeEvent(obj) {
                console.log('test changeEvent', obj)
                switch(obj.act) {
                    case 'close':
                        this.isEditing = false;
                        storeData.remove('pageData', true);
                        break;
                }
            },
            /**
             * @description 新建页面
             */
            createPage() {
                this.pageData = {};
                this.isEditing = true;
            },
            /**
             * @description 预览页面
             * @param {Object} item
             */
            viewPage(item={}) {
                // this.pageData = { preview: true, content:JSON.parse(item.content) };
                this.$set(this.initData, 'pageId', item.id);
                storeData.remove('pageData', true);
                this.isEditing = false;
            },
            /**
             * @description 编辑页面
             * @param {Object} item
             */
            editPage(item={}) {
                this.pageData = JSON.parse(item.content);
                storeData.set('pageData', this.pageData, true);
                this.isEditing = true;
            },
            /**
             * @description 获取页面列表
             */
            async listPages() {
                var res = await pageFun.getPageList(this.initData);
                console.log('listPages=>',res)
                if (res.error_code) {
                    this.$set(this.initData, 'pageList', res.data)
                }
            },
        },
        created() {
            this.listPages();
        }
    }
</script>

<style lang="scss" scoped>
    .test-container{
        height: 100%;
        display: flex;
        .test-left-wrapper{
            flex: 0 0 200px;
            border-right: 1px solid #DDD;
            transition: flex .3s;
            &.hide{
                flex: 0;
                >div{
                    display: none;
                }
            }
            .header{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 15px;
                border-bottom: 1px solid #DDD;
            }
            .lists{
                height: calc(100% - 50px);
                overflow: hidden;
                ul{
                    padding: 0 10px;
                    li{
                        height: 25px;
                        border-bottom: 1px solid #EAEAEA;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                }

            }
        }
        .test-main-wrapper{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
