<template>
    <div class="pdfviewer-container">
        <div class="toolbar">
            <div class="cons" v-show="!full">
                <span>{{currentPage}} / {{pageCount}}</span>
                <el-divider direction="vertical" />
                <div class="zoom" style="margin: 0 10px;">
                    <el-slider :min="20" :max="200" v-model="loadedRatio" style="width: 150px;" />
                </div>
                <el-divider direction="vertical" />
                <el-button type="text" icon="iconfont icon-rotate-right" @click="rotatePage">旋转</el-button>
            </div>
            <div class="btns">
                <el-button type="text" icon="iconfont icon-download" @click="download">下载</el-button>
                <el-button v-if="!full" type="text" icon="iconfont icon-iconset0266" @click="printPdf">打印</el-button>
                <el-button v-if="showClose" type="text" icon="iconfont icon-close" @click="$emit('close')">关闭</el-button>
            </div>
        </div>
        <div class="content" v-loading.fullscreen.lock="loading" element-loading-text="正在加载中,请稍后...">
            <div class="left-wrapper" v-if="!full">
                <ul class="nav">
                    <li>
                        <i class="iconfont icon-RectangleCopy15" @click.stop.prevent="viewType=0" />
                    </li>
                    <li>
                        <i class="iconfont icon-dingdan" @click.stop.prevent="viewType=1" />
                    </li>
                </ul>
                <div v-show="viewType===0" class="lis">
                    <el-scrollbar class="scrollbar ver">
                        <div class="lists" v-for="i in pageCount" :key="i" :class="{'active':i===currentPage}" @click.stop.prevent="viewPage(i)">
                            <pdf :src="url" :page="i" />
                        </div>
                    </el-scrollbar>
                </div>

                <div v-show="viewType===1" class="pages">
                    <el-scrollbar class="scrollbar ver">
                        <ul>
                            <li v-for="i in pageCount" :key="i" :class="{'active':i===currentPage}" @click.stop.prevent="viewPage(i)">第 {{i}} 页</li>
                        </ul>
                    </el-scrollbar>
                </div>
            </div>

            <div class="main-wrapper">
                <div class="viewer" id="pdfViewer">
                    <el-scrollbar ref="pdfScroll" class="scrollbar ver">
                        <template v-if="full">
                            <div class="list-pdf" v-for="i in pageCount" :key="i">
                                <pdf ref="myPdfComponent" :src="url" :page="i" @page-loaded="loadedProgress" />
                            </div>
                        </template>
                        <div v-else class="list-pdf">
                            <pdf ref="myPdfComponent" :page="currentPage" :rotate="rotate" :src="url" :style="scalZoom" @page-loaded="loadedProgress" />
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import pdf from 'vue-pdf';
    export default {
        name: 'pdf-viewer',
        components:{
            pdf
        },
        props: {
            url: String,
            full:Boolean,
            showClose: Boolean
        },
        watch: {
            url: {
                handler(data) {
                    if(data) {
                        this.setData();
                    }
                },
                immediate: true,
                deep: true
            }
        },
        computed: {
            scalZoom() {
                let scale = this.loadedRatio / 100;
                let pdfwidth = scale * this.pdfwidth;
                return {
                    transform: `scale(${scale})`
                }
            }
        },
        data() {
            return {
                loading: true,
                loadedRatio: 100,
                pdfwidth: 210,
                numPages: 0,
                pageCount: 0,
                currentPage: 1,
                rotate: 0,
                viewType:0,
                printLoading: true,
                printObj: {
                    id: "pdfViewer",
                    popTitle: 'good print',
                    extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
                    beforeOpenCallback (vue) {
                        vue.printLoading = true
                        console.log('打开之前')
                    },
                    openCallback (vue) {
                        vue.printLoading = false
                        console.log('打开之后')
                    },
                    closeCallback (vue) {
                        console.log('关闭之后')
                    }
                }
            }
        },
        methods: {
            download() {
                fetch(this.url).then(res => res.blob().then(blob => {
                    var a = document.createElement('a');
                    var url = window.URL.createObjectURL(blob);
                    var fileExt = this.url.split("/");
                    var filename = name || fileExt[fileExt.length - 1];
                    a.href = url;
                    a.download = filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    a.remove();
                }))
            },
            printPdf() {
                if (!this.full) {
                    this.$refs.myPdfComponent.print();
                }
            },
            viewPage(num) {
                this.currentPage = num;
                /* const pdfContainers = document.querySelectorAll('.list-pdf');
                this.$refs['pdfScroll'].wrap.scrollTop = pdfContainers[num-1].offsetTop; */
            },
            zoom(val) {
                if(val) {
                    this.loadedRatio += 10;
                } else {
                    this.loadedRatio -= 10;
                }
            },
            rotatePage() {
                this.rotate += 90;
            },
            onLoading(str="", flag=false) {
                /* this.loading = this.$loading({
                    lock: true,
                    text: str,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    this.loading.close();
                }, 20000); */
            },
            /**
             * @description 加载页面
             * @param{Int} pageIndex
             */
            loadedProgress(pageIndex=0) {
                // console.log('loadedProgress=>', pageIndex)
                // this.onLoading(`正在加载中，请稍后...`);
                if (pageIndex === this.pageCount) {
                    this.loading = false;
                }
            },
            logContent() {
                this.$refs.myPdfComponent.pdf.forEachPage((page, index) => {
                    console.log('logContent=>', page._pageIndex, page._pageInfo.view);
                    // this.onLoading(`正在加载中...`);
                })
            },
            setData() {
                // this.onLoading(`正在加载中，请稍后...`);
                var loadingTask = pdf.createLoadingTask(this.url);
                loadingTask.promise.then(pdf => {
                    this.pageCount = pdf.numPages;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './index';
</style>
