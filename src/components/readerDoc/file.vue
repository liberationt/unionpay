<template>
    <div class="detail-file-container">
        <div class="lists">
            <h3>图片文件</h3>
            <ul>
                <li>
                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0120d15e01c068a80120a895b5bf80.png%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661913079&t=a2d70fa35f8fdcfb480d2600e8c028c6" alt="">
                </li>
                <li>
                    <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0120d15e01c068a80120a895b5bf80.png%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661913079&t=a2d70fa35f8fdcfb480d2600e8c028c6" alt="">
                </li>
            </ul>
        </div>
        <div class="lists">
            <h3>文档文件</h3>
            <ul>
                <li class="doc">
                    <span>文件1</span>
                    <!-- 仅限PDF文件 -->
                    <el-button type="text" icon="iconfont icon-pdf2" @click.stop.prevent="viewPdf">浏览</el-button>
                </li>
            </ul>
        </div>

        <div class="lists">
            <h3>视频文件</h3>
            <ul>
                <li>
                    <video width="320" height="240" controls>
                        <source src="http://192.168.0.239:9001/files/video/test1.mp4" type="video/mp4">
                        您的浏览器不支持Video标签。
                    </video>
                </li>
                <li>
                    <video width="320" height="240" controls>
                        <source src="http://192.168.0.239:9001/files/video/test2.mp4" type="video/mp4">
                        您的浏览器不支持Video标签。
                    </video>
                </li>
            </ul>
        </div>

        <el-dialog title="文档浏览" :visible.sync="dialogVisible" custom-class="sam-dialog" fullscreen append-to-body>
            <pdfViewer :url="pdfUrl" full />
        </el-dialog>
    </div>
</template>

<script>
    import pdfViewer from '@/components/pdfViewer';
    export default {
        name: 'reader-detail-file',
        components: {
            pdfViewer
        },
        data() {
            return {
                dialogVisible: false,
                pdfUrl: 'http://192.168.0.239:9001/files/test002.pdf',
            }
        },
        methods: {
            /**
             * @description 在线阅读PDF
             * @param{Object} item
             */
            viewPdf(item={}) {
                this.dialogVisible = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .detail-file-container{
        height: 100%;
        overflow: hidden;
        padding: 15px 20px;
        .lists{
            margin-bottom: 20px;
            >h3{
                margin: 0;
                padding:10px 0;
                font-weight: bold;
                font-size: 14px;
                border-bottom: 1px solid #EEE;
                display: flex;
                align-items: center;
                &:before{
                    content: "";
                    display: inline-block;
                    height: 12px;
                    width: 4px;
                    margin-right: 5px;
                    background-color: #28378c;
                }
            }
            >ul{
                list-style-type: none;
                padding-left: 15px;
                >li{
                    padding: 10px 0;
                    &.doc{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }
    ::v-deep .sam-dialog{
        height: 100%;
        .el-dialog__header{
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            .el-dialog__headerbtn{
                position: static;
            }
        }
        .el-dialog__body{
            padding:0;
            height: calc(100% - 45px);
        }
    }
</style>
