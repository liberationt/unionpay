<template>
    <div class="project-users-container">
        <!-- 用户卡片 -->
        <div class="user-card">
            <pageEnginer v-if="userInfo" :data="renderUser" :itemData="userInfo" @change="changeUserEvent" />
        </div>

        <!-- 页面底部信息 -->
        <footer>
            <commonFooter />
        </footer>
    </div>
</template>

<script>
    // 页面渲染引擎配置参数
    import { pageEngIntData } from '@/config';
    // 页面渲染引擎
    import pageEnginer from '@/components/pageEnginer';
    // 用户信息接口
    import { getUser } from '@/api/system/user';

    // 通用组件
    import { commonFooter } from '@/components/commons/index.js';
    export default {
        name: 'project-users',
        components: {
            pageEnginer, commonFooter
        },
        computed: {
            renderUser() {
                return Object.assign({}, pageEngIntData, { pageId:"ff8823b2-c142-4984-8d35-7be69ec92652" });
            }
        },
        data() {
            return {
                userId: '',
                userInfo: null,
            }
        },
        methods: {
            /**
             * @description 用户卡片事件
             * @param{Object} obj
             */
            changeUserEvent(obj) {

            },
            /**
             * @description 获取用户信息
             */
            async getUserInfo() {
                this.userInfo = null;
                if (!this.userId) {
                    this.$message.error('未定义用户ID');
                    return;
                }
                var res = await getUser(this.userId);
                console.log('getUserInfo', res)
                if (res.code === 200) {
                    this.userInfo = {
                        avatar: res.data.avatar || process.env.VUE_APP_NODE_URL + '/files/images/profile.jpg',
                        nickName: res.data.nickName,
                        // icon: 'el-icon-star-off',
                        deptName: res.data.dept.deptName,
                        email: res.data.email,
                        /* programme: [
                            { label:'', value:'' },
                            { label:'', value:'' },
                            { label:'', value:'' },
                            { label:'', value:'' },
                            { label:'', value:'' },
                            { label:'', value:'' },
                        ], */
                    }
                    console.log('userInfo', this.userInfo)
                }
            }
        },
        created() {
            console.log(this.$route.params)
            if (this.$route.params && this.$route.params.userId) {
                this.userId = this.$route.params.userId;
            }
            this.getUserInfo();
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/variables.scss";
    .project-users-container {
        .user-card{
            margin: 30px auto;
            padding:20px;
            background-color: #FFF;
            width: $page-width;
            border: 1px solid #EEE;
            box-shadow: 3px 3px 3px 0 rgba(0,0,0,.1);
        }
    }
</style>
