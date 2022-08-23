<template>
  <div class="standard-search-container">
    <!--头部搜索条件-->
    <div class="header">
      <div class="left">
        <div class="search-form">
          <el-autocomplete v-model="searchParams.searchValue" 
            placeholder="请输入关键字, 多个关键字用空格分隔" :trigger-on-focus="false" clearable @keyup.enter.native="getList" />
          <el-radio-group v-model="searchParams.searchType">
            <el-radio :label="1">题录检索</el-radio>
            <el-radio :label="2">全文检索</el-radio>
          </el-radio-group>
          <el-button size="small" type="cyan" icon="el-icon-search" :loading="searchLoading" @click="getList">搜索
          </el-button>
          <el-button size="small" type="warning" icon="el-icon-more-outline" :disabled="searchLoading"
            @click="moreFilter = !moreFilter">高级搜索</el-button>
          <el-button size="small" icon="el-icon-refresh" @click="refreshForm">重置</el-button>
        </div>
      </div>
      <div class="right">
      </div>
    </div>
    <!--高级检索-->
    <div class="filters" :class="{ show: moreFilter }">
      <ul class="base">
        <li>
          <div class="label">搜索关键字</div>
          <div class="form">
            <el-input size="small" v-model="searchParams.searchValue" prefix-icon="el-icon-search" clearable
              placeholder="请输入关键字, 多个关键字用空格分隔" />
          </div>
          <div class="label">标准状态</div>
          <div class="form">
            <el-radio-group v-model="searchParams.status">
              <el-radio :label="0">全部</el-radio>
              <el-radio :label="4">即将实施</el-radio>
              <el-radio :label="1">现行</el-radio>
              <el-radio :label="2">废止</el-radio>
            </el-radio-group>
          </div>
        </li>
        <li>
          <div class="label">标准编号</div>
          <div class="form">
            <el-input size="small" v-model="searchParams.stdNo" prefix-icon="el-icon-search" clearable
              placeholder="请输入标准编号" />
          </div>
          <div class="label">标准名称</div>
          <div class="form">
            <el-input size="small" v-model="searchParams.stdName" prefix-icon="el-icon-search" clearable
              placeholder="请输入标准名称" />
          </div>
        </li>
        <li>
          <div class="label">编制人</div>
          <div class="form">
            <el-input size="small" v-model="searchParams.stdChiefman" prefix-icon="el-icon-search" clearable
              placeholder="请输入编制人" />
          </div>
          <div class="label">编制部门</div>
          <div class="form">
            <el-input size="small" v-model="searchParams.stdChiefDept" prefix-icon="el-icon-search" clearable
              placeholder="请输入编制部门" />
          </div>
        </li>
        <li>
          <div class="label">日期选择</div>
          <div class="form" style="width: 120px">
            <el-select size="small" v-model="searchParams.dateType" clearable>
              <el-option value="publishdate" label="发布日期" />
              <el-option value="performdate" label="实施日期" />
              <el-option value="expireddate" label="废止日期" />
            </el-select>
          </div>
          <div class="form">
            <el-date-picker size="small" v-model="searchParams.dateRange" unlink-panels value-format="yyyy-MM-dd"
              type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </div>
        </li>
      </ul>
      <div class="btns">
        <el-button size="small" type="cyan" icon="el-icon-search" :loading="searchLoading" @click="getList">搜索
        </el-button>
        <el-button size="small" icon="el-icon-refresh" @click="refreshForm">重置</el-button>
        <el-button size="small" icon="el-icon-close" style="margin-left: 10px" @click="moreFilter = false">取消关闭
        </el-button>
      </div>
      <div class="collapse">
        <el-button circle icon="fa fa-angle-double-up" @click="moreFilter = false" />
      </div>
    </div>

    <!--数据列表-->
    <div class="search-content">
      <div class="main-content">
        <el-table v-loading="searchLoading" :data="listData" :default-sort="{prop: 'publishdate', order: 'descending'}"
          @sort-change='handleSort' style="width: 100%">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="标准状态" align="center" prop="status" width="80">
            <template slot-scope="scope">
              <div class='s-1' v-html="scope.row.stdStatus"></div>
            </template>
          </el-table-column>
          <el-table-column label="标准编号" prop="stdNo" sortable='custom' width="300" />
          <el-table-column label="标准名称" prop="stdName" sortable='custom' width="400">
            <template slot-scope="scope">
              <div class="std-name">
                <span class="name">{{ scope.row.stdName }}</span>
                <span v-if="scope.row.docId" class="struct" title="查看结构化数据"
                  @click.stop.prevent="openViewDoc(scope.row)"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="发布日期" align="center" prop="publishdate" sortable='custom'>
            <template slot-scope="scope">
              <span>{{ parseDate(scope.row.publishdate) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="实施日期" align="center" prop="performdate" sortable='custom'>
            <template slot-scope="scope">
              <span>{{ parseDate(scope.row.performdate) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="废止日期" align="center" prop="expireddate" sortable='custom'>
            <template slot-scope="scope">
              <span>{{ parseDate(scope.row.expireddate) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-button type="text" size="mini" icon="el-icon-document" @click="openDetail(scope.row)">详细信息</el-button>
              <el-button v-if="scope.row.isFavorites == false" type="text" size="mini" icon="el-icon-star-on"
                @click="handleFavorites(scope.row)">收藏</el-button>
              <el-button v-if="scope.row.isFavorites == true" type="text" size="mini" icon="el-icon-star-off"
                @click="handleFavorites(scope.row)">取消收藏</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="searchParams.pageNum"
          :limit.sync="searchParams.pageSize" @pagination="getList" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "standard-search",
  data() {
    return {
      // 高级搜索弹窗
      moreFilter: false,
      total: 0,
      // 搜索加载中
      searchLoading: false,
      // 搜索参数
      searchParams: {
        searchType: 1, // 搜索类型 1:题录 2:全文检索
        searchValue: "", // 搜索关键字
        stdNo: "",
        stdOldNo: "",
        stdName: "",
        deptName: "",
        stdChiefman: "",
        stdChiefDept: "",
        status: 0, // 标准状态
        bullStdType: 0,
        dateType: "", // 筛选时间类型
        dateRange: [], // 筛选时间范围
        pageNum: 1,
        pageSize: 10,
        orderByColumn: "publishdate",
        isAsc: "desc",
        stdLevel: 0,
      },
      // 游览文档
      viewDocDialog: {
        visible: false,
        docId: null,
        jumpOutlineId: null,
      },
      listData: []
    };
  },
  methods: {
    openViewDoc(row) {
      this.viewDocDialog.docId = row.docId;
      this.viewDocDialog.jumpOutlineId = null;
      this.viewDocDialog.visible = true;
    },
    openDetail(row) {},
    handleFavorites(row) {},
    parseDate(date) {
      if (date) {
        return this.parseTime(date, "{y}-{m}-{d}");
      }
      return "";
    },
    getList() {},
    handleSort(sort) {
      this.searchParams.orderByColumn = sort.prop;
      if (sort.order === "ascending") {
        this.searchParams.isAsc = "asc";
      } else if (sort.order === "descending") {
        this.searchParams.isAsc = "desc";
      } else {
        this.searchParams.isAsc = null;
        this.searchParams.orderByColumn = null;
      }
      this.getList();
    },
     refreshForm() {
            this.searchParams = {
                searchType: 1, // 搜索类型 1:题录 2:全文检索
                searchValue: "", // 搜索关键字
                stdNo: "",
                stdOldNo: "",
                stdName: "",
                deptName: "",
                stdChiefman: "",
                stdChiefDept: "",
                status: 0, // 标准状态
                bullStdType: 0,
                dateType: "", // 筛选时间类型
                dateRange: [], // 筛选时间范围
                pageNum: 1,
                pageSize: 10,
                orderByColumn: "publishdate",
                isAsc: "desc",
                stdLevel: 0,
            };
        },
  },
};
</script>

<style lang="scss" scoped>
@import "./search-standard.scss";
.standard-search-container {
  min-height: 800px;
}
</style>
