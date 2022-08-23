<template>
    <div class="solution-index-container" id="solution-index-container">
        <main>
            <div class="left-wrapper" :class="{'hide':!leftWidth}" :style="leftStyle">
                <div class="collapse" @click.stop.prevent="collapseLeft">
                    <i :class="leftWidth ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right' " />
                </div>
                <div class="datas">
                    <div class="search">
                        <el-input size="mini" placeholder="输入关键字进行过滤" v-model="filterText" clearable />
                    </div>
                    <h3 class="title">5+N技术文档</h3>
                    <el-tree
                        ref="charpterTree"
                        :data="treeData"
                        :expand-on-click-node="false"
                        default-expand-all
                        highlight-current
                        :filter-node-method="filterNode"
                        @node-click="handleNodeClick" />
                </div>
            </div>
            <div class="main-wrapper" id="solution-main-wrapper">
                <div class="search-content">
                    <commonSearch :data="{size:'mini', fetch:true}" @change="executeSearch" style="width: 450px;" />
                </div>
                <h1>
                    <span class="title" @click.stop.prevent="showDetails(null)">5+N技术能力手册</span>
                    <template v-if="currItem">
                        <el-divider direction="vertical" />
                        <span class="charpter">{{currItem.label}}</span>
                    </template>
                </h1>
                <!-- 手册列表 -->
                <ul class="lists" v-for="(list, idx) in catalogList" :class="{'hide':idx>0}" :key="idx" >
                    <li class="animate__bounce" v-for="(ls, index) in list" :key="index" :data-id="ls.id" @click.stop.prevent="showDetails(ls)">
                        <h3 class="title">{{ls.label}}</h3>
                        <div class="childs">
                            <div v-for="(child, n) in ls.children" :key="n" class="chapters" :data-id="child.id">
                                <h5>{{child.label}}</h5>
                                <ul>
                                    <li v-for="(item, j) in child.children" :key="j" :data-id="item.id">
                                        <div>{{item.label}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 展示章节详情 animate__animated animate__backInRight-->
                <div class="detail-info" :class="{'show':currItem!==null}">
                    <template v-if="currItem!==null">
                        <div class="title">
                            <span>{{currItem ? currItem.label: ''}} </span>
                            <el-divider direction="vertical" />
                            <el-button type="text" icon="el-icon-d-arrow-left" @click.stop.prevent="showDetails(null)">返回</el-button>
                        </div>
                        <div class="content" v-if="currItem.children">
                            <div v-for="(list, idx) in currItem.children" :key="idx" class="lists">
                                <h3>{{list.label}}</h3>
                                <ul v-if="list.children">
                                    <li v-for="(item, index) in list.children" class="animate__bounce animate__animated animate__backInRight">
                                        <div>{{item.label}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </main>
        <footer>
            <commonFooter />
        </footer>
    </div>
</template>

<script>
    import 'animate.css'; // 参考 https://animate.style/
    // 通用方法
    import { addClass, removeClass, toggleClass} from '@/utils/index';
    // 页面渲染引擎配置参数
    import { pageEngIntData, commonHeadMenus } from '@/config';
    // 页面渲染引擎
    import pageEnginer from '@/components/pageEnginer';
    // 门户菜单等组件
    import { portalMenu, noticeFramer, usersFramer, commonFooter, commonSearch, tagView } from '@/components/commons/index.js';
    // API 接口
    import { getManualCatalogTree, manualCatalogList } from '@/api/solution';
    export default {
        name: 'solution-index',
        components: {
            pageEnginer, portalMenu, noticeFramer, usersFramer, commonFooter, commonSearch, tagView
        },
        computed: {
            leftStyle() {
                return {
                    flex: `0 0 ${this.leftWidth}px`,
                    width: `${this.leftWidth}px`
                }
            },
        },
        watch: {
            filterText(val) {
                this.$refs.charpterTree.filter(val);
            }
        },
        data() {
            return {
                headerMenus: commonHeadMenus,
                leftWidth: 300,
                // 目录章节树关键字搜索
                filterText: '',
                // 目录章节树
                treeData: [],
                // 目录列表; 注意接口取出数据后须转为二维数组[[],[],...], 每个单元为5列
                catalogList: [],
                queryParams: {
                    "pageNum": 1,
                    "pageSize": 10,
                    "orderByColumn": "orderNum",
                    "isAsc": "desc"
                },
                total: 0,
                // 显示当前章节详情
                currItem: null,
            }
        },
        methods: {
            /**
             * @description 左侧栏切换显示
             */
            collapseLeft() {
                this.leftWidth = this.leftWidth === 0 ? 300 : 0;
            },
            /**
             * @description 章节树节数据过滤
             * @param {Object} value
             * @param {Object} data
             */
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },

            /**
             * @description 显示章节的详细结构内容
             * @param{Object} item
             */
            showDetails(item=null) {
                this.currItem = item;
            },

            /**
             * @description 章节树节点点击事件，根据ID选中元素节点
             * @param{Object} data
             */
            handleNodeClick(data={}) {
                if (this.currItem) {
                    return;
                }
                // 清除所有激活状态的节点
                var activeNodes = Array.from(document.querySelectorAll('#solution-main-wrapper .active'));
                activeNodes.forEach(node => {
                    removeClass(node, 'active');
                });
                // 找到需激活的节点
                var currNode = document.querySelector(`#solution-main-wrapper [data-id="${data.id}"]`);
                if (currNode) {
                    addClass(currNode, 'active');                             // 激活被选中的元素
                    currNode.scrollIntoView({ behavior: "smooth" });          // 滚动条定位到元素
                }
            },

            /**
             * @description 目录检索，根据关键字模糊匹配元素节点
             * @param{Object} searchObj
             */
            executeSearch(searchObj="") {
                // console.log('executeSearch', searchObj);
                let searchKey = searchObj.value.replace(/\s/g,'');
                var liNodes = Array.from(document.querySelectorAll('#solution-main-wrapper .lists >li'));
                liNodes.forEach(liNode => {
                    removeClass(liNode, 'active');
                    // let itemNodes = Array.from(document.querySelectorAll('li.li-item'));
                    let itemNodes = Array.from(liNode.querySelectorAll('li'));
                    itemNodes.forEach(itemNode => {
                        let itemText = itemNode.textContent.replace(/\s/g,'');
                        let reg = new RegExp()
                        if (itemText.includes(searchKey)) {
                            addClass(itemNode, 'active');
                            itemNode.scrollIntoView({ behavior: "smooth" });
                        } else {
                            removeClass(itemNode, 'active');
                        }
                    })
                })
            },
            /**
             * @description 获取章节大纲树---root : 5+N技术文档
             */
            async getCharpterTree() {
                var res = await getManualCatalogTree();
                if (res.code === 200) {
                    this.treeData = res.data || [];
                    // 继续获取列表
                    // this.getCatalogList();
                    this.listDataStruct(_.cloneDeep(res.data));
                }
            },

            listDataStruct(list=[]) {
                // 定义二维数组。每行为5列
                while(list.length > 0) {
                    this.catalogList.push(list.splice(0, 5));
                }
                console.log('this.catalogList', this.catalogList);
                // 初始化渲染元素动画
                this.$nextTick(() => {
                    this.geometryElement();
                })
            },

            async getCatalogList() {
                var res = await manualCatalogList(this.queryParams);
                if (res.code === 200 && res.rows.length) {
                    var catalogList = res.rows.map(item => {
                        // 清理无用的字段，方法在main.js中声明
                        return this.clearDataField(item);
                    });
                    // 定义二维数组。每行为5列
                    while(catalogList.length > 0) {
                        this.catalogList.push(catalogList.splice(0, 5));
                    }
                    console.log('this.catalogList', this.catalogList)
                    // 初始化渲染元素动画
                    this.$nextTick(() => {
                        this.geometryElement();
                    })
                }
            },

            geometryElement() {
                const parentElement = document.querySelector("#solution-main-wrapper");
                const parentOffsetTop = parentElement.offsetTop;
                const elements = Array.from(parentElement.querySelectorAll('.lists'));
                elements.forEach((ele, index) => {
                    if (index === 0) {
                        let childNodes = Array.from(ele.querySelectorAll(':scope >li'));
                        this.setElementAnimation(childNodes);
                    }
                })
            },

            setElementAnimation(nodes=[]) {
                nodes.forEach((li, i) => {
                    addClass(li, 'animate__animated');
                    if (i < 2) {
                        addClass(li, 'animate__backInLeft');
                    } else {
                        addClass(li, 'animate__backInRight');
                    }
                    let itemNodes = Array.from(li.querySelectorAll('.li-item'));
                    itemNodes.forEach((itemNode, index) => {
                        setTimeout(() => {
                            removeClass(itemNode, 'hide');
                            addClass(itemNode, 'animate__animated animate__rotateInUpLeft');
                        }, 500 + index*100)
                    })
                });
            },
            /**
             * @description 滚动条到达一定位置后触发动画
             */
            checkScrollLoadAnimation() {
                const containerElement = document.querySelector("#solution-index-container");
                const scrollHeight =  containerElement.clientHeight;
                const scrollTop = containerElement.scrollTop;
                // console.log('containerElement scrollTop', scrollTop, scrollHeight);

                const parentElement = containerElement.querySelector("#solution-main-wrapper");
                const parentOffsetTop = parentElement.offsetTop;
                const elements = Array.from(parentElement.querySelectorAll('.lists'));

                elements.forEach((ele, index) => {
                    // 满足条件时触发动画
                    if (scrollTop + scrollHeight > parentOffsetTop + ele.offsetTop + (ele.clientHeight / 2)) {
                        removeClass(ele, 'hide');
                        let childNodes = Array.from(ele.querySelectorAll(':scope >li'));
                        this.setElementAnimation(childNodes)
                    }
                })
            },
            /**
             * @description 注册窗口滚动条事件以产生动画效果
             * @param{Object} event
             */
            bindHandleScroll(event=null) {
                this.checkScrollLoadAnimation();
            }
        },
        created() {
            this.getCharpterTree(true);
        },
        mounted() {
            document.querySelector("#solution-index-container").addEventListener('scroll', this.bindHandleScroll);
        },
        beforeDestroy() {
            // document.querySelector("#solution-index-container").removeEventListener('scroll', this.bindHandleScroll);
        }
    }
</script>

<style lang="scss" scoped>
    @import './solution-index.scss';
</style>
