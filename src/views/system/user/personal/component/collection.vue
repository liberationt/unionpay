<template>
  <div>
    <div style="margin-bottom:20px">我的收藏</div>
    <div class="flex">
      <div class="leftTab">
        <ul>
          <li v-for="(item, i) in tabList" :key="i" @click="tabChange(item,i)" :class="['list-item',type==i?'actived':'' ]">
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="rightTab">
        <div>
					<BasicSearch
						:searchData="searchInfo"
						:formVal="queryParams"
						@search="searchList"
					/>
        </div>
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
					<pagination
						v-show="total > 0"
						:total="total"
						:page.sync="queryParams.pageNum"
						:limit.sync="queryParams.pageSize"
						@pagination="getList"
					/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBehaviorRecordList} from "@/api/system/personal"
export default {
  data() {
    return {
      tabList: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "原子知识",
          value: "atom",
        },
        {
          label: "解决方案",
          value: "solution",
        },
        {
          label: "更多知识",
          value: "more",
        },
      ],
			searchInfo:{},
			// 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderByColumn: "",
        actionType: "collection",
        businessType:'',
				businessTitle:''
      },
			collectionClums:[
				{
					title: "收藏名称",
					key: "businessTitle",
					minWidth: "100",
				},
				{
					title: "业务类型",
					key: "businessType",
					minWidth: "100",
					align:"center"
				},
				{
					title: "时间",
					key: "createTime",
					minWidth: "100",
					align:"center"
				},
			],
			collectionList:[],
			page: {
				total: 0,
				pageSize: 10,
				pageNo: 1,
			},
			total:0,
			type:""
    };
  },
	methods:{
		/** 初始化查询 */
    initLabel() {
      this.searchInfo = {
        labelList: [
          { label: "关键词", key: "businessTitle", type: 1, clearable: true },
        ],
        btnList: [
          { label: "搜索", action: "search", type: 1 },
          // { label: "重置", action: "search", type: 0 },
        ],
      };
    },
		tabChange(item,i){
			this.type = i
			this.queryParams.businessType = item.value
			this.queryParams.pageNum = 1
      this.getList();
		},	
		searchList(e) {
      Object.keys(e).map((key) => {
        this.queryParams[key] = e[key];
      });
      this.queryParams.pageNum = 1
      this.getList();
    },
		getList(){
			getBehaviorRecordList(this.queryParams).then(res=>{
        const { rows,code,message,total} = res
        if(code==200){
          this.collectionList = rows
					this.total = total
        }
      })
		}
	},
	created(){
		this.initLabel()
	}
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  .leftTab {
    width: 12%;
		flex-shrink: 0;
    .list-item {
      text-align: center;
      line-height: 40px;
			cursor: pointer;
			&:hover{
				background: #f4f4f4;
			}
    }
		.actived{
			background: #f4f4f4;
		}
  }
  .rightTab {
		width:88%;
		border-left:1px #f4f4f4 solid;
		padding-left: 20px;
		box-sizing: border-box;
		.collectionTable{
			width:100%
		}
  }
}
</style>