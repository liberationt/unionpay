<template>
    <div class="common-portal-menus">
        <span class="logo" @click="$router.push('/')">
            <img :src="logo" width="120" title="门户首页" />
        </span>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
            <el-menu-item v-for="(item, idx) in menuList.filter(o=> !o.hide)" :key="idx" :index="item.name">
                <span>{{item.label}}</span>
            </el-menu-item>
        </el-menu>
        <div class="user-info">
            <headerUser />
        </div>
    </div>
</template>

<script>
	import { defaultHeadMenus } from "@/config";
    export default {
        name: 'portal-menu',
        components: {
            headerUser: () => import('./headerUser.vue'),
        },
        // 传入数据参数
        props: {
            data: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        watch: {
            $route: {
                handler(route) {
                    console.log('route', route)
                    this.activeIndex = route.name || 'index';
                },
                immediate: true
            },
            data: {
                handler(data) {
                    if(!_.isEmpty(data)) {

                        this.menuList = _.cloneDeep(data);
                    }
                },
                deep: true,
                immediate: true
            }
        },
        data() {
            return {
                logo: require('@/assets/logo/homepage-logo.png'),
                activeIndex: 'index',
                menuList: defaultHeadMenus
            }
        },
        methods: {
            handleSelect(name="") {
                var data = this.menuList.find(o => o.name === name);
                if (data.path) {
                    this.$router.push(data.path);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .common-portal-menus{
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid #EEE;
        padding: 0 25px;
        ::v-deep .el-menu{
            background-color: transparent;
            flex:1;
            align-items: center;
            display: flex;
            justify-content: center;
            border:0;
            li{
                float: unset;
                font-size: 18px;
                &.is-active{
                    font-weight: bold;
                }
            }
        }
        .logo{
            cursor: pointer;
        }
        .user-info{

        }
    }
</style>
