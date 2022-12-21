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
            <input type="button" class="btn btn-primary" value="新增" @click="submit" />
            <a href="/admin" class="mx-3 btn btn-secondary">回管理首頁</a>
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
        }
    },
    methods: {
        submit() {
            const data = {
                collect: [],
                title: this.title,
                desc: this.desc,
                url: this.url,
            }
            this.$store.dispatch('addPost', data)
        },
    },
}
</script>
