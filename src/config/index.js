/**
 * -------------------------------------------------------------------------------------------------------
 * @desc 数据库表配置
 * @author sam.shen by 2022-02-28
 * -------------------------------------------------------------------------------------------------------
 */
export const mainDds = {
    server: '64',                          // 数据库地址
    database: 'dwfe',						// 数据库
    api: 'query_api',                   	// API接口表
    page: 'form_page',                  	// 表单引擎表
    flowTemplate: 'flow_template',         	// 流程配置表
    flowNode: 'flow_node',					// 流程实例节点表
    flowTrail: 'flow_trail',			    // 流程轨迹表
    flowInstance: 'flow_instance',			// 流程实例表
    business: 'edt_document',               // 标准文档
    tbExpression: 'tb_expression',         // 逻辑表达式
}

// 页面引擎基本配置
export const pageEngIntData = {
    apiUrl: process.env.VUE_APP_API_URL,	    // JAVA接口地址
    nodeUrl: process.env.VUE_APP_NODE_URL,	    // NodeServer地址
    dbName: 'bzton-union-pay',                  // 数据库名
    tableName: 'fe_form_page',                  // 数据表名
    serverAddr: '140',                          // 140服务器
    exportData: false,                          // 直接输出数据，不在编辑器中保存
    author: {},                                 // 用户
    pageId: '',                                 // 页面ID
    pageList: [],
}

export const flowEngIntData = {
    apiUrl: process.env.VUE_APP_FLOW_URL,	    // JAVA接口地址
    nodeUrl: process.env.VUE_APP_NODE_URL,	    // NodeServer地址
    dbName: 'dwfe-union-pay',                   // 数据库名
    tableName: 'flow_template',                 // 数据表名
    flowNode: 'flow_node',					    // 流程实例节点表
    flowTrail: 'flow_trail',			        // 流程轨迹表
    flowInstance: 'flow_instance',			    // 流程实例表
    tbExpression: 'tb_expression',              // 逻辑表达式
    server: '140',                              // 140服务器
    exportData: false,                          // 直接输出数据，不在编辑器中保存
    author: {},                                 // 用户
}

export const defaultHeadMenus = [
    { label:'首页', name:'index', path:'/'},
    { label:'新闻资讯', name:'news', path:'/news/', hide:true},
    { label:'新闻资讯详情', name:'news-detail', path:'/news/detail', hide:true},
    { label:'标准管理平台', name:'standard', path:'/standard'},
    { label:'解决方案', name:'project-index', path:'/project'},
    { label:'知识社区', name:'wiki', path:''},
]

export const commonHeadMenus = [
    { label:'解决方案主页', name:'project-index', path:'/project'},
    { label:'技术能力手册', name:'project-solution', path:'/project/solution'},
    { label:'解决方案', name:'project-list', path:'/project/list'},
    { label:'解决方案查询', name:'project-index', subTitle:'搜索列表', path:'/project/search', hide:true},
    { label:'解决方案信息', name:'project-detail', subTitle:'查看信息', path:'/project/detail', hide:true},
    { label:'更多知识', name:'project-knowledge', path:'/project/knowledge'},
    { label:'知识合辑', name:'project-collection', path:'/project/collection'},
    { label:'悬赏区', name:'project-reward', path:'/project/reward'},
    { label:'用户库', name:'project-users', path:'/project/users', hide:true},
]

export const standardHeadMenus = [
    { label:'标准管理平台', name:'standard-index', path:'/standard'},
    { label:'标准查询', name:'standard-search', path:'/standard/search'},
    { label:'标准体系', name:'standard-system', path:'/standard/system'},
    { label:'标准研制', name:'standard-formulate', path:'/standard/formulate'},
]

export const emptyData = {
    background: {
        color: '#FFF',
        image: '',
        position: 'center',
        size: 'auto',
        repeat: 'no-repeat',
        opacity: 0.2
    },
    cells: []
}

export const pickerDateOptions = {
    shortcuts: [
        {
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        },
        {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }
    ]
}

export const statusList = [
    { label: '进行中', value:1 },
    { label: '已发布', value:2 },
    { label: '已终止/下线', value:3 },
]

export const stdTypeList = [
    {
        "label": "国际标准",
        "root": true,
        "id": 1,
        "name": "international",
        "icon": "fa fa-envira"
    },
    {
        "label": "国家标准",
        "root": true,
        "id": 2,
        "name": "country",
        "force": true,
        "icon": "fa fa-balance-scale"
    },
    {
        "label": "行业标准",
        "id": 3,
        "root": true,
        "name": "industry",
        "icon": "fa fa-calendar-minus-o"
    },
    {
        "label": "地方标准",
        "id": 4,
        "root": true,
        "name": "local",
        "icon": "fa fa-paper-plane-o"
    },
    {
        "label": "团体标准",
        "id": 5,
        "root": true,
        "name": "group",
        "icon": "fa fa-cubes"
    },
    {
        "label": "企业标准",
        "id": 6,
        "root": true,
        "name": "enterprise",
        "icon": "fa fa-paste"
    }
]