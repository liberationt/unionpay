<template>
    <div class="page-list-container">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
            <el-form-item label="页面名称" prop="pageName">
                <el-input v-model="queryParams.pageName" placeholder="请输入页面名称" clearable @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="所属模块" prop="module">
                <el-select v-model="queryParams.module" placeholder="所属模块" clearable >
                    <el-option v-for="item in moduleList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleUpdate(null)" v-hasPermi="['system:page:add']">新增</el-button>
            </el-col>
            <!-- <el-col :span="1.5">
				<el-button type="success" plain icon="el-icon-edit" size="mini" @click="handleUpdate(true)" v-hasPermi="['system:page:edit']">修改</el-button>
			</el-col> -->
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:page:remove']">删除</el-button>
            </el-col>
            <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>

        <div class="lists">
            <el-table v-loading="loading" border :data="moduleList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column label="缩略图" align="center" width="250">
                    <template slot-scope="scope">
                        <img src="" />
                    </template>
                </el-table-column>
                <el-table-column label="ID" prop="id" width="350" />
                <el-table-column label="页面名称" prop="label" />
                <el-table-column label="创建时间" prop="create_time" width="180" />
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:page:edit']">修改</el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['system:page:remove']">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    // 页面引擎基础数据
    import { pageEngIntData } from "@/config";
    import { pageRender, pageEditor, pageFun } from "samshen-editor";
    export default {
        name: "page-list",
        data() {
            return {
                showSearch: true,
                multiple: false,
                queryParams: {
                    pageName: "",
                },
                loading: true,
                moduleList: [],
            };
        },
        methods: {
            handleQuery() {},
            resetQuery() {},
            handleSelectionChange() {},

            handleUpdate(item = {}) {
                this.$emit("change", { act: "pageEdit", data: item });
            },
            /**
             * @description 删除
             */
            handleDelete(item = {}) {},
            /**
             * @description 获取已配置的页面和组件列表
             */
            async getList() {
                var res = await pageFun.getPageList({
                    dbName: pageEngIntData.dbName,
                    tableName: pageEngIntData.tableName,
                    serverAddr: pageEngIntData.serverAddr,
                    nodeUrl: pageEngIntData.nodeUrl,
                });
                console.log("getList", res);
                if (res.error_code === 200) {
                    this.moduleList = res.data;
                }
                this.loading = false;
            },
        },
        created() {
            this.getList();
        },
    };
</script>

<style lang="scss" scoped>
    .page-list-container {
        padding: 15px;
    }
</style>
