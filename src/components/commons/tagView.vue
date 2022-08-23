<template>
    <div class="tag-view-container">
        <span class="list" v-for="(item, idx) in visitedViews" :key="idx" @click.stop.prevent="handleClick(item)">
            <i v-if="item.icon" :class="item.icon" />{{item.label}}
        </span>
        <search v-if="search" id="header-search" class="right-menu-item" />
    </div>
</template>

<script>
    /**
     * @description 自定义布局的面包屑导航条，具体数据结构参照 /router/index
     * ---------------------------------------------
     */
    import Search from '@/components/HeaderSearch';
    export default {
        name: 'project-tag-view',
        components: {
            Search
        },
        props: {
            search: Boolean,            // 是否须要搜索框
            portal: Boolean,            // 是否门户页
            menu: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        watch: {
            $route: {
                handler(route) {
                    this.setNaveMenu();
                },
                immediate: true
            },
        },
        data() {
            return {
                visitedViews: [],
            }
        },
        methods: {
            handleClick(item={}) {
                if (item.path) {
                    this.$router.push({ path:item.path });
                }
            },
            /**
             * @description 设置面包屑
             * @param {Object} route
             */
            setNaveMenu(route) {
                // 门户首页
                this.visitedViews = [{ label:'首页', path:'/', icon:'iconfont icon-homepage' }];
                // 第一个导航菜单，非门户页的则加入
                if (!this.portal) {
                    this.visitedViews.push(this.menu[0]);
                }
                console.log('this.$route.path', this.$route.path)
                // 第二级菜单
                var pathIndex = _.findIndex(this.menu, { path:this.$route.path });
                if (!!~pathIndex && pathIndex > 0) {
                    this.visitedViews.push(this.menu[pathIndex]);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tag-view-container{
        padding: 10px 15px;
        >span {
            cursor: pointer;
            font-size: 14px;
            &:hover {
                color: #409EFF;
            }
            &.list:not(:last-child)::after {
                margin-right: 5px;
                content: "/";
            }
            >i {
                margin-right: 3px;
            }
        }
    }
</style>
