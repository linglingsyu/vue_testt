import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import Admin from '/src/views/Admin.vue'
import Login from '/src/views/Login.vue'
import SignUp from '/src/views/SignUp.vue'
import Add from '/src/views/Add.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
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
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        console.log(localStorage.getItem('USER_TOKEN'))
        if (localStorage.getItem('USER_TOKEN') === undefined) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath },
            })
        } else {
            next()
            // if (!store.state.isAuthenticated) {
            //     next({
            //         path: '/login',
            //         params: { nextUrl: to.fullPath },
            //     })
            // } else {
            //     next()
            // }
        }
    } else {
        next()
    }
})

export default router
