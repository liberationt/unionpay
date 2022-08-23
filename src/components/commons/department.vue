<template>
    <div class="common-dept-container">
        <treeselect :class="data.size" v-model="deptId" :options="deptOptions" :show-count="data.showcount" :multiple="data.multiple" clearable placeholder="请选择部门" @select="handleSelect" />
    </div>
</template>

<script>
    import Treeselect from "@riophae/vue-treeselect";
    import "@riophae/vue-treeselect/dist/vue-treeselect.css";
    import { treeselect } from "@/api/system/dept";
    export default {
        name: 'common-department',
        components: { Treeselect },
        props: {
            data: {
                type:Object,
                default: () => {
                    return {
                        showcount: true,
                        multiple: true,
                        deptId: undefined
                    }
                }
            }
        },
        watch: {
            data: {
                handler(data) {
                    if (data && data.deptId) {
                        this.deptId = data.deptId;
                    }
                },
                deep: true,
                immediate: true
            }
        },
        data() {
            return {
                deptId: undefined,
                deptOptions: []
            }
        },
        methods: {
            handleSelect() {
                this.$emit('change', this.deptId)
            },
            /** 查询部门下拉树结构 */
            getTreeselect() {
                treeselect().then(response => {
                    this.deptOptions = response.data;
                });
            },
        },
        created() {
            this.getTreeselect();
        }
    }
</script>

<style lang="scss" scoped>
    .common-dept-container{
        /* ::v-deep .vue-treeselect__control{
            height: 25px;
            line-height: 25px;
            .vue-treeselect__placeholder{
                line-height: 25px;
            }
            .vue-treeselect__multi-value{
                margin: 0;
                display: flex;
                align-items: center;
                .vue-treeselect__multi-value-item-container{
                    margin: 0 5px 0 0;
                    padding: 0;
                    .vue-treeselect__multi-value-item{
                        padding: 0;
                    }
                }
            }
        } */

    }
</style>
