<template>
    <div class="container my-3">
        <a href="/add" class="btn btn-warning">+ 新增景點</a>
    </div>

    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th width="200px" scope="col">標題</th>
                    <th scope="col">簡述</th>
                    <th width="200px" scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) of postList" :key="'i' + item.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.title }}</td>
                    <td>{{ item.desc }}</td>
                    <td>
                        <a :href="'/edit/' + item.id" class="btn btn-warning">編輯</a>
                        <a href="#" class="btn btn-danger mx-3" @click.prevent="delPost(item.id)">刪除</a>
                    </td>
                </tr>
            </tbody>
        </table>
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
        delPost(id) {
            this.$store.dispatch('delPost', id)
        },
    },
    computed: {
        postList() {
            return this.$store.getters.postList
        },
    },
}
</script>
