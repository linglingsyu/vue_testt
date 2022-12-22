<template>
    <div class="container py-3">
        <div class="mb-3" v-if="collect !== null">
            <span> {{ collect.length > 0 ? '已收藏' : '未收藏' }}</span>
            <button class="btn btn-warning mx-3" @click="collectHandler">{{ collect.length > 0 ? '取消收藏' : '加入收藏' }}</button>
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
            collect: null,
            userData: null,
            postId: null,
        }
    },
    async created() {
        const id = this.$route.params.id
        const data = await this.$store.dispatch('getPost', id)
        this.userData = await this.$store.dispatch('getUserData')
        this.postId = id
        this.collect = await this.getCollect()
    },
    methods: {
        getCollect() {
            const data = {
                userId: this.userData.id,
                postId: this.postId,
            }
            return this.$store.dispatch('getCollect', data)
        },
        collectHandler(id) {
            const isCollect = this.collect.length > 0
            if (isCollect) {
                // 已收藏，取消
                this.$store.dispatch('deleteCollect', this.collect[0].id)
            } else {
                // 未收藏，加入
                const data = {
                    userId: this.userData.id,
                    postId: parseInt(this.postId),
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
            return this.$store.getters.collectData[0]
        },
    },
}
</script>
