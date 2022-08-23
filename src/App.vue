<template>
    <div id="unionpay-app">
        <!-- 路由视窗 -->
        <router-view />
        <!-- 弹窗窗口，通用 -->
        <el-dialog :visible.sync="dialogParams.visible" append-to-body :close-on-click-modal="false" :width="dialogParams.width">
            <div slot="title">
                <span>{{dialogParams.title}}</span>
            </div>
            <div class="content" style="padding:0px 10px;">
                <userLogin ref="user-login" openWindow @change="changeLogin" />
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import $bus from '@/utils/bus';
    import userLogin from '@/components/commons/login';
    export default {
        name: 'unionpay-app',
        components: {
            userLogin
        },
        metaInfo() {
            return {
                title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
                titleTemplate: title => {
                    return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE;
                }
            }
        },
        data() {
            return {
                dialogParams: {
                    visible: false,
                    title: '',
                    width: '400px'
                }
            }
        },
        methods: {
            handlerAction(eventName="") {
                // this.$route.query = Object.assign({}, this.$route.query, { redirect:this.$route.fullPath });
                console.log('this.$route', this.$route)
                switch(eventName) {
                    case 'login':
                        this.dialogParams = {
                            visible: true,
                            title: '用户登录（通行证）',
                            width: '400px'
                        }
                        break;
                }
            },
            changeLogin(redirect={}) {
                this.dialogParams.visible = false;
                this.$message.success('已登录！');
                if (redirect.path !== this.$route.fullPath) {
                    this.$router.push(redirect).catch(() => {});
                } else {
                    this.$router.go(0);
                }
            }
        },
        mounted() {
            $bus.$off('needLogin');
            $bus.$on('needLogin', () => {
                this.handlerAction('login');
            });
        },
        beforeDestroy() {
            $bus.$off('needLogin');
        }
    }
</script>
