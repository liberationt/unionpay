<template>
    <div class="stage-list-container">
        <div class="step" v-for="(node, index) in stages" :key="index" :style="setWidth" :title="`我的标准工作[${node.stageName}]有${node.count}个`">
            <div class="tags">
                <div class="dot">
                    <span :class="{'active': node.count}" @click.stop.prevent="goUrl(index,node)">
                        {{node.count}}
                    </span>
                    <em class="line start"></em>
                    <em class="line end"></em>
                    <em class="arrow"></em>
                </div>
                <div class="name" :class="{'active': node.count}">
                    {{node.stageName}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name:"stage-list",
    props: {
        data:Array
    },
    data(){
      return {
          stages:[
              {stageName:"立项阶段", count:0},
              {stageName:"起草阶段", count:0},
              {stageName:"审查批准阶段", count:0},
              {stageName:"归档培训阶段", count:0},
              {stageName:"标准复审", count:0},
              {stageName:"标准废止", count:0},
          ]
      }
    },
    computed:{
        setWidth(){
            return {
                width: (100 / this.stages.length) + "%"
            }
        }
    },
    watch:{
        data: {
            immediate: true,
            handler(val) {
                this.resetChecked = val;
                for (let i = 0; i < this.stages.length; i++) {
                    if (this.data[i]!==undefined){
                        this.stages[i].count = this.data[i].count;
                    }
                }
            }
        }
    },
    methods:{
        goUrl(index,node){
            //为0则return
            // if(!node.count){
            //     return;
            // }
            switch (index) {
                case 0:this.$router.push({path:"/standard/formulateProject",query:{status:2,stageName:"立项阶段"}});break;
                case 1:this.$router.push({path:"/standard/formulateProject",query:{status:2,stageName:"起草阶段"}});break;
                case 2:this.$router.push({path:"/standard/formulateProject",query:{status:2,stageName:"审查批准阶段"}});break;
                case 3:this.$router.push({path:"/standard/formulateProject",query:{status:2,stageName:"归档培训阶段"}});break;
                case 4:this.$router.push({path:"/standard/reviewProject",query:{status:2}});break;
                case 5:this.$router.push({path:"/standard/repealProject",query:{status:2}});break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .stage-list-container{
        display: flex;
        padding:20px 0;
        .step{
            .tags{
                .dot{
                    position: relative;
                    display: flex;
                    justify-content: center;
                    >span{
                        z-index:1;
                        width: 40px;
                        height: 40px;
                        font-size: 20px;
                        background-color: #cacaca;
                        display: block;
                        border-radius: 50%;
                        text-align: center;
                        border: 3px solid #efefef;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #f1f1f1;
                        transition: all .3s;
                        &.active{
                            background-color: #f37f24;
                            border-color: #ffd8a5;
                            color: #FFF;
                            font-weight: bold;
                            transform: scale(1.15);
                        }
                        &:hover{
                            background-color: #4e6ab9;
                            border-color: #87a6ea;
                            color: #FFF;
                            font-weight: bold;
                            transform: scale(1.15);
                        }

                    }
                    >em.line{
                        position: absolute;
                        z-index:0;
                        top:calc(50% - 5px);
                        height: 10px;
                        background-color: #efefef;
                        &.start{
                            left:0;
                            right: calc(50% + 50px);
                        }
                        &.end{
                            left:calc(50% + 40px);
                            right:0;
                        }
                    }
                    >em.arrow{
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-width: 10px;
                        border-style: solid;
                        border-color: transparent transparent transparent #efefef;
                        right: calc(50% + 30px);
                        top: calc(50% - 10px);
                    }
                }

                .name{
                    text-align: center;
                    padding:10px 0;
                    font-size: 14px;
                    //color: #888;
                    &.active{
                        color: #f37f24;
                        font-weight: bold;
                    }
                }
            }
            &:first-child{
                .tags{
                    .dot{
                        >em.line{
                            &.start{
                                display: none;
                            }
                        }
                        >em.arrow{
                            display: none;
                        }
                    }
                }
            }
            &:last-child{
                .tags{
                    .dot{
                        >em.line{
                            &.end{
                                display: none;
                            }
                        }
                    }
                }
            }
        }

    }
</style>
