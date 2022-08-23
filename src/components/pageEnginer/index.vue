<template>
    <div class="bzt-page-enginer">
        <!--单条数据 :itemData v-on="$listeners"-->
        <template v-if="!listData.length">
            <pageRender :data="renderData" v-on="$listeners" :itemData="itemData" />
        </template>
        <template v-else>
            <!--列表条数据 :listData-->
            <template v-for="(item, idx) in listData">
                <!-- @change="changeEvent($event, item)" v-on="$listeners" 可以拦截-->
                <pageRender class="lists" :key="idx" :data="renderData" :itemData="item" :class="item.cls" @change="changeEvent($event, item)" />
            </template>
        </template>
    </div>

</template>

<script>
    import { pageRender, pageFun } from 'samshen-editor';
    import 'samshen-editor/dist/samshenEditor.css';
    export default{
        name: 'bzt-page-enginer',
        components: {
            pageRender
        },
        props: {
            data: {
                type: Object,
                default:() => {
                    return null
                }
            },
            itemData: {
                type: Object,
                default:() => {
                    return null
                }
            },
            // 数据
            listData: {
                type: Array,
                default:() => {
                    return []
                }
            },
            // 须改变的数据
            resetData: {
                type: Object,
                default:() => {
                    return null;
                }
            },
        },
        watch: {
            data: {
                handler(data) {
                    if (data && data.pageId) {
                        this.getPageData(data.pageId);
                    }
                },
                deep: true,
                immediate: true
            },
        },
        data() {
            return {
                loading: true,
                renderData: null
            }
        },
        methods: {
            async getPageData(pageId) {
                this.loading = true;
                var res = await pageFun.getPageData(this.data.pageId, this.data);
                if (res.error_code === 200) {
                    let content = JSON.parse(res.data.content);
                    // console.log(content);
                    if (this.resetData) {

                    }
                    this.renderData = { preview: true, content };
                    this.loading = false;
                    this.$emit('change', { act:'loaded' })
                }
            },
            changeEvent(obj={}, item={}) {
                console.log('pageEnginer changeEvent', obj, item);
                this.$emit('change', obj, item);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bzt-page-enginer{
        width: 100%;
        height: 100%;
        .clear{
            clear: both;
        }
        ::v-deep .page-render-container{
            width: 100%;
            height: 100%;
            @for $i from 2 through 8 {
                &.col-#{$i}{
                    grid-column: span $i;
                }
            }
        }
    }
</style>
