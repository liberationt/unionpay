<template>
  <div class="content">
    <div style="margin-bottom: 20px">
      <el-steps :active="active" simple>
        <el-step title="基础信息" icon="el-icon-edit"></el-step>
        <el-step title="选择模板" icon="el-icon-upload"></el-step>
        <el-step title="选择成员" icon="el-icon-user"></el-step>
      </el-steps>
    </div>
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <template v-if="active == 1">
          <el-form-item label="提案名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="知识分类" prop="region">
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择知识分类"
              style="width: 100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="父级关系" prop="region">
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择父级关系"
              style="width: 100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提案描述" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="相关知识点" prop="region">
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择相关知识点"
              style="width: 100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传附件" prop="region">
            <FileUpload />
          </el-form-item>
        </template>
				<template v-if="active==2">
					<el-form-item label="选择文件" prop="region">
            <FileUpload />
          </el-form-item>
					<el-form-item label="选择模板" prop="region">
            <el-select
              v-model="ruleForm.region"
              placeholder="请选择选择模板"
              style="width: 100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
					<el-form-item label="预览" prop="region">
        	</el-form-item>
				</template>
				<template v-if="active==3">
					<el-form-item label="用户" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
					<el-form-item label="邀请有效期" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
					<el-form-item label="编写小组" prop="name">
            <div class="flex" v-for="(item,i) in personOptions" :key="i">
							<div>
								<span>操作人：</span>
								<el-select
										v-model="ruleForm.region"
										placeholder="请选择选择模板"
									>
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
							</div>
							<div>
								<span>职责：</span>
								<el-select
										v-model="ruleForm.region"
										placeholder="请选择选择模板"
									>
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
							</div>
							<div>
								<span class="el-icon-delete blueColor" @click="removePerson(i)">移除</span>
							</div>
						</div>
						<p class="el-icon-plus blueColor" @click="addPerson">添加成员</p>
          </el-form-item>
				</template>
				
        <el-form-item align="center">
          <template>
            <el-button type="primary" @click="preStep('ruleForm')" v-if="active!=1">上一步</el-button>
            <el-button type="primary" @click="nextStep('ruleForm')" v-if="active!=3">下一步</el-button>
            <el-button type="primary" @click="nextStep('ruleForm')" v-if="active==3">提交</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </template>
        </el-form-item>
      </el-form>
    </div>
		<basicDialog :dialogInfo="dialogInfo" @close="closeDialog" />
  </div>
</template>

<script>
export default {
name:'',
components: {},
data() {
return {
	active:1,
	ruleForm:{

	},
	rules:{},
	dialogInfo: {
		visible: true,
		title: "选择人员",
		width: "1000px",
		footer: false,
		loadding: false,
		submintText: "提交",
	},
	personOptions:[
		{
			personName:'',
			personId:'',
			personJob:''
		}
	]
};
},
computed: {},
watch: {},
//方法集合
methods: {
	nextStep(){
		this.active +=1
	},
	preStep(){
		this.active --
	},
	removePerson(i){
		this.personOptions.splice(i,1)
	},
	addPerson(){
		this.personOptions.push({
			personName:'',
			personId:'',
			personJob:''
		})
	},
	closeDialog(e){
		
	}
},
created() {

},
mounted() {

},
}
</script>
<style lang='scss' scoped>
/* @import url(); 引入公共css类 */
@import "~@/assets/styles/variables.scss";
.content {
  width: $page-width;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
	.flex{
		display: flex;
		margin-bottom:15px;;
		div{
			margin-right: 10px;
		}
	}
	.blueColor{
		color:#409EFF;
		cursor: pointer;
	}
}
</style>