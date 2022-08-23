<template>
  <div class="scp-system-container">
    <div class="main">
      <div class="forms">
        <el-form size="mini" :model="queryParams" ref="queryForm" :inline="true">
          <el-form-item label="体系名称">
            <el-input v-model="queryParams.systemName" placeholder="请输入体系名称" style="width:200px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="cyan" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tables" v-loading="loading">
        <el-table size="mini" :data="dataList" style="width: 100%;">
          <el-table-column prop="systemName" label="体系名称" />
          <el-table-column prop="sysDepId" label="归属部门">
            <template slot-scope="scope">
              <div>{{parseStr(scope.row, 'sysDepId')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="publishDate" label="发布日期" width="110">
            <template slot-scope="scope">
              <div>{{parseStr(scope.row, 'publishDate')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="sysDepId" label="实施日期" width="110">
            <template slot-scope="scope">
              <div>{{parseStr(scope.row, 'performDate')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="sysDepId" label="创建时间" width="110">
            <template slot-scope="scope">
              <div>{{parseStr(scope.row, 'createTime')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" />
          <el-table-column width="120" align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-view" @click="handleView(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
          @pagination="getList" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "system-list",
  data() {
    return {
      queryParams: {
        systemName: "",
        sysDepId: "",
        pageNum: 1,
        pageSize: 30,
        isAsc: "desc",
        orderByColumn: "create_time",
      },
      deptProps: {
        value: "deptId",
        label: "deptName",
        children: "children",
      },
      deptList: [],
      total: 0,
      loading: false,
      dataList: [],
      sourceDepts: [],
    };
  },
  methods: {
    setQuerySysDepId(id) {
      this.queryParams.sysDepId = id;
    },

    parseStr(row, fieldName) {
      if (!row[fieldName]) return "";
      switch (fieldName) {
        case "publishDate":
        case "performDate":
        case "createTime":
          return this.parseTime(row[fieldName], "{y}-{m}-{d}");
        case "sysDepId":
          let data = _.find(this.sourceDepts, { deptId: row[fieldName] });
          return data ? data.deptName : "";
        default:
          return row[fieldName];
      }
    },
    // 表单重置
    reset() {
      this.resetForm("queryForm");
    },
    handleView(row) {
      this.$storage.session.set("csmStdSystemId", row.csmStdSystemId);
      this.$router.push({
        path: "./sysnode",
      });
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.reset();
      this.handleQuery();
    },
    // 提交查询
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 获取标准体系列表
    getList() {
      if (
        this.$store.state.user.permissions.indexOf(
          "standard:system:manage:allShow"
        ) > -1 ||
        this.$store.state.user.permissions.indexOf("*:*:*") > -1
      ) {
        //this.queryParams.sysDepId = this.queryParams.sysDepId;
      } else if (
        this.$store.state.user.permissions.indexOf(
          "standard:system:manage:sectionShow"
        ) > -1
      ) {
        this.queryParams.sysDepId = this.$store.state.user.userInfo.deptId;
      } else {
        //this.msgError("您无查询标准体系权限！");
        return;
      }
      // this.queryParams.dataRange=checkRole(['admin'])?2:1;
      this.queryParams.myDeptId = this.$store.state.user.userInfo.deptId;
      // this.loading = true;
      // listStdSystem(this.queryParams).then(response => {
      //     //console.log("listStdSystem==>", response)
      //     if (response.code === 200) {
      //         this.dataList = response.rows;
      //     }
      //     this.loading = false;
      // })
    },
    // 获取组织
    getDeptList() {
      this.sourceDepts = this.$storage.get("deptList");
      this.deptList = this.handleTree(this.$storage.get("deptList"), "deptId");
    },
  },
  created() {
    // this.getDeptList();
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
@import "./system-list";
</style>
