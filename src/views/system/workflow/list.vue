<template>
	<div class="page-list-container">
		<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch">
			<el-form-item label="流程名称" prop="name">
				<el-input v-model="queryParams.name" placeholder="请输入流程名称" clearable @keyup.enter.native="getList" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="el-icon-search" size="mini" @click="getList">搜索</el-button>
				<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>

		<el-row :gutter="10" class="mb8">
			<el-col :span="1.5">
				<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleUpdate(null, true)" v-hasPermi="['system:flow:add']">新增</el-button>
			</el-col>
            <el-col :span="1.5">
                <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" v-hasPermi="['system:flow:edit']">修改</el-button>
            </el-col>
			<el-col :span="1.5">
				<el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:flow:remove']">删除</el-button>
			</el-col>
			<right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
		</el-row>

        <div class="lists">
            <el-table size="small" v-loading="loading" border :data="flowList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column label="缩略图" align="center" width="250">
                    <template slot-scope="scope">
                        <img :src="parseImg(scope.row.thumbPath)" height="120" />
                    </template>
                </el-table-column>
                <el-table-column label="流程名称" prop="name" width="250" />
                <el-table-column label="流程实例" prop="instance">
                    <template slot-scope="scope">
                        <p>{{scope.row.instanceList}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="createTime" width="180">
                    <template slot-scope="scope">
                        {{ parseTime(scope.row.createTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:flow:edit']">修改</el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['system:flow:remove']">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages">
            <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="setPage" />
        </div>
	</div>
</template>

<script>
    // 流程引擎基础数据
    import { flowEngIntData } from '@/config';
    // 流程引擎方法
    import { flowFun } from 'samshen-editor';
    // nodeServer 接口方法
    import nodeDbUtil from '@/utils/nodeDb';

	export default {
		name: 'flow-list',
        computed: {
            // 非单个禁用
            single() {
                return this.flowIds.length !== 1;
            },
            // 非多个禁用
            multiple() {
                return !this.flowIds.length;
            },
        },
		data() {
			return {
				showSearch: true,
                loading: true,
                // 查询参数
				queryParams: {
					name: '',
                    pageNum: 0,
                    pageSize: 20
				},
                total: 0,
                // 选中的流程ID
                flowIds: [],
                // 流程模板列表
				flowList: [],

			}
		},
		methods: {
            /**
             * @description 流程图片实际路径
             */
            parseImg(src="") {
                return process.env.VUE_APP_NODE_URL + "/files/" + src;
            },

            /**
             * @description 分页处理
             * @param{Object} obj
             */
            setPage(obj={}) {
                this.$set(this.queryParams, 'pageNum', obj.page);
                this.$set(this.queryParams, 'pageSize', obj.limit);
            },
            /**
             * @description 重置查询
             */
			resetQuery() {
                this.$set(this.queryParams, 'name', '');
                this.getList();
			},

            /**
             * @description 多选框
             * @param{Array} selection
             */
            handleSelectionChange(selection=[]) {
                this.flowIds = selection.map(item => item.id);
            },

            /**
             * @description 修改流程
             * @param{Object} item
             * @param{Boolean} isNew 是否新建
             */
			async handleUpdate(item={}, isNew=false) {
                // console.log('handleUpdate', item)
                var data = null;
                if (!isNew) {
                    var res = await flowFun.getPropPath(item.propPath, process.env.VUE_APP_NODE_URL);
                    if (res) {
                        data = JSON.parse(res);
                    }
                }
                // 上报
				this.$emit('change', { act:'flowEdit', data, isNew });
			},

            /**
             * @description 删除事件
             * @param{Object} row
             */
			handleDelete(row={}) {
                const ids = row.id || this.flowIds;
                this.$modal.confirm('确认删除？').then(() => {
                    return this.removeFlow(ids);
                }).catch(() => {});
			},

            /**
             * @description 执行删除
             * @param{String|Array} ids
             */
            async removeFlow(ids) {
                var condition = '';
                if (Array.isArray(ids)) {
                    ids = ids.map(id => `"${id}"`);
                    condition = `ID in (${ids.join(',')})`;
                } else {
                    condition = `ID='${ids}'`;
                }
                var params = {
                    type: 'query',
                    dbName: flowEngIntData.dbName,
                    tableName: flowEngIntData.tableName,
                    condition,
                    queryType: 3,
                    server: flowEngIntData.server
                };
                nodeDbUtil.queryData(params, process.env.VUE_APP_NODE_URL).then(res => {
                    if (res.error_code === 200) {
                        this.$modal.msgSuccess('已删除！');
                        this.getList();
                    }
                })
            },

            /**
             * @description 获取已配置的页面和组件列表
             */
			async getList() {
                var res = await flowFun.getTemplateList(this.queryParams, flowEngIntData.apiUrl, flowEngIntData.nodeUrl);
                if(res.code === 200) {
                    this.total = res.data.total;
                    this.flowList = res.data.list;
                }
                this.loading = false;
			}
		},
        created() {
            this.getList();
        }
	}
</script>

<style lang="scss" scoped>
    .page-list-container{
        padding: 15px;
    }
</style>
