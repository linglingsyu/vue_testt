<template>
    <div class="container">
        <div class="row gy-3">
            <div class="col-4" v-for="item of postList" :key="'i' + item.id">
                <div class="card">
                    <img :src="item.url" class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <p class="card-text">{{ item.desc }}</p>
                        <a :href="'/post/' + item.id" class="btn btn-primary">延伸閱讀</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    created() {
        this.getPosts()
    },
    methods: {
        getPosts() {
            this.$store.dispatch('getPosts')
        },
    },
    computed: {
        postList() {
            return this.$store.getters.postList
        },
    },
}
</script>
