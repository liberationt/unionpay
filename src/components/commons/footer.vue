<template>
    <div class="common-footer">
        <p>Copyright© 2022 上海润申 沪ICP 备 1522211号</p>
        <p>单位：润申标准化技术服务（上海）有限公司 地址：上海市杨浦区长阳路1687号E-Mail：99999@bzton.cn QQ：3555066588</p>
    </div>
</template>

<script>

</script>

<script>
    /**
     * @description 通用底部组件
     * 注意：内容从配置的 sys_config 接口获取
     */
    export default {
        name: 'common-footer',
        data() {
            return {

            };
        },
        methods: {

        }
    };
</script>

<style scoped lang="scss">
    .common-footer {
        width: 100%;
        padding: 15px 0;
        color: #888;
        // margin-top: 15px;
        // border-top: 1px solid #e7e7e7;
        p{
            text-align: center;
            line-height: 2;
        }
    }
</style>
