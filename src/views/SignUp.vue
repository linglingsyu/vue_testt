<template>
    <div class="container">
        <h1>會員註冊</h1>
        <form>
            <div class="mb-3">
                <label for="email" class="form-label">帳號</label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="admin@gmail.com" />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">密碼</label>
                <input type="password" class="form-control" id="password" v-model="pw" />
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="signUp">送出</button>
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
        async signUp() {
            if (this.email.length > 0 && this.pw.length > 0) {
                const data = {
                    email: this.email,
                    password: this.pw,
                    role: 'user',
                }
                const res = await this.$store.dispatch('SignUp', data)
                if (res.status === 200 || res.status === 201) {
                    alert('註冊成功！')
                    location.href = '/login'
                } else {
                    alert(res.data)
                }
            }
        },
    },
}
</script>
