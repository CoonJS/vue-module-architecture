<template>
    <div class="auth-page">
        <div class="auth-form">
            <div class="title"><h1>Вход</h1></div>
            <div class="field">
                <el-input type="text" placeholder="Логин" v-model="userName"/>
            </div>
            <div class="field">
                <el-input type="password" placeholder="Пароль" v-model="password"/>
            </div>
            <div class="actions">
                <el-button type="success" @click="login">Войти</el-button>
                <el-button @click="login">Регистрация</el-button>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    data () {
      return {
        userName: '',
        password: ''
      }
    },
    methods: {
      login() {
        this.$locator.Api.auth(this.userName, this.password);
      }
    }
  }
</script>

<style scoped>
    .auth-page {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title {
        display: flex;
        justify-content: center;
    }

    .auth-form {
        width: 280px;
    }

    .field {
        padding: 12px 0;
    }

    .actions {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
    }
</style>