<template>
  <div>
    <div>工作台</div>
    <div class="headerInfo">
      <div class="harfWidth">
        <div class="basicTitle">待办任务</div>
        <div class="taskInfo">
            <div v-for="(item,i) in taskList" :key="i" class="flexCenter">
                <div class="displayFlex">
                    <span class="taskType">任务类型</span>
                    <span class="taskTitle">{{item.taskTitle}}</span>
                </div>
                <div class="yearTime">{{handelData(item.createTime)}}</div>
            </div>
        </div>
      </div>
      <div class="harfWidth">
        <div class="basicTitle">消息通知</div>
        <div class="taskInfo">
            <div v-for="(item,i) in messageList" :key="i" class="flexCenter">
                <span class="messageTitle">{{item.title}}</span>
                <div class="yearTime">{{handelData(item.createTime)}}</div>
            </div>
        </div>
      </div>
    </div>
    <div class="collection">
        <div class="basicTitle">收藏</div>
        <div class="collectionTable">
          <BasicTable
            :tableData="{
              column: collectionClums,
              data: collectionList,
              action:[]
            }"
            :hasIndex="true"
            :pageInfo="page"
          />   
        </div>
    </div>
    <div class="knowledge">
        <div class="basicTitle">知识</div>
        <div class="knowledgeTable">
          <BasicTable
            :tableData="{
              column: knowledgeClums,
              data: knowledgeList,
              action:[]
            }"
            :hasIndex="true"
            :pageInfo="page"
          />  
        </div>
    </div>
  </div>
</template>
<script>
import { getMessageList,getTodoTaskList,getBehaviorRecordList,getKnowledgeList } from "@/api/system/personal"
import { mapGetters } from "vuex";
export default {
  data() {
    return {
        messageList:[],
        taskList:[],
        collectionList:[],
        knowledgeList:[],
        collectionClums:[
          {
            title: "收藏名称",
            key: "businessTitle",
            // width: "100",
            minWidth: "150",
          },
          {
            title: "业务类型",
            key: "businessType",
            minWidth: "150",
            align:"center"
          },
          {
            title: "时间",
            key: "createTime",
            minWidth: "150",
            align:"center"
          },
        ],
        knowledgeClums:[
          {
            title: "知识名称",
            key: "klgName",
            // width: "100",
            minWidth: "150",
          },
          {
            title: "知识类型",
            key: "klgType",
            minWidth: "150",
            align:"center"
          },
          {
            title: "时间",
            key: "createTime",
            minWidth: "150",
            align:"center"
          },
        ],
        page: {
          total: 0,
          pageSize: 10,
          pageNo: 1,
        },
    };
  },
  dicts: ["sys_msg_type"],
  computed:{
    ...mapGetters(["userInfo"]),
  },
  methods:{
    /**获取消息列表 */
    getMessage(){
      getMessageList({
          pageSize:5,
          pageNum:1
      }).then(res=>{
        const {code, message,rows} = res
        if(code==200){
          this.messageList = rows
        }
      })
    },
    /**获取待办列表 */
    getTodoTask(){
      getTodoTaskList({pageSize:5,pageNum:1}).then(res=>{
        const { rows,code,message} = res
        if(code==200){
          this.taskList = rows
        }
      })
    },
    /** 收藏 */
    getCollection(){
      const req = {
        pageSize:5,
        pageNum:1,
        actionType:'collection',
        userId:this.userInfo.userId
      }
      getBehaviorRecordList(req).then(res=>{
        const { rows,code,message} = res
        if(code==200){
          this.collectionList = rows
        }
      })
    },
    //知识
    getKnowledge(){
      const req = {
        pageSize:5,
        pageNum:1,
        tag:"join"
      }
      getKnowledgeList(req).then(res=>{
        const { rows,code,message} = res
        if(code==200){
          this.knowledgeList = rows
        }
      })
    },
    /**时间截取处理 */
    handelData(data){
     if(data){
        data=data.slice(0,10)
     }
     return data
    }
  },
  mounted(){
    this.getMessage()
    this.getTodoTask()
    this.getCollection()
    this.getKnowledge()
  },
  created(){
  }
};
</script>
<style lang="scss" scoped>
.headerInfo{
    display: flex;
    justify-content: space-between;
    .harfWidth{
        width:48%;
        background: #fff;
        .taskInfo{
            height:200px;
            border:1px solid #f4f4f4;
            box-sizing: border-box;
            padding:10px;
            line-height:34px;
            .yearTime{
                width:120px;
                flex-shrink: 0;
                text-align: right;
            }
            .taskType{
                width:30%;
                // flex-shrink: 0;
                margin-right: 2%;
            }
            .taskTitle{
                width:68%;
                overflow:hidden; 
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            .messageTitle{
                width:68%;
                overflow:hidden; 
                white-space:nowrap;
                text-overflow:ellipsis;
            }
        }
    }
}
.collectionTable,.knowledgeTable{
    height:300px;
    border:1px solid #f4f4f4;
    padding:10px;
    box-sizing: border-box;

}
.flexCenter{
    display: flex;
    justify-content:space-between;
    width:100%;
}
.displayFlex{
    display: flex;
    flex:1;
}
.basicTitle{
    margin: 20px 0;
    font-weight: bold;
}
</style>