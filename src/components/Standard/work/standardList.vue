<template>
    <div class="standard-list-container">
        <div v-for="(item, idx) in standardList" :key="idx" :style="setWidth">
            <div :style="setBg(idx)">
                <div class="icon">
                    <i :class="item.icon"  />
                </div>
                <div class="content">
                    <div class="number">{{getStandardCount(item)}}</div>
                    <div class="label">{{item.label}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { stdTypeList } from '@/config';
    // import { getTopicCategoryCount } from "@/api/standard/topic";
    export default{
        name: "standard-list",
        computed:{
            setWidth(){
                return {
                    width: (100 / this.standardList.length) + "%"
                }
            }
        },
        data(){
            return {
                colors:["#72adf1","#73cc78","#ffa862","#f78bab","#d58bf7","#7575f5"],
                standardList: _.cloneDeep(stdTypeList),
                topicCategoryCount: {
                    gjbCount: 0,
                    gbCount: 0,
                    hbCount: 0,
                    dbCount: 0,
                    tbCount: 0,
                    qbCount: 0,
                },
            }
        },
        methods:{
            setBg(i){
                return {
                    "background-color": this.colors[i]
                }
            },
            getStandardCount(item){
                // return this.$global.randomNumber(5, 150);
                if (item.id == 1){
                    return this.topicCategoryCount.gjbCount;
                }else if (item.id == 2){
                    return this.topicCategoryCount.gbCount;
                }else if (item.id == 3){
                    return this.topicCategoryCount.hbCount;
                }else if (item.id == 4){
                    return this.topicCategoryCount.dbCount;
                }else if (item.id == 5){
                    return this.topicCategoryCount.tbCount;
                }else if (item.id == 6){
                    return this.topicCategoryCount.qbCount;
                }else{
                    return 0;
                }
            }
        },
        created() {
            // getTopicCategoryCount().then(res => {
            //     if (res.code == 200){
            //         this.topicCategoryCount = res.data;
            //     }
            // });
        }
    }
</script>

<style lang="scss" scoped>
    .standard-list-container{
        width: 100%;
        >div{
            padding: 10px;
            float: left;
            >div{
                width: 100%;
                //height: 120px;
                //border:1px solid #DDD;
                border-radius: 3px;
                display: inline-flex;
                justify-content: space-between;
                color: #FFF;
                .icon{
                    width: 40px;
                    //height: 100%;
                    background-color: rgba(0,0,0,.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25em;
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                }
                .content{
                    flex:1;
                    padding: 10px;
                    text-align: right;
                    .number{
                        font-size:20px;
                    }
                    .label{
                        font-size:14px;
                        padding: 5px 0;
                    }
                }
            }
        }
    }
</style>
