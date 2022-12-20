<template>
    <img :src="postData.url" />
    <h1>{{ postData.title }}</h1>
    <p>{{ postData.desc }}</p>
</template>

<script>
export default {
    created() {
        const id = this.$route.params.id
        this.getPost(id)
    },
    methods: {
        getPost(id) {
            this.$store.dispatch('getPost', id)
        },
    },
    computed: {
        postData() {
            return this.$store.getters.postData[0]
        },
    },
}
</script>
