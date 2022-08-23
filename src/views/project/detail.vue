<template>
    <div class="project-detail-container">
        <header>
            <ul>
                <li v-for="(item,idx) in tabs" :key="idx" :class="{'active':activeName===item.name}" @click="handleTabClick(item)">
                    <i class="iconfont" :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                </li>
            </ul>
        </header>
        <main>
            <div class="main-wrapper">
                <div>通过阅读器解析文档</div>
            </div>
            <div class="right-wrapper">
                <div v-if="mapCmp">
                    <el-scrollbar class="scrollbar ver">
                        <component :is="mapCmp"></component>
                    </el-scrollbar>
                </div>
            </div>
        </main>

        <el-dialog custom-class="win-dialog" :title="dialogParam.title" :visible.sync="dialogParam.visible" :width="dialogParam.with" append-to-body destroy-on-close :close-on-click-modal="false">
            <component :is="winCmp"></component>
        </el-dialog>
    </div>
</template>

<script>
    import * as readerComponent from '@/components/readerDoc/index.js';
    export default {
        name: 'project-detail',
        computed: {
            mapCmp() {
                if (readerComponent[this.cmpName]) {
                    return readerComponent[this.cmpName];
                }
                return null;
            },
            winCmp() {
                if (readerComponent[this.winName]) {
                    return readerComponent[this.winName];
                }
                return null;
            }
        },
        data() {
            return {
                // 当前Tag标签
                activeName: 'file',
                // 右侧栏组件
                cmpName: 'file',
                // 弹窗组件
                winName: 'knowledge',
                tabs: [
                    { label:'知识合辑', icon:'icon-icon-test30', name:'knowledge', win:'knowledge', width:'750px' },
                    { label:'分享', icon:'icon-share_fill', name:'share', win:'share', width:'500px' },
                    { label:'相关文件', icon:'icon-RectangleCopy12', name:'file', cmp:'file' },
                    { label:'基础信息', icon:'icon-linghuokuozhan', name:'base', cmp:'base' },
                    { label:'讨论区', icon:'icon-icon-test3', name:'discuss', cmp:'discuss' },
                ],
                // 弹窗参数
                dialogParam: {
                    visible: false,
                    title: '',
                    with: '600px'
                }
            }
        },
        methods: {
            /**
             * @description Tab页切换
             * @param {Object} tab
             */
            handleTabClick(tab) {
                console.log(tab)
                this.activeName = tab.name;
                if (tab.win) {
                    this.winName = tab.name;
                    this.dialogParam = {
                        visible: true,
                        title: tab.label,
                        with: tab.width
                    }
                } else {
                    this.cmpName = tab.name;
                }
            }
        },
        created() {
            var query = this.$route.query;
            if (query && query.tab) {
                this.activeName = query.tab;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './project-detail.scss';
</style>
