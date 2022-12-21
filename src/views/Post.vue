<template>
    <div class="container py-3">
        <div class="mb-3" v-if="userData !== null">
            <span> {{ collect ? '已收藏' : '未收藏' }}</span>
            <button class="btn btn-warning mx-3" @click="collectHandler">{{ collect ? '取消收藏' : '加入收藏' }}</button>
        </div>
        <img :src="postData.url" />
        <h1>{{ postData.title }}</h1>
        <p>{{ postData.desc }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userId: null,
            collect: false,
            userData: null,
        }
    },
    async created() {
        const id = this.$route.params.id
        const data = await this.$store.dispatch('getPost', id)
        this.userData = await this.$store.dispatch('getUserData')
        if (this.userData) {
            this.collect = data.collect.includes(this.userData.id)
            this.userId = this.userData.id
        }
    },
    methods: {
        collectHandler() {
            console.log(this.postData.collect)
            if (this.collect) {
                // 取消收藏
                const co = [...this.postData.collect]
                const index = co.indexOf(this.userId)
                co.splice(index, 1)
                console.log(co)
            } else {
                // 加入收藏
            }

            const data = {}
        },
    },
    computed: {
        postData() {
            return this.$store.getters.postData[0]
        },
    },
}
</script>
