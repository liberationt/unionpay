<template>
	<div class="page-editor-container">
        <page-editor :data="pageData" :attInfo="tempData" @change="changeEvent" />
    </div>
</template>

<script>
    import { pageEngIntData } from '@/config';
    import { pageEditor, pageFun } from 'samshen-editor';
    import 'samshen-editor/dist/samshenEditor.css';
    export default {
        name: 'page-edit',
        components: {
            pageEditor
        },
        props: {
            data: Object
        },
        computed: {
            tempData() {
                var attInfo = _.cloneDeep(pageEngIntData);
                attInfo.pageList = this.pageList;
                return attInfo;
            }
        },
        watch: {
            data: {
                handler(data) {
                    if (!_.isEmpty(data)) {
                        this.pageData = _.cloneDeep(data);
                    }
                },
                deep: true,
                immediate: true
            },
        },
        data() {
            return {
                pageData: null,
                pageList: [],                                   // 页面列表
            }
        },
        methods: {
            changeEvent(obj={}) {
                console.log('changeEvent', obj)
                switch(obj.act) {
                    case 'close':
                        this.exitsEdit();
                        break;
                }
            },
            handleSave() {

            },
            exitsEdit() {
                this.$emit('change', { act:'pageList' });
            },
            /**
             * @description 获取已配置的页面和组件列表
             */
            async getList() {
                var res = await pageFun.getPageList({
                    dbName: pageEngIntData.dbName,
                    tableName: pageEngIntData.tableName,
                    serverAddr: pageEngIntData.serverAddr
                });
                console.log('getList', res)
                if(res.error_code === 200) {
                    this.pageList = res.data;
                }
            }
        },
        created() {
            this.getList();
        }
    }
</script>

<style lang="scss" scoped>
    .page-editor-container{
        height: 100%;
    }
</style>
