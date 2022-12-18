// store/index.js
import { createStore } from 'vuex'

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

const store = createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {
        getPost() {
            API.get('/posts').then((res) => {
                console.log(res.data)
            })
        },
    },
})

export default store
