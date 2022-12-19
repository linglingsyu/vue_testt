<template>home</template>

<script>
export default {
    created() {
        this.getPosts()
    },
    data() {
        return {}
    },
    methods: {
        getPosts() {
            this.$store.dispatch('getPost')
        },
    },
}
</script>
