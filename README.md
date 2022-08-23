## 开发

## 目录说明
    -- /views/project : 解决方案
    -- /views/solution : 技术能力手册
    -- /views/standard : 标准管理平台
    
## 页面引擎、流程引擎说明
    /libs/flowpage : 包含了2个引擎， 命令行安装 npm install ./libs/flowpage
    -- flowEditor | 流程引擎编辑器
    -- flowList | 流程列表
    -- flowDistance | 流程实例运行
    -- pageEditor | 页面引擎编辑器
    -- pageList | 页面列表
    -- pageRender | 页面引擎渲染
    -- flowFun | 流程引擎方法
    -- pageFun | 页面引擎方法
    
```bash
# 克隆项目
git clone http://192.168.0.17:8082/bzton-union-pay/unionpay-ui

# 进入项目目录
cd unionpay-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```