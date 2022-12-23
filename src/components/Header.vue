<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">LOGO</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-if="!LoginStatus">
                        <router-link class="nav-link" :to="{ name: 'Login' }">登入</router-link>
                        <!-- <a class="nav-link" href="/login">登入</a> -->
                    </li>
                    <template v-else>
                        <!-- <li class="nav-item">
                            <a class="nav-link" href="">Hello !!</a>
                        </li> -->
                        <li class="nav-item">
                            <a class="nav-link" href="/collect">收藏列表</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
                        </li>
                    </template>
                    <li class="nav-item">
                        <router-link class="btn btn-primary" :to="{ name: 'SignUp' }">免費註冊</router-link>
                        <!-- <a href="" class="btn btn-primary">免費註冊</a> -->
                    </li>
                    <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {}
    },
    async created() {},
    async mounted() {},
    methods: {
        logout() {
            this.$store.dispatch('logout')
        },
    },
    computed: {
        LoginStatus() {
            return this.$store.state.isLogin
        },
    },
}
</script>
