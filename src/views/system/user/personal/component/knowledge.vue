<template>
  <div>
    <div style="margin-bottom: 20px">我的知识</div>
    <div class="flex">
      <div class="leftTab">
        <ul>
          <li
            v-for="(item, i) in tabList"
            :key="i"
            @click="tabChange(item, i)"
            :class="['list-item', type == i ? 'actived' : '']"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="rightTab">
        <div class="collectionTable">
          <div class="list-datas">
            <div class="orders">
              <span style="width: 80px">排序：</span>
              <span
                >按发布日期
                <commonOrder :type="'publishDate'" @change="changeOrder" />
              </span>
              <span
                >按收藏数量
                <commonOrder :type="'publishDate'" @change="changeOrder" />
              </span>
              <span
                >按点赞数量
                <commonOrder :type="'publishDate'" @change="changeOrder" />
              </span>
              <BasicSearch
                :searchData="searchInfo"
                :formVal="queryParams"
                @search="searchList"
              />
            </div>
            <div class="content" id="paroject-search-list">
              <!-- 引擎渲染列表内容 -->
              <pageEnginer
                :data="renderData"
                :listData="listData"
                @change="changeEvent"
              />
            </div>
            <div class="pages">
                <!-- <pagingSmall
                  :pageSize="queryParams.pageSize"
                  :currentPage="queryParams.pageNum"
                  :total="total"
                 @change="getList"
                /> -->
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
        <!-- <div >
          <BasicTable
            :tableData="{
              column: collectionClums,
              data: collectionList,
              action: [],
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
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getKnowledgeList } from "@/api/system/personal"
import pagingSmall from '@/components/Pagination/pagingSmall';
import { pageEngIntData, commonHeadMenus, statusList } from "@/config";
import pageEnginer from '@/components/pageEnginer';
import { commonOrder } from "@/components/commons";
import { mapGetters } from 'vuex';

export default {
  components: { commonOrder,pageEnginer,pagingSmall },
  computed: {
    ...mapGetters(['hotWords', 'deptList', 'userList']),
    renderData() {
      return Object.assign({}, pageEngIntData, {
        pageId: "03aff90f-62a9-467f-9199-86f6ccfb0304",
      });
    },
  },
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
      conditionTabs: [
          { label:'全站', value:'all'},
          { label:'原子知识', value:'atom'},
          { label:'解决方案', value:'solution'},
          { label:'更多知识', value:'more'},
          { label:'知识合辑', value:'album'},
          { label:'评论', value:'comment'},
          { label:'问答区', value:'question'},
          { label:'用户', value:'user'},
      ],
      listData: [],
      searchInfo: {},
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        klgType:'',
        orderByColumn: "",
        isAsc:'',
        actionType: "",
        klgName:'',
        tag:'join'
      },
      collectionClums: [
        {
          title: "收藏名称",
          key: "businessTitle",
          minWidth: "100",
        },
        {
          title: "业务类型",
          key: "businessType",
          minWidth: "100",
          align: "center",
        },
        {
          title: "时间",
          key: "createTime",
          minWidth: "100",
          align: "center",
        },
      ],
      collectionList: [],
      page: {
        total: 0,
        pageSize: 10,
        pageNo: 1,
      },
      total: 0,
      type: "",
      statusList,
    };
  },
  methods: {
    /** 初始化查询 */
    initLabel() {
      this.searchInfo = {
        labelList: [
          { label: "知识名称", key: "klgName", type: 1, clearable: true },
          {
            label: "标签",
            key: "tag",
            type: 7,
            options: [
              {
                label: "我参与的",
                value: "join",
              },
              {
                label: "与我分享的",
                value: "share",
              },
            ],
          },
        ],
        btnList: [
          { label: "搜索", action: "search", type: 1 },
          // { label: "重置", action: "search", type: 0 },
        ],
      };
    },
    changeOrder(orderBy = "", type = "publishDate") {
      this.$set(this.queryParams, "orderColumn", type);
      this.$set(this.queryParams, "isAsc", orderBy);
      // this.getListData();
    },
    /**
     * @description 页面引擎上报事件
     * @param{Object} obj
     */
    changeEvent(obj = {}, data = {}) {
      console.log("project search changeEvent", obj, data);
      switch (obj.act) {
        // 路由跳转
        case "url":
          if (obj.data.path) {
            let path = obj.data.path + "?tab=file";
            if (obj.data.data) {
              path += "&" + obj.data.data;
            }
            this.$router.push({ path });
          }
          break;
        // 弹窗，须先注册el-dialog组件，然后调用子组件
        case "dialog":
          this.dialogVisible = true;
          break;
      }
    },
    tabChange(item, i) {
      this.type = i;
      this.queryParams.businessType = item.value;
      this.queryParams.pageNum = 1;
      this.getList();
    },
    searchList(e) {
      Object.keys(e).map((key) => {
        this.queryParams[key] = e[key];
      });
      this.queryParams.pageNum = 1;
      this.getList();
    },
    getList() {
      getKnowledgeList(this.queryParams).then((res) => {
        const { rows, code, message, total } = res;
        if (code == 200) {
          this.total = total;
          this.listData = rows.map((item, index) => {       
              let tabData = _.find(this.conditionTabs, { value:item.es_type });
              if (tabData) {
                  item.es_type = tabData.label;
              }
              item.number = index + 1;
              let user = _.find(this.userList, { userId:item.owner });
              item.nickName = user ? user.nickName : '未名';
              let dept = _.find(this.userList, { userId:item.owner });
              item.deptName = dept ? dept.deptName : '未定义';
              let status = _.find(this.statusList, { value:item.status });
              item.status = status ? status.label : '未定义';
              
              item.publish_date = this.parseTime(item.publishDate);
              item.klg_name = item.es_name = item.klgName

              // 点赞数等

              item.likeCount = item.behaviorRecordStatisticsVo ? item.behaviorRecordStatisticsVo.likeCount||0 : 0;
              item.commentCount = item.behaviorRecordStatisticsVo ? item.behaviorRecordStatisticsVo.commentCount||0 : 0;
              item.readCount = item.behaviorRecordStatisticsVo ? item.behaviorRecordStatisticsVo.readCount||0 : 0;
              item.collectionCount = item.behaviorRecordStatisticsVo ? item.behaviorRecordStatisticsVo.collectionCount||0 : 0;
              item.shareCount = item.behaviorRecordStatisticsVo ? item.behaviorRecordStatisticsVo.shareCount||0 : 0;
              return item;
          })
        }
      });
    },
  },
  created() {
    this.initLabel();
  },
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
      &:hover {
        background: #f4f4f4;
      }
    }
    .actived {
      background: #f4f4f4;
    }
  }
  .rightTab {
    width: 88%;
    border-left: 1px #f4f4f4 solid;
    padding-left: 20px;
    box-sizing: border-box;
    .collectionTable {
      width: 100%;
    }
  }
}
.list-datas {
  min-height: 100px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.1);
  .orders {
    line-height: 3;
    border-bottom: 1px solid #eee;
    padding: 0 15px;
    > span {
      margin-right: 25px;
    }
  }
  .pages {
    padding: 10px 0;
    display: flex;
    justify-content: center;
  }
  ::v-deep em.high-light {
    color: red;
  }
}
</style>