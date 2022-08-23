
<template>
  <div>
    <div class="content">
      <div
        class="labelItem"
        v-for="(item, index) in searchData.labelList"
        :key="`li+${index}`"
      >
        <label>{{ item.label }}：</label>
        <!-- 输入框 -->
        <template v-if="item.type == 1">
          <el-input
            v-model="fromData[item.key]"
            size="small"
            :placeholder="`请输入${item.label}`"
            :clearable="item.clearable"
            @keyup.enter.native="action('search', 1)"
          />
        </template>
        <!-- 下来框 字典 -->
        <template v-if="item.type === 2">
          <el-select
            v-model="fromData[item.key]"
            :placeholder="`请选择${item.label}`"
            clearable
            @change="selectChange($event, item.key, item.type)"
          >
            <el-option
              v-for="opt in item.options"
              :key="opt[item.replaceField.value]"
              :label="opt[item.replaceField.label]"
              :value="opt[item.replaceField.value]"
              :multiple="item.multiple === true"
            />
          </el-select>
        </template>
        <!-- 3, 日期选择 -->
      <template v-if="item.type === 3">
        <el-date-picker
          v-if="item.dateType === 'dateRange'"
          v-model="fromData[item.key]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :format="item.formatStr"
          :value-format="item.formatValStr ? item.formatValStr : item.formatStr"
          @change="selectChange($event, item.key, item.type)"
        />
        <el-date-picker
          v-if="item.dateType === 'datetimeRange'"
          v-model="fromData[item.key]"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :format="item.formatStr"
          :value-format="item.formatValStr ? item.formatValStr : item.formatStr"
          @change="selectChange($event, item.key, item.type)"
        />
        <el-date-picker
          v-if="item.dateType === 'date'"
          v-model="fromData[item.key]"
          type="date"
          :format="item.formatStr"
          :value-format="item.formatValStr ? item.formatValStr : item.formatStr"
          placeholder="选择日期"
          @change="selectChange($event, item.key, item.type)"
        />
        <el-date-picker
          v-if="item.dateType === 'year'"
          v-model="fromData[item.key]"
          type="year"
          :format="item.formatStr"
          :value-format="item.formatValStr ? item.formatValStr : item.formatStr"
          placeholder="选择年"
          @change="selectChange($event, item.key, item.type)"
        />

      </template>
        <!-- 下来框自己定义 -->
        <template v-if="item.type === 7">
          <el-select
            v-model="fromData[item.key]"
            :placeholder="`请选择${item.label}`"
            clearable
            @change="selectChange($event, item.key, item.type)"
          >
            <el-option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
              :multiple="item.multiple === true"
            />
          </el-select>
        </template>
      </div>
      <template v-for="(item, index) in searchData.btnList">
        <div
          v-if="item.type != 0"
          :class="
            item.className != undefined
              ? `${item.className} btn`
              : 'submitBtn btn'
          "
          :key="index"
          :icon="item.icon !== undefined ? item.icon : 'el-icon-search'"
          @click="action(item.action, item.type)"
        >
          <i :class="item.icon !== undefined ? item.icon : 'el-icon-search'" />
          {{ item.label }}
        </div>
        <div
          v-else
          class="submitBtnReset btn"
          :key="index"
          @click="action(item.action, item.type)"
        >
          <i :class="item.icon !== undefined ? item.icon : 'el-icon-refresh'" />
          {{ item.label }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "basic-search",
  components: {},
  props: {
    searchData: {
      type: Object,
      default: {},
    },
    formVal: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      fromData: {},
    };
  },
  computed: {},
  watch: {
    searchData: {
      handler(val) {
        if (this.formVal != undefined) {
          this.searchData.labelList.forEach((item) => {
            // this.fromData[item.key] = "" || null;
            this.$set(this.fromData, item.key, this.formVal[item.key] ?? null);
          });
        }
      },
    },
    fromData() {
      this.$emit("search", this.fromData);
    },
  },
  //方法集合
  methods: {
    action(actionName, type) {
      if (type === 0) {
        Object.keys(this.fromData).map((key) => {
          this.fromData[key] = "" || null;
        });
      }
      this.$emit(actionName, this.fromData);
    },
    selectChange(e, key, type) {
      this.$nextTick(() => {
        this.fromData[key] = e;
        this.action("search", this.fromData);
      });
    },
  },
  created() {},
  mounted() {
    if (
      this.formVal != undefined &&
      this.searchData != undefined &&
      this.searchData.labelList != undefined
    ) {
      this.searchData.labelList.forEach((item) => {
        // this.fromData[item.key] = "" || null;
        this.$set(this.fromData, item.key, this.formVal[item.key] ?? null);
      });
    }
  },
};
</script>
<style lang='scss' scoped>
/* @import url(); 引入公共css类 */
.content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
  .labelItem {
    width: auto;
    font-size: 14px;
    margin: 8px;
    margin-right: 25px !important;
    margin-bottom: 15px;
    line-height: 32px;
    label {
      margin-right: 5px;
      font-weight: 400 !important;
    }
  }
  ::v-deep .el-input,
  .el-date-picker,
  .el-select,
  .vue-treeselect,
  .el-input__inner {
    width: 230px;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    .vue-treeselect__control,
    input,
    .el-input {
      height: 32px;
      line-height: 32px;
    }
  }
  // 提交按钮
  .submitBtn {
    color: #ffffff;

    background-color: #1890FF;
    border: 1px solid #3d84ee;

    &:hover {
      background-color: #0481f5;
    }
  }
  .submitBtnReset {
    font-size: 14px;
    color: #666666;
    background-color: #efefef;
    border: 1px solid #dddddd;

    &:hover {
      box-shadow: #999999 4px 0px 12px -5px;
    }
  }
  .btn {
    border-radius: 4px;
    padding: 0 15px;
    line-height: 30px;
    height: 32px;
    cursor: pointer;
    margin: 0px 10px;
    font-size: 14px;
    margin-bottom: 8px;
    position: relative;
  }

  // 取消按钮
  .cancelBtn {
    color: #999999;
    background-color: #ffffff;
    border: 1px solid #efefef;

    &:hover {
      box-shadow: #999999 4px 0px 12px -5px;
    }
  }
  ::v-deep .el-range-separator,
  ::v-deep .el-range__icon,
  ::v-deep .el-range__close-icon {
    line-height: 25px !important;
  }
}
</style>