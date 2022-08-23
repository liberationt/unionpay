<template>
  <div class="app-container">
    
    <HeaderInfo :persionInfo="persionInfo" />
      <el-row :gutter="20">
        <div style="display:flex">
          <el-col :span="4" :xs="24">
            <left-nav-bar @tabChange="tabChange" />
          </el-col>
          <el-col :span="20" :xs="24">
            <div class="mainContent">
                <component :is="compUrl"></component>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
</template>

<script>
import HeaderInfo from "@/components/User/index.vue";
import leftNavBar from "./leftNavBar.vue";
import { getUserInfo } from "@/api/personal";
import { mapGetters } from "vuex";

import * as userCmp from './index.js';
export default {
  name: "Profile",
  components: { HeaderInfo,leftNavBar },
  data() {
    return {
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: "userinfo",
      persionInfo: {
        userName: "张翠山",
        isExpert: "1", //1 普通 2 游客 3专家
        avatar: "", //头像
        programme:true,
        programmeList: [
          {
            label: "共创数量",
            value: "113",
          },
          {
            label: "原子数量",
            value: "38",
          },
        ], //头部展示
        labelItem: [
          {
            type: 1, //1 普通 2 数组
            label: "手机号",
            value: "15000111199",
          },
          {
            type: 1, //1 普通 2 数组
            label: "邮箱",
            value: "liberationt@163.comn",
          },
          {
            type: 1, //1 普通 2 数组
            label: "所属部门",
            value: "15000111199",
          },
          {
            type: 1, //1 普通 2 数组
            label: "手机号",
            value: "15000111199",
          },
          {
            type: 2, //1 普通 2 数组
            label: "专业领域",
            value: ["数学天才","英语天才","俄语天才"],
          },
        ],
      },
      compType:'workbench'
    };
  },
  computed:{
    ...mapGetters(["userInfo"]),
    compUrl(){
        return userCmp[this.compType]
    },
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      let userId = this.userInfo.userId
      getUserInfo(userId).then((res) => {
        const {code,data,msg} = res
        if(code==200){
          const {userName,sex,phonenumber,email,degree,companyId,orgId} = data
          this.persionInfo = {
              userName:userName,
              labelItem:[
                {
                  label:'性别',
                  value:sex == 0 ? "男":1?"女":'未知',
                  type:1
                },
                {
                  label:'手机号',
                  value:phonenumber,
                  type:1
                },
                {
                  label:'邮箱',
                  value:email,
                  type:1
                },
                {
                  label:'职务',
                  value:degree,
                  type:1
                },

                {
                  label:'所属公司',
                  value:companyId,
                  type:3,
                  filterName:''
                },
                {
                  label:'用户类型',
                  value:orgId,
                  type:3
                },
                
            ]
          }
        }
      });
    },
    tabChange(compType){
        this.compType = compType
    }
  },
};
</script>
<style lang="scss" scoped>
.app-container{
  // height:100vh;
  // overflow-y:auto;
}
.main{
  background: red;
}
.mainContent{
  margin-top: 20px;
  // height: 650px;
  padding:20px;
  background: #fff;
} 
</style>
