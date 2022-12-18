<template>
    <!-- <nav class="relative flex items-center justify-center capitalize text-lg pt-24">
        <router-link class="inline pr-5" to="/" active-class="active">Home</router-link>
        <router-link class="inline" to="/about" active-class="active">About</router-link>
    </nav> -->
    <Header></Header>
    <router-view class="p-24"></router-view>
    <!-- <footer>
        <p class="text-gray-400 text-xs text-center">
            <a class="flex items-center justify-center text-base font-medium text-black" href="https://github.com/richardevcom/vite-vuex-tailwind"><GithubSVG class="w-5 mr-1" />richardev</a>
        </p>
    </footer> -->
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    components: {
        Header,
    },
}
</script>

<style lang="scss"></style>
