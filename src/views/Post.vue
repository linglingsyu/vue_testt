<template>
    <div class="container py-3">
        <div class="mb-3" v-if="LoginStatus">
            <span> {{ collectData.length > 0 ? '已收藏' : '未收藏' }}</span>
            <button class="btn btn-warning mx-3" @click="collectHandler">{{ collectData.length > 0 ? '取消收藏' : '加入收藏' }}</button>
        </div>
        <template v-if="postData">
            <img :src="postData.url" />
            <h1>{{ postData.title }}</h1>
            <p>{{ postData.desc }}</p>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: null,
            userData: null,
            postId: null,
        }
    },
    async created() {
        const id = this.$route.params.id
        await this.$store.dispatch('getPost', id)
        this.postId = parseInt(id)
        if (this.LoginStatus) {
            this.userData = await this.$store.dispatch('getUserData')
            console.log(this.userData)
            await this.getCollect(this.userData.id)
        }
    },
    methods: {
        getCollect(userId) {
            const data = {
                userId: userId,
                postId: this.postId,
            }
            return this.$store.dispatch('getCollect', data)
        },
        collectHandler(id) {
            const isCollect = this.collectData && Object.keys(this.collectData).length > 0
            if (isCollect) {
                // 已收藏，取消
                this.$store.dispatch('deleteCollect', this.collectData[0].id)
            } else {
                // 未收藏，加入
                const data = {
                    userId: this.userData.id,
                    postId: this.postId,
                }
                this.$store.dispatch('addCollect', data)
            }
        },
    },
    computed: {
        postData() {
            return this.$store.getters.postData[0]
        },
        collectData() {
            return this.$store.getters.collectData || []
        },
        LoginStatus() {
            return this.$store.getters.isLogin
        },
    },
    // watch: {
    //     collectData(old, newv) {
    //         console.log(old)
    //         console.log(newv)
    //     },
    // },
}
</script>
