<template>
    <div class="doc-knowledge-container">
        <div class="left-wrapper">
            <div>left-wrapper</div>
        </div>
        <div class="main-wrapper">
            <div>main</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'doc-knowledge',
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .doc-knowledge-container{
        background-color: #F8F8F8;
        padding: 10px;
        width: 100%;
        display: flex;
        >div{
            padding:5px;
            &.left-wrapper{
                flex: 0 0 250px;
            }
            &.main-wrapper{
                flex:1;
            }
            >div{
                background-color: #FFF;
                border: 1px solid #EEE;
                border-radius: 5px;
            }
        }

    }
</style>
