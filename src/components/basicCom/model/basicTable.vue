<!--  -->
<template>
  <el-table
    ref="bzt-table"
    :data="dataList"
    :border="border"
    :style="`width:${tableData.width}`"
    :fit="tabFit != false"
    :row-key="rowKey"
    v-loading="isLoading"
    class="btz-tables"
    @row-click="rowClick"
    :height="height"
    max-height="680"
    @selection-change="handleSelectionChange"
    @sort-change="sortChange"
  >
    <el-table-column
      v-if="checkeBox == true"
      :reserve-selection="true"
      type="selection"
      width="40"
    />
    <el-table-column
      v-if="hasIndex !== false"
      fixed
      label="序号"
      type="index"
      width="60"
      :index="indexMethod"
    />

    <template v-for="(item, index) in fieldList">
      <el-table-column
        v-if="item.isHidden === false"
        :key="index"
        :prop="item.key"
        :label="item.title"
        :width="item.width"
        :min-width="item.minWidth"
        :sortable="item.sortable"
        :align="item.align"
        :show-overflow-tooltip="item.showTips != false"
      >
        <template slot-scope="scope">
          <!-- 无过滤器设置，纯文本显示 -->
          <span v-if="item.filter === undefined || item.filter === null">
            {{
              getCellTxt(scope.row, item.key) == null
                ? ""
                : getCellTxt(scope.row, item.key)
            }}
          </span>
          <template v-else>
            <!-- 日期时间格式 -->
            <span v-if="item.filter.type === 'dateTime'">{{
              FormatDate(
                getCellTxt(scope.row, item.key),
                item.filter.formateStr
              )
            }}</span>

            <!-- html格式 -->
            <span
              v-if="item.filter.type === 'html'"
              v-html="getCellTxt(scope.row, item.key)"
            ></span>

            <!-- 开关格式设置 -->
            <template v-else-if="item.filter.type === 'switch'">
              <el-switch
                v-if="item.filter.getModel"
                :value="item.filter.getModel(getCellTxt(scope.row, item.key))"
                @change="valueChange($event, scope.row, item.filter.action)"
              />
              <el-switch
                v-else
                :value="getCellTxt(scope.row, item.key) == 1"
                @change="valueChange($event, scope.row, item.filter.action)"
              />
            </template>

            <!-- 单行文本输入列 -->
            <template v-else-if="item.filter.type === 'input'">
              <el-input
                type="input"
                v-model="scope.row[item.key]"
                :placeholder="`请输入${item.title}`"
                @change="valueChange($event, scope.row, item.filter.action)"
              />
              <!-- :value="getCellTxt(scope.row, item.key)" -->
              <!--  -->
            </template>

            <!-- 数字输入列 -->
            <template v-else-if="item.filter.type === 'number'">
              <el-input-number
                v-model="scope.row[item.key]"
                :min="!item.filter.min ? 0 : item.filter.min"
                :max="!item.filter.max ? 10000 : item.filter.max"
                @change="valueChange($event, scope.row, item.filter.action)"
                class="td-number"
              />
            </template>

            <!-- 单选按钮radio -->
            <template v-else-if="item.filter.type === 'radio'">
              <el-radio-group
                v-model="scope.row[item.key]"
                @change="valueChange($event, scope.row, item.filter.action)"
              >
                <el-radio
                  v-for="(option, index) in item.filter.options"
                  :key="`${item.key}_${index}`"
                  :label="option.value"
                >
                  {{ option.name }}
                </el-radio>
              </el-radio-group>
            </template>

            <!-- 复选框checkBox -->
            <template v-else-if="item.filter.type === 'checkBox'">
              <el-checkbox-group
                v-model="scope.row[item.key]"
                @change="valueChange($event, scope.row, item.filter.action)"
              >
                <el-checkbox
                  v-for="(option, index) in item.filter.options"
                  :key="`${item.key}_${index}`"
                  :label="option.value"
                  >{{ option.name }}
                </el-checkbox>
              </el-checkbox-group>
            </template>

            <!-- action操作列设置 -->
            <template v-else-if="item.filter.type === 'action'">
              <el-button
                v-if="item.filter.isHtml !== true"
                :key="`tbn${index}`"
                @click="action(item.filter.actionName, scope.row)"
                type="text"
                size="small"
                :style="{ color: item.color, 'margin-right': '12px' }"
              >
                {{
                  item.filter.action(getCellTxt(scope.row, item.key), scope.row)
                }}
              </el-button>
              <span
                v-else
                :key="`tbn${index}`"
                @click="action(item.filter.actionName, scope.row)"
                v-html="
                  item.filter.action(getCellTxt(scope.row, item.key), scope.row)
                "
              />
            </template>

            <!-- 过滤器方法 -->
            <template v-else-if="item.filter.type === 'filter'">
              <span v-if="item.filter.isFiles == true">
                <!-- {{ item.filter.action(getCellTxt(scope.row, item.key)) }} -->
                <div
                  v-for="(file, index) in item.filter.action(
                    getCellTxt(scope.row, item.key)
                  )"
                  :key="`file_${index}`"
                  class="link-text"
                  @click="downLoad(file)"
                >
                  {{ file.name }}
                </div>
              </span>
              <span
                v-else-if="item.filter.isHtml == true"
                v-html="item.filter.action(getCellTxt(scope.row, item.key))"
              >
              </span>
              <template v-else-if="item.filter.isHtml !== true">
                <!-- data === 0 返回整行数据 -->
                <template v-if="item.filter.data == 0">
                  {{ item.filter.action(scope.row) }}
                </template>
                <template v-else>
                  {{ item.filter.action(getCellTxt(scope.row, item.key)) }}
                </template>
              </template>
            </template>

            <!-- User 用户（操作人，发布人） -->
            <template v-else-if="item.filter.type === 'user'">
              {{ getUser(getCellTxt(scope.row, item.key)) }}
            </template>

            <!-- dept 部门 -->
            <template v-else-if="item.filter.type === 'dept'">
              {{ getDept(getCellTxt(scope.row, item.key)) }}
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <slot name="column" />
    <el-table-column
      v-if="tableData.action.length > 0"
      fixed="right"
      label="操作"
      min-width="120px"
      class-name="small-padding fixed-width"
      :width="tableData.actionWidth || null"
    >
      <template slot-scope="scope">
        <template v-for="(item, index) in tableData.action">
          <span v-if="item.type == 'slot'" :key="`tbn${index}`">
            <slot :name="item.btnName" :scope="scope.row" />
          </span>

          <el-button
            v-else
            :key="`tbn${index}`"
            @click="action(item.action, scope.row)"
            type="text"
            size="small"
            :icon="item.icon"
            :style="{ color: item.color, 'margin-right': '12px','margin-left':'0px' }"
          >
            {{ item.label }}
          </el-button>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "",
  components: {},
  props:{
    tableData: {
      type: Object,
      default: ()=>{
        return {
            column: [],
            data: [],
            action: [],
        }
      }
    },
    border: {
      type: Boolean,
      default: true,
    },
    hasIndex: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "100%",
    },
    pageInfo: {
      pageNo: 1,
      pageSize: 10,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    showFilter: {
      type: Boolean,
      default: false,
    },
    tabFit: {
      type: Boolean,
      default: true,
    },
    checkeBox: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
      default: "id",
    },
    height: {
      type: String,
      default: null,
    },
    clearSelection: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
       fieldList: [],
        dataList:[]
    };
  },
  computed: {},
  watch: {
    tableData: {
      handler(val, newOld) {
        this.fieldList = [];
        this.dataList = JSON.parse(JSON.stringify(this.tableData.data));
        val.column.forEach((item) => {
          item["isHidden"] = false;
          this.fieldList.push(item);
        });
        if (newOld.data != val.data && this.clearSelection == true) {
          this.$refs["bzt-table"].clearSelection();
        }
      },
    },
  },
  //方法集合
  methods: {
    /**
     * 获取序号
     * @param index 行号
     */
    indexMethod(index = 0) {
      return index + 1 + (this.pageInfo.pageNo - 1) * this.pageInfo.pageSize;
    },
    /**
     * 根据列Key获取对应的value
     * @param {*} data 行数据
     * @param {*} key 单元格的key
     */
    /**
     * 格式化日期时间格式
     */
    FormatDate(date, formateStr) {
        console.log(date,"99999",)
      let newDate = new Date(date);
      return this.parseTime(newDate);
    },
    getCellTxt(data, key) {
      let str = data;
      key.split(".").forEach((item) => {
        str = str[item];
      });
      return str;
    },
    /**
     * 操作列按钮触发事件
     * @param actionName 返回给父级的方法名
     * @param rowData 返回给父级的行数据
     */
    action(actionName, rowData) {
      this.$emit(actionName, rowData);
    },
    /**
     * 行点击
     * @param {*} row 点击行的信息
     */
    rowClick(row, column, event) {
      this.$emit("row-click", row);
    },
    /**
     * 复选框选择
     */
    handleSelectionChange(e) {
      this.$emit("select-change", e);
    },
    /**
     * 列排序
     */
    sortChange({ column, prop, order }) {
      console.log(column, prop, order);
      const orders =
        order == "descending" ? "desc" : order == "ascending" ? "asc" : null;
      this.$emit("sort-change", { prop, order: orders });
    },
  },
  created() {
    this.fieldList = [];
    this.dataList = JSON.parse(JSON.stringify(this.tableData.data));
    this.tableData.column.forEach((item) => {
      item["isHidden"] = false;
      this.fieldList.push(item);
    });
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
::v-deep .el-button span{
  margin-left:0px;
}
/* @import url(); 引入公共css类 */
</style>