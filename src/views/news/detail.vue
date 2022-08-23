<template>
    <div class="new-detail-container">
        <div class="content" v-if="newsData">
            <h3 class="title">{{ newsData.noticeTitle }}</h3>
            <div class="desc">
                <span>发布时间：{{newsData.createTime}}</span>
                <el-divider direction="vertical" />
                <span>发布人：{{parseUser(newsData.createUser)}}</span>
                <el-divider direction="vertical" />
                <span>来源：{{newsData.noticeSource}}</span>
                <el-divider direction="vertical" />
                <el-button type="text" @click="$router.go(-1)">返回</el-button>
            </div>
            <div class="html-content" v-html="newsData.noticeContent">

            </div>
        </div>
        <commonFooter />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    // 通知公告数据接口
    import { getNotice } from '@/api/system/notice';
    // 缓存
    import { storeData } from '@/utils/index';
    // 门户菜单等组件
    import { commonFooter } from '@/components/commons/index.js';
    export default{
        name: 'new-detail',
        dicts: ['sys_notice_source'],
        components: {
            commonFooter
        },
        computed: {
            ...mapGetters(['userList']),
        },
        data() {
            return {
                newsData: null
            }
        },
        methods: {
            parseUser(userId) {
                let user = _.find(this.userList, { userId });
                return user ? user.nickName : '未名';
            },
        },
        created() {
            // 取出缓存数据
            this.newsData = storeData.get('news', true);
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/styles/variables.scss";
    .new-detail-container{
        .content{
            margin: 30px auto;
            width: $page-width;
            padding: 20px 40px;
            background-color: #FFF;
            border: 1px solid #EEE;
            box-shadow: 3px 3px 3px 0 rgba(0,0,0,.1);
            .title{
                text-align: center;
                font-size: 18px;
                font-weight: bold;
            }
            .desc{
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .html-content{

            }
        }
    }
</style>
