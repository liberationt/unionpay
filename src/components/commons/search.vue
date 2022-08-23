<template>
    <div class="search-container" :class="data.size">
        <el-autocomplete v-model="searchParam.value" :fetch-suggestions="filterSearch" placeholder="请输入关键字检索" clearable @keyup.enter.native="handleSearch">
            <el-select v-if="data.selected" v-model="searchParam.type" slot="prepend" placeholder="全部内容" clearable>
                <el-option v-for="(item, idx) in typeArr" :key="idx" :label="item.label" :value="item.value" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
        </el-autocomplete>
    </div>
</template>

<script>
    import { storeData } from '@/utils/index.js';
    export default {
        name: 'common-search',
        props: {
            // 组件样式
            data: {
                type: Object,
                default: () => {
                    return {
                        size: 'smalll',
                        selected: true,
                        fetch: true,
                    }
                }
            },
            // 查询分类
            typeArr: {
                type: Array,
                default: () => {
                    return []
                }
            },
            // 自动匹配查询关键字
            autoSearch: String,
        },
        watch: {
            autoSearch: {
                handler(str) {
                    if(!_.isEmpty(str)) {
                        this.restaurants = storeData.get(str) || [];
                    }
                },
                immediate: true
            },
            typeArr: {
                handler(arr) {
                    if(!_.isEmpty(arr)) {
                        let obj = _.find(arr, { checked:true });
                        this.searchParam.type = obj ? obj.value : '';
                    }
                },
                immediate: true
            },
            data: {
                handler(obj) {
                    if(!_.isEmpty(obj)) {
                        if(obj.hotWords) {
                            this.restaurants = obj.hotWords;
                        }
                        console.log('this.restaurants', this.restaurants)
                    }
                },
                immediate: true
            }
        },

        data() {
            return {
                searchParam : {
                    type: '',
                    value: ''
                },
                restaurants: [], // {value:'', key:''}
            }
        },
        methods: {
            /**
             * @description 过滤
             */
            filterSearch(queryString="", cb=null) {
                var results = queryString ? this.restaurants.filter(o => o.value.toLowerCase().includes(queryString)) : this.restaurants;
                cb(results);
            },
            
            /**
             * @description 执行搜索
             */
            handleSearch() {
                // 如果有自动匹配查询关键字的则放入缓存中
                if (this.autoSearch) {
                    var index = _.findIndex(this.restaurants, this.searchParam);
                    if (!~index) {
                        this.restaurants.push(this.searchParam);
                        storeData.set(this.autoSearch, [...this.restaurants]);
                    }
                }
                this.$emit('change', this.searchParam);
            }
        },
        created() {

        }
    }
</script>

<style lang="scss" scoped>
    .search-container{
        width: 100%;
        border: 1px solid #DDD;
        border-radius: 25px;
        padding: 5px 15px;
        background-color: #FFF;
        &.mini{
            border-radius: 20px;
            padding: 0 15px;
        }
        ::v-deep .el-autocomplete{
            width: 100%;
            .el-input-group{
                display: flex;
                align-items: center;
                justify-content: space-around;
                .el-input-group__prepend{
                    border: 0;
                    border-right: 1px solid #EEE;
                    background-color: transparent;
                    width: 120px;
                    height: 32px;
                    padding: 0;
                    .el-select{
                        margin: 0;
                        input{
                            padding: 0 20px 0 0;
                        }
                    }
                }
                input {
                    font-size: 14px;
                }
                >input{
                    border: 0;
                    flex:1;
                }
                .el-input-group__append{
                    border: 0;
                    background-color: transparent;
                    font-size: 1.15rem;
                }
            }
        }
    }
</style>
