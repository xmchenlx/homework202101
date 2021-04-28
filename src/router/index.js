import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)

// 解决vue-router的bug
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes: [
        {
            path:'/',
            component: () => import('../components/pages/Layout.vue'),
            redirect:'/home',
            meta:{requiresAuth: true},
            children:[
                {
                    path:'/home',
                    component:() => import("../components/pages/home/Index.vue")
                },
                // 菜单管理
                {
                    path:'/menu',
                    component:() => import("../components/pages/menu/Index.vue")
                },
                {
                    path:'/menu/add',
                    component:() => import("../components/pages/menu/Edit.vue")
                },
                {
                    path:'/menu/:id',
                    component:() => import("../components/pages/menu/Edit.vue")
                },
                // 角色管理
                {
                    path:'/role',
                    component:() => import("../components/pages/role/Index.vue")
                },
                {
                    path:'/role/add',
                    component:() => import("../components/pages/role/Edit.vue")
                },
                {
                    path:'/role/:id',
                    component:() => import("../components/pages/role/Edit.vue")
                },
                // 管理员管理
                {
                    path:'/admin',
                    component:() => import("../components/pages/admin/Index.vue")
                },
                {
                    path:'/admin/add',
                    component:() => import("../components/pages/admin/Edit.vue")
                },
                {
                    path:'/admin/:id',
                    component:() => import("../components/pages/admin/Edit.vue")
                },
                 // 分类管理
                 {
                    path:'/cate',
                    component:() => import("../components/pages/cate/Index.vue")
                },
                {
                    path:'/cate/add',
                    component:() => import("../components/pages/cate/Edit.vue")
                },
                {
                    path:'/cate/:id',
                    component:() => import("../components/pages/cate/Edit.vue")
                },
                 // 规格管理
                 {
                    path:'/specs',
                    component:() => import("../components/pages/specs/Index.vue")
                },
                {
                    path:'/specs/add',
                    component:() => import("../components/pages/specs/Edit.vue")
                },
                {
                    path:'/specs/:id',
                    component:() => import("../components/pages/specs/Edit.vue")
                },
                 // 商品管理
                 {
                    path:'/goods',
                    component:() => import("../components/pages/goods/Index.vue")
                },
                {
                    path:'/goods/add',
                    component:() => import("../components/pages/goods/Edit.vue")
                },
                {
                    path:'/goods/:id',
                    component:() => import("../components/pages/goods/Edit.vue")
                }
            ]
        },
        {
            path:'/login',
            component: () => import('../components/pages/Login.vue')
        }
    ]
})

// 全局前置守卫，验证是否登录
router.beforeEach((to,from,next) =>{
    // console.log(to)
    // 判断目标路由是否需要登录才能访问
    if(to.matched.some(recored => recored.meta.requiresAuth)){

        // 进一步判断用户是否已经登录
        if(store.state.userInfo.token){
            next()
        }else{
            next({
                path:'/login',
                query:{ redirect: to.fullPath }
            })
        }
        
    }else{
        next()
    }
})

export default router;