<template>
    <div class="user-framer">
        <!-- 通知公告 -->
        <div class="user-header" v-if="data.showTitle">
            <h3 class="title" :style="titleStyle">
                <span>{{data.title}}</span>
                <el-button type="text" icon="iconfont icon-icon-test54" @click.stop.prevent="handleAll">全部</el-button>
            </h3>
        </div>
        <div class="user-content">
            <!-- v-on="$listeners" -->
            <pageEnginer v-if="listData.length" :class="gridStyle" :data="renderUser" :listData="listData" @change="changeEvent" />
            <p v-else class="empty">暂无数据...</p>
        </div>
    </div>
</template>

<script>
    import { pageEngIntData } from '@/config';
    // 引入页面渲染引擎
    import pageEnginer from '@/components/pageEnginer';
    import { userList } from '@/mock/exampleData';
    export default {
        name: 'user-framer',
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
            renderUser() {
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
                    styles.push('col-' + (this.data.grid || '4'));
                }
                return styles.join(" ");
            }
        },
        watch: {
            data: {
                handler(data) {
                    if(!_.isEmpty(data)) {
                        this.listData = data.listData;
                    }
                },
                deep: true,
                immediate: true
            }
        },
        data() {
            return {
                listData: [],
            }
        },
        methods: {
            /**
             * @description 页面引擎上报事件
             * @param {Object} obj
             */
            changeEvent(obj={}) {
                // console.log('user framer changeEvent', obj)
                switch(obj.act) {
                    // 链接跳转
                    case 'url':
                    case 'jumpUrl':
                        this.$emit('change', obj);
                        break;
                }
            },

            /**
             * @description 查看全部
             */
            handleAll() {
                this.$emit('change', { act:'all', path:this.data.path});
            }

        }
    }
</script>

<style lang="scss" scoped>
    .user-framer{
        width: 100%;
        .user-header{
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
                margin: 0 0 30px 0;
                ::v-deep .el-button{
                    position: absolute;
                    right: 10px;
                    top:0;
                    padding: 0;
                }
            }
        }
        .user-content{
            ::v-deep .grid{
                display: grid;
                gap:15px;
                >div{
                    padding: 0;
                    height: 140px;
                    cursor: pointer;
                    transition: transform .3s;

                    &:hover{
                        transform: scale(1.15);
                    }
                }
                @for $i from 2 through 8 {
                    &.col-#{$i}{
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
                color: #CCC;
                border: 1px dashed #CCC;
            }
        }
    }
</style>
