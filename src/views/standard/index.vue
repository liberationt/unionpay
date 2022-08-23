<template>
    <div class="standard-manage-container">
        <section>
            <el-row :gutter="15">
                <el-col :span="18">
                    <div>
                        <h3 class="title">我的标准</h3>
                        <div>
                            <stage-list :data="formulateFlowStageCount" />
                        </div>
                        <div>
                            <standard-list />
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div>
                        <h3 class="title">我的积分</h3>
                        <div class="dashboard-score">
                            <div class="dot" >
                                <i class="el-icon-trophy"></i>
                                {{score}}
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </section>
        <section>
            <el-row :gutter="15">
                <el-col :span="6">
                    <div>
                        <h3 class="title">标准/表单的引用</h3>
                        <ul>
                            <li class="col-50">
                                <div>
                                    <div class="content">
                                        <label>标准引用</label>
                                    </div>
                                    <div class="number">{{quoteStatistics.quoteCount}}</div>
                                </div>
                            </li>
                            <li class="col-50">
                                <div>
                                    <div class="content">
                                        <label>不带年代引用</label>
                                    </div>
                                    <div class="number">{{quoteStatistics.noYearNumberCount}}</div>
                                </div>
                            </li>
                            <li class="col-50">
                                <div>
                                    <div class="content">
                                        <label>标准替换</label>
                                    </div>
                                    <div class="number">{{quoteStatistics.replaceCount}}</div>
                                </div>
                            </li>
                            <li class="col-50">
                                <div>
                                    <div class="content">
                                        <label>表单引用</label>
                                    </div>
                                    <div class="number">{{quoteStatistics.formCount}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="8">

                    <div>
                        <h3 class="title">我的任务</h3>
                        <ul>
                            <li class="col-25">
                                <div @click="goTask(0)">
                                    <div class="title">制修订任务</div>
                                    <div class="number" :class="{'active':getTaskCount(0)>0}">{{getTaskCount(0)}}</div>
                                </div>
                            </li>
                            <li class="col-25">
                                <div @click="goTask(1)">
                                    <div class="title">复审任务</div>
                                    <div class="number" :class="{'active':getTaskCount(1)>0}">{{getTaskCount(1)}}</div>
                                </div>
                            </li>
                            <li class="col-25">
                                <div @click="goTask(2)">
                                    <div class="title">废止任务</div>
                                    <div class="number" :class="{'active':getTaskCount(2)>0}">{{getTaskCount(2)}}</div>
                                </div>
                            </li>
                            <li class="col-25">
                                <div @click="goTask(4)">
                                    <div class="title">委员邀请</div>
                                    <div class="number" :class="{'active':getTaskCount(4)>0}">{{getTaskCount(4)}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div>
                        <h3 class="title">我发起的流程</h3>
                        <ul>
                            <li class="col-25-2">
                                <div @click = openFlowList(1)>
                                    <div class="title">制(修)订流程</div>
                                    <div class="number">{{flowCount.formulate}}</div>
                                </div>
                            </li>
                            <li class="col-25-2">
                                <div @click = openFlowList(2)>
                                    <div class="title">复审流程</div>
                                    <div class="number">{{flowCount.review}}</div>
                                </div>
                            </li>
                            <li class="col-25-2">
                                <div @click = openFlowList(3)>
                                    <div class="title">废止流程</div>
                                    <div class="number">{{flowCount.repeal}}</div>
                                </div>
                            </li>
                            <li class="col-25-2">
                                <div @click = openFlowList(4)>
                                    <div class="title">培训流程</div>
                                    <div class="number">{{flowCount.training}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </section>

        <section>
            <el-row :gutter="15">
                <el-col :span="24">
                    <div style="height:300px;">
                        <el-tabs v-model="activeTabName">
                            <el-tab-pane label="我的收藏" name="fav">
                                <el-table size="mini" :data="favoritesList" stripe style="width: 100%;">
                                    <el-table-column label="收藏目录" align="center" prop="favoritesCatalog.name" :show-overflow-tooltip="true"
                                        width="150" />
                                    <el-table-column label="标准状态" align="center" prop="topic.status" width="100">
                                        <template slot-scope="scope">
                                        <div v-if="scope.row.topic" v-html="parseStatus(scope.row.topic.status)"></div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="标准编号" prop="topic.stdNo" :show-overflow-tooltip="true" />
                                    <el-table-column label="标准名称" prop="topic.stdName" :show-overflow-tooltip="true"/>
                                    <el-table-column label="发布日期" align="center" prop="topic.publishdate" width="150">
                                        <template slot-scope="scope">
                                        <span v-if="scope.row.topic">{{ parseDate(scope.row.topic.publishdate) }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="实施日期" align="center" prop="topic.performdate" width="150">
                                        <template slot-scope="scope">
                                        <span v-if="scope.row.topic">{{ parseDate(scope.row.topic.performdate) }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="收藏时间" align="center" prop="createTime" width="200">
                                        <template slot-scope="scope">
                                        <span>{{ parseTime(scope.row.createTime) }}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                        </el-tabs>
                         <div class="more">
                             <el-link @click="toFavorites" type="primary">
                                 <i class="el-icon-d-arrow-right" />查看全部
                             </el-link>
                         </div>
                    </div>

                </el-col>
             
            </el-row>
        </section>
        <!-- 页面底部信息 -->
        <footer>
            <commonFooter />
        </footer>
    </div>
</template>

<script>
    // 门户菜单等组件
    import { commonFooter } from '@/components/commons/index.js';
    import { stageList, standardList } from "@/components/Standard/work/index.js";
    export default {
        name: 'standard-manage',
        components: {
            commonFooter, stageList, standardList
        },
        data(){
            return {
                quoteStatistics: {
                    quoteCount: 0,
                    noYearNumberCount: 0,
                    replaceCount: 0,
                    formCount: 0,
                },
                flowCount:{
                    formulate:0,
                    review:0,
                    repeal:0,
                    training:0
                },
                formulateFlowStageCount:[],
                taskTypeOptions:[],
                activeTabName: "fav",
                // 收藏表格数据
                favoritesList: [],
                score: 0
            }
        },
        methods: {
            getTaskCount(index){
                if (this.taskTypeOptions[index] === undefined){
                    return ;
                }
                let data = this.taskTypeOptions[index].count;
                return data ? data : 0;
            },
            toFavorites(){
                this.$router.push({ path: "/users/favorites"});
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/components/Standard/work/index.scss";
    .standard-manage-container{
        min-height: 800px;
        padding: 15px;
    }
</style>
