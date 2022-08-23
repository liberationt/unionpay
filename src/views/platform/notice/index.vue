<template>
  <div class="app-container">
    <BasicSearch
      :searchData="searchInfo"
      :formVal="queryParams"
      @search="searchList"
    />
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5"
        ><el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:notice:add']"
          >新增</el-button
        ></el-col
      >
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate(true)"
          v-hasPermi="['system:notice:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:notice:remove']"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <BasicTable
      :tableData="{
        column: tabClums,
        data: noticeList,
        action: tabAction,
        actionWidth: '140px',
      }"
      :hasIndex="true"
      :pageInfo="page"
      :isLoading="tabLoading"
      @handleUpdate="(data)=>handleUpdate(true,data)"
      @handleDelete="handleDelete"
    />
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或修改公告对话框 -->
    <NoticeDetail
      v-if="noticeVisible"
      :visible="noticeVisible"
      :title="title"
      :type="isType"
      :noticeId="noticeId"
      @close="handleUpdate"
    />
  </div>
</template>

<script>
import { listNotice, delNotice } from "@/api/platform/notice";
import NoticeDetail from "./noticeDetail";
import { mapGetters } from "vuex"
export default {
  name: "Notice",
  dicts: ["sys_notice_status", "sys_notice_type", "sys_notice_source"],
  components: { NoticeDetail },
  computed:{
    ...mapGetters(["userList"])
  },
  data() {
    return {
      noticeVisible: false,
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 公告表格数据
      noticeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderByColumn: "",
        isAsc: "",
        noticeTitle: "",
        noticeType: "",
        noticeSource: "",
        status: "",
      },
      // 表单参数
      form: {},
      isType: "",
      noticeId: "",
      // 表单校验
      rules: {
        noticeTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
        noticeSource: [
          { required: true, message: "通知来源不能为空", trigger: "change" },
        ],
      },
      searchInfo: {},
      tabClums:[
        {
          title: "公告标题",
          key: "noticeTitle",
          minWidth: "150",
          align:"center"
        },
        {
          title: "公告类型",
          key: "noticeType",
          width: "150",
          align:"center",
          filter:{
            type: "filter",
            action: (data) => {
              return this.selectDictLabel(
                this.dict.type.sys_notice_type,
                data
              );
            },
          }
        },
        {
          title: "状态",
          key: "status",
          width: "120",
          align:"center",
          filter:{
            type: "filter",
            action: (data) => {
              return this.selectDictLabel(
                this.dict.type.sys_notice_status,
                data
              );
            },
          }
        },
        {
          title: "创建者",
          key: "createUser",
          width: "120",
          align:"center",
          filter:{
            type: "filter",
            action: (data) => this.getUserName(String(data)),
          }
        },
        {
          title: "创建时间",
          key: "createTime",
          width: "180",
          align:"center",
          filter:{
            type:'dateTime'
          }
        },
      ],
      tabAction:[
        { label: "修改", action: "handleUpdate",icon:"el-icon-edit"},
        { label: "删除", action: "handleDelete",icon:"el-icon-delete"},
      ],
      page: {
        total: 0,
        pageSize: 10,
        pageNo: 1,
      },
      tabLoading:false
      //   listReq: {},
    };
  },
  created() {
    this.getList();
    this.initLabel();
  },
  methods: {
    /** 查询公告列表 */
    getList() {
      // this.loading = true;
      this.tabLoading = true
      listNotice(this.queryParams).then((response) => {
        this.noticeList = response.rows;
        this.total = response.total;
        this.tabLoading = false
        this.loading = false;
      });
    },
    /**
     * 获取UserName
     */
    getUserName(ids) {
      let arr = [];
      if (ids != "") {
        ids.split(",").forEach((id) => {
          const sourceUserList = this.userList;
          if (id == 0) return "系统";
          const user = _.find(sourceUserList, { userId: Number(id) });
          arr.push(
            user
              ? `${user.nickName}（${user.userName}）`
              : "-（${user.userName}）"
          );
        });
      }
      return arr.length > 0 ? arr.join("；") : "";
    },
    sortChange(row) {
      const { order, prop } = row;
      this.queryParams.orderByColumn = prop;
      this.queryParams.isAsc = order;
      this.getList();
    },
    searchList(e) {
      Object.keys(e).map((key) => {
        this.queryParams[key] = e[key];
      });
      this.queryParams.pageNum = 1
      this.getList();
    },
    /** 初始化查询 */
    initLabel() {
      this.searchInfo = {
        labelList: [
          { label: "公告标题", key: "noticeTitle", type: 1, clearable: true },
          { label: "操作人员", key: "createBy", type: 1, clearable: true },
          {
            label: "公告类型",
            key: "noticeType",
            type: 2,
            options: this.dict.type.sys_notice_type,
            replaceField: { value: "value", label: "label" },
            multiple: false,
          },
        ],
        btnList: [
          { label: "搜索", action: "search", type: 1 },
          { label: "重置", action: "search", type: 0 },
        ],
      };
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.noticeId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.noticeId = "";
      this.title = "添加公告";
      this.isType = "add";
      this.noticeVisible = true;
    },
    /** 修改按钮操作 */
    handleUpdate(e, row = null) {
      if (e == true) {
        this.noticeVisible = true;
        this.title = "修改公告";
        this.isType = "edit";
        this.noticeId = row ? row.noticeId : this.ids;
      } else {
        this.getList();
        this.noticeVisible = false;
      }
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      console.log(row,999)
      const noticeIds = row.noticeId || this.ids;
      this.$modal
        .confirm('是否确认删除公告编号为"' + noticeIds + '"的数据项？')
        .then(function () {
          return delNotice(noticeIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
  },
};
</script>
