<template>
    <div class="container">
        <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input type="text" id="title" class="form-control" v-model="title" />
        </div>
        <div class="mb-3">
            <label for="desc" class="form-label">簡述</label>
            <textarea type="text" id="desc" class="form-control" v-model="desc"></textarea>
        </div>
        <div class="mb-3">
            <label for="url" class="form-label">圖片網址</label>
            <input type="text" id="url" class="form-control" v-model="url" />
        </div>
        <div class="mb-3">
            <input type="button" class="btn btn-primary" value="更新" @click="submit" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            desc: '',
            url: '',
            id: null,
        }
    },
    async created() {
        const id = this.$route.params.id
        this.getPost(id)
    },
    methods: {
        async getPost(id) {
            const data = await this.$store.dispatch('getPost', id)
            if (data) {
                this.id = data.id
                this.title = data.title
                this.desc = data.desc
                this.url = data.url
            }
        },
        submit() {
            const data = {
                id: this.id,
                title: this.title,
                desc: this.desc,
                url: this.url,
            }
            this.$store.dispatch('editPost', data)
        },
    },
    // computed: {
    //     postData() {
    //         return this.$store.getters.postData[0]
    //     },
    // },
}
</script>
