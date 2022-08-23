<template>
  <div class="headerMain">
    <el-row :gutter="20">
      <el-col :span="3" :xs="24">
        <div class="nameUrl">
          <img src="" alt="" />
        </div>
      </el-col>
      <el-col :span="21" :xs="24">
        <el-row :gutter="20">
          <el-col :span="5" :xs="24">
            <span class="userName">{{persionInfo.userName}}</span>
          </el-col>
          <el-col :span="19" :xs="24" v-if="persionInfo.programme">
            <div class="programmeList">
              <div v-for="(item,i) in persionInfo.programmeList" :key="i" class="programmeItem">
                <span class="label">{{item.label}}</span>
                <span class="value">{{item.value}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="21" :xs="24">
        <el-row :gutter="20">
          <template v-for="(item,i) in persionInfo.labelItem" >
            <el-col :span="5" :xs="24"  :key="i"  v-if="item.type==1">
              <div class="labelItem">
                <span>{{item.label}}:</span>
                <span>{{item.value}}</span>
              </div>
            </el-col>
						<el-col :span="20" :xs="24" :key="i" v-else-if="item.type==2">
              <div class="labelItem">
                <span>{{item.label}} :</span>
                <span class="labelArr" v-for="(items,v) in item.value" :key="v">{{items}}</span>
              </div>
            </el-col>
            <el-col :span="5" :xs="24" :key="i" v-else-if="item.type==3">
              <div class="labelItem">
                <span>{{item.label}} :</span>
              </div>
            </el-col>
          </template>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    persionInfo: {
      type: Object,
      default: () => {
        return {
          userName: "张翠山",
          isExpert: "1", //1 普通 2 游客 3专家
          avatar: "", //头像
					programme:false, //是否展示头部列表
          programmeList: [
            {
              label: "",
              value: "",
            },
          ], //头部展示
          labelItem: [
            {
              type: 1, //1 普通 2 数组
              label: "",
              value: "",
            },
          ],
        };
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.headerMain {
	padding:10px 0 20px;
	box-shadow: 5px 5px 5px 0px rgba(215,215,215,0.35); 
  background: #fff;
  .nameUrl {
    width: 104px;
    height: 104px;
    border-radius: 50%;
    overflow: hidden;
    background: red;
    margin: 0 auto;
  }
  .userName {
    font-size: 24px;
    font-weight: bold;
  }
  .programmeList {
    display: flex;
    .programmeItem {
      padding: 16px;
      display: flex;
      height: 50px;
      background: #f2f2f2;
      border-radius: 6px;
      margin-right: 20px;
      .label {
        margin-right: 30px;
      }
    }
  }
}
.labelItem {
  line-height: 40px;
  display: flex;
  align-items: center;
	margin-top: 10px;
  span:nth-of-type(1) {
    // width: 100px;
    font-size: 18px;
    font-weight: 500;
    margin-right: 10px;
  }
  span:nth-of-type(2) {
    font-size: 16px;
  }
	.labelArr{
		padding: 0px 20px;
		border-radius: 6px;
		font-size: 16px;
		border:1px solid #f4f4f4;
		margin-right: 10px;
	}
}
</style>