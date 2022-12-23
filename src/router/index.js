import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '/src/components/Home.vue'
import Admin from '/src/views/Admin.vue'
import Login from '/src/views/Login.vue'
import SignUp from '/src/views/SignUp.vue'
import Add from '/src/views/Add.vue'
import Post from '/src/views/Post.vue'
import Edit from '/src/views/Edit.vue'
import Collect from '/src/views/Collect.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/add',
        name: 'Add',
        component: Add,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: Post,
    },
    {
        path: '/collect',
        name: 'Collect',
        component: Collect,
    },
    {
        path: '/edit/:id',
        name: 'Edit',
        component: Edit,
        meta: {
            requiresAuth: true,
        },
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem('USER_TOKEN')
    if (!token) {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            store.state.isLogin = false
            next({
                path: '/login',
                params: { nextUrl: to.fullPath },
            })
        } else {
            // 沒登入時，不需要驗證也能瀏覽
            next()
        }
    } else {
        const now = Math.floor(Date.now() / 1000)
        token = await store.dispatch('parseJwt', token)
        if (now > token.exp) {
            store.state.isLogin = false
            next({
                path: '/login',
                params: { nextUrl: to.fullPath },
            })
        } else {
            // 有登入，到後台需驗證身分
            if (to.matched.some((record) => record.meta.requiresAuth)) {
                const isAdmin = localStorage.getItem('IS_ADMIN')
                if (isAdmin && isAdmin === 'true') {
                    store.state.isLogin = true
                    next()
                } else {
                    next(from.fullPath)
                }
            } else {
                store.state.isLogin = true
                next()
            }
        }
    }
})

export default router
