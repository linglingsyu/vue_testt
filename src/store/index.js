import { createStore } from 'vuex'
import router from '../router'

import axios from 'axios'
const API = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
})

// 攔截請求
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
const Types = {
    SET_USER_TOKEN: 'SET_USER_TOKEN',
    SET_USER_DATA: 'SET_USER_DATA',
}

const store = createStore({
    state: {
        userToken: null,
        userData: null,
        isAdmin: false,
    },
    getters: {},
    mutations: {
        [Types.SET_USER_DATA](state, data) {
            state.userData = data
        },
        [Types.SET_USER_TOKEN](state, data) {
            state.userToken = data
        },
        [Types.SET_IS_ADMIN](state, data) {
            state.isAdmin = data
        },
    },
    actions: {
        async SignUp(state, data) {
            try {
                const res = await API.post('/register', data)
                // state.commit(Types.SET_USER_DATA, res.data.user)
                // state.commit(Types.SET_USER_TOKEN, res.data.accessToken)
                return { status: res.status, data: res.data.user }
                // console.log(res)
                // Work with the response...
            } catch (err) {
                if (err.response) {
                    // The client was given an error response (5xx, 4xx)
                    return err.response
                } else if (err.request) {
                    // The client never received a response, and the request was never left
                    console.log(err.request)
                } else {
                    // Anything else
                    console.log(err)
                }
            }
        },
        async Login(state, data) {
            try {
                const res = await API.post('/login', data)
                localStorage.setItem('USER_DATA', JSON.stringify(res.data.user))
                localStorage.setItem('USER_TOKEN', res.data.accessToken)
                // state.commit(Types.SET_USER_DATA, res.data.user)
                // state.commit(Types.SET_USER_TOKEN, res.data.accessToken)
                if (res.data.user.role === 'admin') {
                    localStorage.setItem('IS_ADMIN', true)
                    // location.href = '/admin'
                    router.push({ name: 'Admin' })
                } else {
                    localStorage.setItem('IS_ADMIN', false)
                    router.push({ name: 'Home' })
                }

                return { status: res.status, data: res.data }
            } catch (err) {
                if (err.response) {
                    // The client was given an error response (5xx, 4xx)
                    return err.response
                } else if (err.request) {
                    // The client never received a response, and the request was never left
                    console.log(err.request)
                } else {
                    // Anything else
                    console.log(err)
                }
            }
        },
        async checkLoginStatus(state) {
            let token = localStorage.getItem('USER_TOKEN')
            if (token === null) {
                this.$router.push({ name: 'Login' })
            } else {
                // 判斷是否過期
                const now = Math.floor(Date.now() / 1000)
                token = await state.dispatch('parseJwt', token)
                if (now > token.exp) {
                    //過期，登出
                    await state.dispatch('logout')
                } else {
                    return true
                }
            }
        },
        getPost() {
            API.get('/posts')
                .then((res) => {
                    // console.log(res.data)
                })
                .catch((err) => {
                    const error = err.response
                    throw error.message

                    return { status: error.status, message: error.message }
                })
        },
        parseJwt(state, token) {
            console.log(token)
            const base64Url = token.split('.')[1]
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            const jsonPayload = decodeURIComponent(
                window
                    .atob(base64)
                    .split('')
                    .map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                    })
                    .join('')
            )

            return JSON.parse(jsonPayload)
        },
        logout(state) {
            localStorage.removeItem('USER_DATA')
            localStorage.removeItem('USER_TOKEN')
            localStorage.removeItem('IS_ADMIN')
            // this.$router.push({ name: 'Login' })
        },
    },
})

export default store
