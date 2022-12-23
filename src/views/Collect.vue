<template>
    <div class="container">
        <div class="container">
            <div class="row gy-3" v-if="collectList.length > 0">
                <div class="col-4" v-for="item of collectList" :key="'i' + item.id">
                    <div class="card">
                        <button type="button" class="btn btn-danger position-absolute top-0 end-0 m-3" @click="delCollects(item.collectId)">取消收藏</button>
                        <img :src="item.url" class="card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <p class="card-text">{{ item.desc }}</p>
                            <a :href="'/post/' + item.id" class="btn btn-primary">延伸閱讀</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">沒有資料</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    created() {
        this.$store.dispatch('getCollects')
    },
    methods: {
        delCollects(id) {
            this.$store.dispatch('deleteCollect', id)
        },
    },
    computed: {
        collectList() {
            return this.$store.getters.collectList
        },
    },
}
</script>
