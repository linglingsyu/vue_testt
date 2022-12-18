<template>
    <div class="container">
        <h1>會員登入</h1>
        <form>
            <div class="mb-3">
                <label for="email" class="form-label">帳號(Email)</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">密碼</label>
                <input type="password" class="form-control" id="password" />
            </div>
            <button type="submit" class="btn btn-primary">送出</button>
        </form>
    </div>
</template>
