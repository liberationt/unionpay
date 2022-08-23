<template>
    <div class="common-share-container">share</div>
</template>

<script>
    export default{
        name: 'common-share',
        props: {
            data: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        methods: {
            
        }
    }
</script>

<style lang="scss" scoped>
    .common-share-container{
        padding: 15px;
    }
</style>
