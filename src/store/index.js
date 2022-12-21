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
    ADD_POST: 'ADD_POST',
    SET_POST: 'SET_POST',
    SET_POST_DATA: 'SET_POST_DATA',
    DEL_POST_DATA: 'DEL_POST_DATA',
}

const store = createStore({
    state: {
        userToken: null,
        userData: null,
        isAdmin: false,
        postList: [],
        postData: [],
    },
    getters: {
        postList: (state) => state.postList,
        postData: (state) => state.postData,
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
        // [Types.UPDATE_POST_DATA](state, data) {
        //     state.postData = data
        // },
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
                router.push({ name: 'Login' })
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
        async getCollectIdByPostId(state, postId) {
            try {
                const res = await API.get('/collect', { params: { postId: postId } })
                // console.log(res.data)
                if (res.data) return res.data[0]
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
        getUserData() {
            let data = localStorage.getItem('USER_DATA')
            if (data) {
                return JSON.parse(data)
            }
            return null
        },
    },
})

export default store
