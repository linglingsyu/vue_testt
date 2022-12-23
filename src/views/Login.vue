<template>
    <div class="container">
        <h1>會員登入</h1>
        <form>
            <div class="mb-3">
                <label for="email" class="form-label">帳號</label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="admin@gmail.com" />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">密碼</label>
                <input type="password" class="form-control" id="password" v-model="pw" />
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="Login">送出</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            pw: '',
        }
    },
    methods: {
        async Login() {
            if (this.email.length > 0 && this.pw.length > 0) {
                const data = {
                    email: this.email,
                    password: this.pw,
                }
                const res = await this.$store.dispatch('Login', data)
                console.log(res)
                if (res.status === 400) {
                    alert(res.data)
                }
            }
        },
    },
}
</script>
