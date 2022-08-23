<template>
    <div class="workflow-container">
        <flow-editor :data="flowData" isScroller isEdit @loaded="loadedEditor" @change="changeEvent" @close="closeEditor" />
    </div>
</template>

<script>
    import { flowEngIntData, emptyData } from '@/config';
    import { storeData } from '@/utils/index.js';
    import { flowEditor, flowFun } from 'samshen-editor';
    import 'samshen-editor/dist/samshenEditor.css';
    export default {
        name: 'flowengine-editor',
        components: {
            flowEditor
        },
        props: {
            data: Object
        },
        watch: {
            data: {
                handler(data) {
                    if (!_.isEmpty(data)) {
                        this.flowData = _.cloneDeep(data);
                    }
                },
                deep: true,
                immediate: true
            },
        },
        data() {
            return {
                flowData: Object.assign({}, emptyData, flowEngIntData),
                loading: true,
            }
        },
        methods: {
            loadedEditor(obj) {

            },
            /**
             * @description 流程编辑器上报事件
             * @param{Object} obj
             */
            changeEvent(obj={}) {
                console.log('edit changeEvent', obj)
                switch(obj.act) {
                    case 'save':
                        break;
                }
            },
            /**
             * @description 流程编辑器关闭
             */
            closeEditor() {
                this.$emit('change', { act:'flowList'})
            },
            loadData() {
                /* this.loading = true;
                var flowData = storeData.get('graphData', true) || {};
                this.flowData = Object.assign(flowData, emptyData, flowEngIntData); */
            }
        },
        mounted() {
            // this.loadData();
        }
    }
</script>

<style lang="scss" scoped>
    .workflow-container{
        height: 100%;
    }
</style>
