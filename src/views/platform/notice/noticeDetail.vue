<!--  -->
<template>
  <BasicDialog :dialogInfo="dialogInfo" @close="closeDialog">
    <template slot="body">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告标题" prop="noticeTitle"
              ><el-input
                v-model="form.noticeTitle"
                placeholder="请输入公告标题"
            /></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告类型" prop="noticeType">
              <el-select v-model="form.noticeType" placeholder="请选择公告类型">
                <el-option
                  v-for="dict in dict.type.sys_notice_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="通知来源" prop="noticeSource">
              <el-radio-group v-model="form.noticeSource">
                <el-radio
                  v-for="dict in dict.type.sys_notice_source"
                  :key="dict.value"
                  :label="dict.value"
                  >{{ dict.label }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容"
              ><editor v-model="form.noticeContent" :min-height="192"
            /></el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="上传图片">
              <ImageUpload :limit="1" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="上传文件">
              <FileUpload :limit="1" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="dialogInfo.loadding" @click="closeDialog(true, 2)"
          >发 布</el-button
        >
        <el-button type="primary" :loading="dialogInfo.loadding" @click="closeDialog(true, 1)">暂 存</el-button>
        <el-button @click="closeDialog(false)">取 消</el-button>
      </div>
    </template>
  </BasicDialog>
</template>

<script>
import {
  listNotice,
  getNotice,
  delNotice,
  addNotice,
  updateNotice,
} from "@/api/platform/notice";
export default {
  name: "",
  components: {},
  dicts: ["sys_notice_status", "sys_notice_type", "sys_notice_source"],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    noticeId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dialogInfo: {
        visible: false,
        title: "发起复审任务",
        width: "1200px",
        footer: false,
        loadding: false,
        submintText: "提交",
      },
      // 表单参数
      form: {},
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
    };
  },
  computed: {},
  watch: {
    visible(val) {
      this.dialogInfo.visible = this.visiable;
    },
  },
  //方法集合
  methods: {
    closeDialog(e, status = null) {
      if (e) {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.dialogInfo.loadding = true
            if(status){
               this.form.status = status 
            }
            if (this.type=="edit") {
              updateNotice(this.form).then((response) => {
                this.$modal.msgSuccess("修改成功");
                this.dialogInfo.loadding = false
                this.$emit("close",false)
              });
            } else {
              addNotice(this.form).then((response) => {
                this.$modal.msgSuccess("新增成功");
                 this.dialogInfo.loadding = false
                this.$emit("close",false)
              });
            }
          }
        });
      } else {
        this.$emit("close", null);
      }
    },
    getNotice(noticeId) {
      getNotice(noticeId).then((res) => {
        const { code, data, message } = res;
        this.form = data;
        this.form.noticeType = data.noticeType.toString()
      });
    },
  },
  created() {
    this.dialogInfo.visible = this.visible;
    this.dialogInfo.title = this.title;
  },
  mounted() {
    if ((this.type == "edit")) {
      this.getNotice(this.noticeId);
    }
  },
};
</script>
<style lang='scss' scoped>
/* @import url(); 引入公共css类 */
</style>