<template>
    <div class="header-user-container">
        <div class="tools">
            <span>others</span>
            <el-divider direction="vertical"></el-divider>
            <template v-if="userInfo">
                <span>{{ userInfo.nickName }}</span>
            </template>
            <template v-else>
                <span>游客</span>
                <el-button type="text" icon="iconfont icon-RectangleCopy4" @click.stop.prevent="clickLogin">请登录</el-button>
            </template>
        </div>
        <template v-if="userInfo">
            <!-- 用户未读消息量 -->
            <div class="msgs" @click.stop.prevent="viewMsg">
                <el-badge :value="msgLens" :max="99" class="item">
                    <i class="iconfont" :class="msgLens>0 ?'icon-bellring':'icon-bell'" />
                </el-badge>
            </div>

            <div class="create-project" v-if="checkCreate">
                <el-dropdown @command="handleCommand">
                    <el-button size="mini" type="danger" style="border-radius: 20px;">
                        <i class="el-icon-s-promotion" /> 共创<i class="el-icon-arrow-down el-icon--right" />
                    </el-button>
                  <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item, idx) in createMenu" :key="idx" :command="item">{{item.label}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </div>

            <div class="user-pfofile">
                <!-- 用户头像及其他个人信息菜单 -->
                <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                    <div class="avatar-wrapper">
                        <img :src="avatar" class="user-avatar" />
                        <i class="el-icon-caret-bottom" />
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <router-link to="/user/profile">
                            <el-dropdown-item>个人中心</el-dropdown-item>
                        </router-link> -->
                        <router-link to="/home">
                           <el-dropdown-item>系统后台</el-dropdown-item>
                        </router-link>
                        <router-link to="/user/personal">
                            <el-dropdown-item>个人主页</el-dropdown-item>
                        </router-link>
                        <el-dropdown-item @click.native="setting = true"><span>布局设置</span></el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout"><span>退出登录</span></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { getUnreadMsgCount } from '@/api/system/user';
    import socketUtil from '@/utils/socketUtil';
    import $bus from '@/utils/bus';
    export default{
        name: 'header-user',
        computed: {
            ...mapGetters(['avatar', 'userInfo']),
            checkCreate() {
                return /^\/project/.test(this.$route.path);
            }
        },
        data() {
            return {
                msgLens: 0,
                createMenu: [
                    { label:'原子知识', path:`/project/together/atom`},
                    { label:'解决方案', path:`/project/together/solution`},
                    { label:'更多知识', path:`/project/together/more`}
                ]
            }
        },
        methods: {
            /**
             * @description 发起共创
             * @param{object} command
             */
            handleCommand(command) {
                console.log(command,888)
                if (command.path) {
                    this.$router.push(command.path)
                    // let path = command.path + `/`
                }
            },
            /**
             * @description 点击登录
             */
            clickLogin() {
                $bus.$emit('needLogin');
            },
            /**
             * @description 查看消息
             */
            viewMsg() {
                alert('跳转到用户标准管理平台->我的消息');
            },

            async logout() {
                this.$confirm('确定注销并退出系统吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('LogOut').then(() => {
                        location.href = '/index';
                    });
                }).catch(() => {});
            },
            async getUserMsgLens() {
                var res = await getUnreadMsgCount();
                if(res.code === 200) {
                    this.msgLens = res.data;
                }
            },
            /**
             * @description 创建socket实例，用户监听事件
             */
            initSocketInstance() {
                if (this.userInfo) {
                    socketUtil.initSocket(process.env.VUE_APP_SOCKET_URL, this.userInfo);
                }
                this.destroyEvents();
                // 接收全局发送消息名
                $bus.$on('sendMessage', data => {
                    socketUtil.sendMsg(data);
                });
                // 接收Socket推动消息
                $bus.$on('onmessage', data => {

                });
            },
            destroyEvents() {
                $bus.$off(['sendMessage','onmessage']);
            }
        },
        created() {
            this.getUserMsgLens();
        },
        mounted() {
            this.initSocketInstance();
        },
        beforeDestroy() {
            this.destroyEvents();
        }
    }
</script>

<style lang="scss" scoped>
    .header-user-container{
        display: flex;
        align-items: center;
        .msgs{
            margin: 0 10px;
            cursor: pointer;
            i {
                font-size:1.15rem;
                &.icon-bellring{
                    color: red;
                    font-size:1.25rem;
                }
            }
        }
        .user-pfofile{
            margin-left: 10px;
            img {
                height: 30px;
            }
        }
        .create-project{
            margin: 0 10px 0 20px;
        }
    }
</style>
