<template>
    <div class="notice-framer">
        <!-- 通知公告|列表信息等 -->
        <div class="notice-tabs" v-if="data.showTitle">
            <h3 class="title" :style="titleStyle">
                <span>{{data.title}}</span>
                <el-button v-if="data.clickAll" type="text" icon="iconfont icon-icon-test54" @click.stop.prevent="handleAll">全部</el-button>
            </h3>
            <el-tabs v-if="data.tabs && data.tabs.length" v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane v-for="(item,idx) in data.tabs" :key="idx" :label="item.label" :name="item.name"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="notice-content">
            <!-- v-on="$listeners" -->
            <pageEnginer v-if="listData.length" :class="gridStyle" :data="renderNotice" :listData="listData" @change="changeEvent" />
            <p v-else class="empty">暂无数据...</p>
        </div>
    </div>
</template>

<script>
    import { pageEngIntData } from '@/config';
    // 引入页面渲染引擎
    import pageEnginer from '@/components/pageEnginer';
    import { listData } from '@/mock/exampleData';
    export default {
        name: 'notice-framer',
        components: {
            pageEnginer
        },
        props: {
            data: {
                type: Object,
                default: () => {
                    return null;
                }
            },
            showTitle: Boolean
        },
        computed: {
            renderNotice() {
                return Object.assign({}, pageEngIntData, { pageId:this.data.pageId });
            },
            titleStyle() {
                var obj = {};
                if (this.data.align) {
                    obj['text-align'] = this.data.align;
                }
                return obj;
            },
            gridStyle() {
                var styles = [];
                if(this.data.grid) {
                    styles.push('grid');
                    styles.push('row-' + (this.data.grid || '4'));
                }
                return styles.join(" ");
            }
        },
        watch: {
            data: {
                handler(data) {
                    if(!_.isEmpty(data)) {
                        this.activeName = data.activeName;
                        if (data.listData) {
                            this.listData = data.listData;
                        }
                    }
                },
                deep: true,
                immediate: true
            }
        },
        data() {
            return {
                activeName: '',
                listData,
            }
        },
        methods: {
            /**
             * @description 页面引擎上报事件
             * @param {Object} obj
             */
            changeEvent(obj={}) {
                // console.log('notice framer changeEvent', obj)
                if (!obj.data) {
                    obj.data = this.data;
                }
                // console.log('this.data', this.data)
                switch(obj.act) {
                    // 链接跳转
                    case 'url':
                    case 'jumpUrl':
                        this.$emit('change', obj); // Object.assign({},obj, this.data||{})
                        break;
                }

            },
            /**
             * @description tab页切换
             */
            handleTabClick(tab) {
                let tabData = _.find(this.data.tabs, { name:tab.name })
                this.$emit('change', { act:'changeTab', data:tabData });
            },
            /**
             * @description 查看全部
             */
            handleAll() {
                let tabData = _.find(this.data.tabs, { name:this.activeName });
                this.$emit('change', { act:'all', data:tabData||this.data });
            }

        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/variables.scss";
    .notice-framer{
        width: 100%;
        .notice-tabs{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            h3.title{
                position: relative;
                width: 100%;
                text-align: center;
                font-size: 1.25rem;
                font-weight: bold;
                font-family: simHei;
                padding: 0;
                margin: 0 0 15px 0;
                ::v-deep .el-button{
                    position: absolute;
                    right: 10px;
                    top:0;
                    padding: 0;
                }
            }
            ::v-deep .el-tabs__nav-wrap{
                &:after{
                    background-color:transparent;
                }
                .el-tabs__nav{
                    transform: translateX(350px);
                    .el-tabs__item{
                        font-size: 16px;
                    }
                }
            }
        }
        .notice-content{
            ::v-deep .grid{
                display: grid;
                gap:15px;
                >div{
                    box-shadow: 3px 3px 4px 0 rgba(0,0,0,.1);
                }
                @for $i from 2 through 8 {
                    &.row-#{$i}{
                        grid-template-columns: repeat($i, 100%/$i);
                        padding-right: $i*15px-15px;
                    }
                }
            }
            ::v-deep .page-render-container{
                &:last-child {
                    .element-panel-container{
                        border-bottom-width: 0 !important;
                    }
                }

            }
            .empty{
                padding: 20px;
                font-size: 16px;
                color: #CCC;
                border: 1px dashed #CCC;
                background-color: rgba(255,255,255,.3);
            }
        }
    }
</style>
