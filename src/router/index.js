import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import { Layout, Empty, Project, Solution, Standard } from '@/layout/index.js';
/* Empty */
/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: () => import('@/views/redirect')
        }]
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
        hidden: true
    },
    {
        path: '/register',
        component: () => import('@/views/register'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error/401'),
        hidden: true
    },
    /* {
        path: '',
        component: Layout,
        redirect: 'index',
        children: [{
            path: 'index',
            component: () => import('@/views/index'),
            name: 'Index',
            meta: { title: '主页', icon: 'dashboard', affix: true }
        }]
    }, */
    {
        path: '/index',
        redirect: '/',
        // component: (resolve) => require(['@/views/index'], resolve),
        hidden: true
    },
    {
        path: '/',
        component: Empty,
        // component: (resolve) => require(['@/views/index'], resolve),
        hidden: true,
        redirect: 'noredirect',
        children: [
            {
                path: '',
                component: () => import('@/views/index'),
                name: 'index',
                meta: { title: '门户首页' }
            },
            {
                path: '/user/personal',
                component: () => import('@/views/system/user/personal/index.vue'),
                hidden: true,
                meta: { title: '个人中心' }
            }
        ]
    },

    {
        path: '/home',
        component: Layout,
        redirect: 'noredirect',
        children: [{
            path: '',
            component: () => import('@/views/home'),
            name: 'home',
            meta: { title: '系统主页', icon: 'dashboard' }
        }]
    },
    {
        path: '/user',
        component: Layout,
        hidden: true,
        redirect: 'noredirect',
        children: [{
            path: 'profile',
            component: () => import('@/views/system/user/profile/index'),
            name: 'Profile',
            meta: { title: '个人中心', icon: 'user' }
        }]
    },
    {
        path: '/test',
        component: (resolve) => require(['@/views/test'], resolve),
        hidden: true
    },

    // 标准管理平台
    {
        path: '/standard',
        component: Standard,
        hidden: true,
        redirect: 'noredirect',
        children: [{
            path: '',
            component: () => import('@/views/standard/index'),
            name: 'standard-index',
            tabIndex: 'standard-index',
            meta: { title: '标准管理平台', tabIndex: 'standard-index' }
        },{
            path: '/standard/search',
            component: () => import('@/views/standard/search'),
            name: 'standard-search',
            tabIndex: 'standard-search',
            meta: { title: '标准搜索', tabIndex: 'standard-search' }
        },{
            path: '/standard/system',
            component: () => import('@/views/standard/system/list'),
            name: 'standard-system',
            tabIndex: 'standard-system',
            meta: { title: '标准体系', tabIndex: 'standard-system' }
        },{
            path: '/standard/formulate',
            component: () => import('@/views/standard/formulate/list'),
            name: 'standard-formulate',
            tabIndex: 'standard-formulate',
            meta: { title: '标准研制', tabIndex: 'standard-formulate' }
        }]
    },

    // 解决方案
    {
        path: '/project',
        component: Project,
        hidden: true,
        redirect: 'noredirect',
        children: [{
            path: '',
            component: () => import('@/views/project/index'),
            name: 'project-index',
            meta: { title: '解决方案-主页', tabIndex: 'index' }
        },{
            path: '/project/solution',
            component: () => import('@/views/project/solution'),
            name: 'project-solution',
            meta: { title: '解决方案-技术能力手册', path:'/project/solution' }
        },{
            path: '/project/list',
            component: () => import('@/views/project/list'),
            name: 'project-list',
            meta: { title: '解决方案-列表', path:'/project/list' }
        },{
            path: '/project/search',
            component: () => import('@/views/project/search'),
            name: 'project-search',
            meta: { title: '解决方案-搜索', path:'/project/search' }
        },{
            path: '/project/detail',
            component: () => import('@/views/project/detail'),
            name: 'project-detail',
            meta: { title: '解决方案-详情', path:'/project/detail' }
        },{
            path: '/project/knowledge',
            component: () => import('@/views/project/knowledge'),
            name: 'project-knowledge',
            meta: { title: '解决方案-更多知识', path:'/project/knowledge' }
        },{
            path: '/project/collection',
            component: () => import('@/views/project/collection'),
            name: 'project-collection',
            meta: { title: '解决方案-知识合辑', path:'/project/collection' }
        },{
            path: '/project/reward',
            component: () => import('@/views/project/reward'),
            name: 'project-reward',
            meta: { title: '解决方案-悬赏区', path:'/project/reward' }
        },{
            path: '/project/users/:userId(\\d+)',
            component: () => import('@/views/project/users'),
            name: 'project-users',
            meta: { title: '解决方案-用户', path:'/project/users' }
        },
        {
            path: '/project/together/:type',
            component: () => import('@/views/project/together'),
            name: 'project-together',
            meta: { title: '共创', path:'/project/together' }
        },
        ]
    },
    // 技术能力手册
    {
        path: '/solution',
        component: Solution,
        hidden: true,
        redirect: 'noredirect',
        children: [{
            path: '',
            component: () => import('@/views/solution/index'),
            name: 'solution-index',
            tabIndex: 'solution-index',
            meta: { title: '技术能力手册主页' }
        }]
    },
    // 新闻公告
    {
        path: '/news',
        component: Empty,
        hidden: true,
        redirect: 'noredirect',
        children: [{
            path: '',
            component: () => import('@/views/news/index'),
            name: 'news',
            meta: { title: '新闻公告' }
        },{
            path: '/news/detail',
            component: () => import('@/views/news/detail'),
            name: 'news-detail',
            meta: { title: '新闻公告详情' }
        }]
    },

]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [{
     path: '/system/user-auth',
        component: Layout,
        hidden: true,
        permissions: ['system:user:edit'],
        children: [{
            path: 'role/:userId(\\d+)',
            component: () => import('@/views/system/user/authRole'),
            name: 'AuthRole',
            meta: { title: '分配角色', activeMenu: '/system/user' }
        }]
    },
    {
        path: '/system/role-auth',
        component: Layout,
        hidden: true,
        permissions: ['system:role:edit'],
        children: [{
            path: 'user/:roleId(\\d+)',
            component: () => import('@/views/system/role/authUser'),
            name: 'AuthUser',
            meta: { title: '分配用户', activeMenu: '/system/role' }
        }]
    },
    {
        path: '/system/dict-data',
        component: Layout,
        hidden: true,
        permissions: ['system:dict:list'],
        children: [{
            path: 'index/:dictId(\\d+)',
            component: () => import('@/views/system/dict/data'),
            name: 'Data',
            meta: { title: '字典数据', activeMenu: '/system/dict' }
        }]
    },
    {
        path: '/monitor/job-log',
        component: Layout,
        hidden: true,
        permissions: ['monitor:job:list'],
        children: [{
            path: 'index',
            component: () => import('@/views/monitor/job/log'),
            name: 'JobLog',
            meta: { title: '调度日志', activeMenu: '/monitor/job' }
        }]
    },
    {
        path: '/tool/gen-edit',
        component: Layout,
        hidden: true,
        permissions: ['tool:gen:edit'],
        children: [{
            path: 'index/:tableId(\\d+)',
            component: () => import('@/views/tool/gen/editTable'),
            name: 'GenEdit',
            meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
        }]
    }
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
