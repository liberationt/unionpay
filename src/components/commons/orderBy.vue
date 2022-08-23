<template>
    <span class="caret-wrapper" :class="clsName">
        <i class="sort-caret ascending" title="正序" @click.stop.prevent="handleSortClick('asc')" />
        <i class="sort-caret descending" title="倒序" @click.stop.prevent="handleSortClick('desc')" />
    </span>
</template>

<script>
    export default{
        name: 'common-order',
        props: {
            order: String
        },
        watch: {
            order: {
                handler(str) {
                    this.clsName = str;
                },
                immediate: true
            }
        },
        data() {
            return {
                clsName: ''
            }
        },
        methods: {
            handleSortClick(cls="") {
                this.clsName = cls;
                this.$emit('change', cls);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .caret-wrapper{
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        height: 18px;
        width: 10px;
        vertical-align: middle;
        cursor: pointer;
        overflow: initial;
        position: relative;
        &.asc {
            .sort-caret.ascending{
                border-bottom-color: #409eff;
            }
        }
        &.desc {
            .sort-caret.descending{
                border-top-color: #409eff;
            }
        }
        .sort-caret {
            width: 0;
            height: 0;
            border: 5px solid transparent;
            position: absolute;
            left: 0px;
            top:0px;
            &.ascending {
                border-bottom-color: #c0c4cc;
                top: 3px;
            }
            &.descending {
                border-top-color: #c0c4cc;
            }

        }
    }
</style>
