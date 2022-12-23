import { createStore } from 'vuex'
import router from '../router'

import axios from 'axios'
import { isTemplateNode } from '@vue/compiler-core'
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
    ADD_POST: 'ADD_POST',
    SET_POST: 'SET_POST',
    SET_POST_DATA: 'SET_POST_DATA',
    DEL_POST_DATA: 'DEL_POST_DATA',
    SET_COLLECT: 'SET_COLLECT',
    SET_COLLECT_DATA: 'SET_COLLECT_DATA',
    DEL_COLLECT_DATA: 'DEL_COLLECT_DATA',
    ADD_COLLECT_DATA: 'ADD_COLLECT_DATA',
    SET_IS_LOGIN: 'SET_IS_LOGIN',
}

const store = createStore({
    state: {
        userToken: null,
        userData: null,
        isAdmin: false,
        postList: [],
        collectList: [],
        postData: [],
        collectData: [],
        isLogin: false,
    },
    getters: {
        postList: (state) => state.postList,
        postData: (state) => state.postData,
        collectData: (state) => state.collectData,
        collectList: (state) => state.collectList,
        isLogin: (state) => state.isLogin,
    },
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
        [Types.ADD_POST](state, data) {
            state.postList.push(data)
        },
        [Types.SET_POST](state, data) {
            state.postList = data
        },
        [Types.SET_POST_DATA](state, data) {
            state.postData = data
        },
        [Types.DEL_POST_DATA](state, id) {
            const index = state.postList.map((item) => item.id).indexOf(id)
            state.postList.splice(index, 1)
        },
        [Types.SET_COLLECT](state, data) {
            state.collectList.push(data)
        },
        [Types.SET_COLLECT_DATA](state, data) {
            state.collectData = data
        },
        [Types.ADD_COLLECT_DATA](state, data) {
            state.collectData.push(data)
        },

        [Types.DEL_COLLECT_DATA](state, collectId) {
            state.collectData = []
            let index = state.collectList.map((item) => item.collectId).indexOf(collectId)
            console.log(index)
            if (index !== -1) {
                state.collectList.splice(index, 1)
            }
        },
        [Types.SET_IS_LOGIN](state, status) {
            state.isLogin = status
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
                state.commit(Types.SET_IS_LOGIN, true)
                if (res.data.user.role === 'admin') {
                    localStorage.setItem('IS_ADMIN', true)
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
        async addPost(state, data) {
            try {
                const res = await API.post('/posts', data)
                state.commit(Types.ADD_POST, res.data)
                alert('新增成功')
                router.push({ name: 'Admin' })
                // // state.commit(Types.SET_USER_TOKEN, res.data.accessToken)
                // return { status: res.status, data: res.data }
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
        async getPosts(state) {
            try {
                const res = await API.get('/posts')
                state.commit(Types.SET_POST, res.data)
                // // state.commit(Types.SET_USER_TOKEN, res.data.accessToken)
                // return { status: res.status, data: res.data }
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
        async getPost(state, id) {
            try {
                const res = await API.get('/posts', { params: { id: id } })
                state.commit(Types.SET_POST_DATA, res.data)
                return res.data[0]
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
        async delPost(state, id) {
            try {
                await API.delete('/posts/' + id)
                state.commit(Types.DEL_POST_DATA, id)
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
        async getCollects(state) {
            try {
                const userId = await state.dispatch('getUserData', 'id')
                if (userId) {
                    const res = await API.get('/collect', { params: { userId: userId } })
                    if (res.data.length > 0) {
                        for (const item of res.data) {
                            let post = await state.dispatch('getPost', item.postId)
                            post.collectId = item.id
                            state.commit(Types.SET_COLLECT, post)
                        }
                    }
                }
                // // state.commit(Types.SET_USER_TOKEN, res.data.accessToken)
                // return { status: res.status, data: res.data }
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
        async getCollect(state, data) {
            try {
                const res = await API.get('/collect', { params: { postId: data.postId, userId: data.userId } })
                state.commit(Types.SET_COLLECT_DATA, res.data)
                return res.data
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
        async addCollect(state, data) {
            try {
                const res = await API.post('/collect', data)
                state.commit(Types.ADD_COLLECT_DATA, res.data)
                // return { status: res.status, data: res.data }
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
        async deleteCollect(state, id) {
            try {
                await API.delete('/Collect/' + id)
                state.commit(Types.DEL_COLLECT_DATA, id)
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
        async editPost(state, data) {
            try {
                // const copyData = JSON.parse(JSON.stringify(data))
                const id = data.id
                delete data.id
                const res = await API.patch('/posts/' + id, data)
                alert('更新成功!')
                router.push({ name: 'Admin' })
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
        getUserData(state, columnName = false) {
            let data = localStorage.getItem('USER_DATA')
            if (data) {
                data = JSON.parse(data)
                if (columnName) {
                    return data[columnName]
                } else {
                    return data
                }
            }
            return false
        },
        parseJwt(state, token) {
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
            state.commit(Types.SET_IS_LOGIN, false)
            localStorage.removeItem('USER_DATA')
            localStorage.removeItem('USER_TOKEN')
            localStorage.removeItem('IS_ADMIN')
            router.push({ name: 'Login' })
        },
    },
})

export default store
