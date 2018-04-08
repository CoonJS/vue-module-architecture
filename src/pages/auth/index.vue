<template>
    <div class="auth-page">
        <div class="auth-form">
            <div class="field">
                <el-input type="text" placeholder="Login" v-model="userName"/>
            </div>
            <div class="field">
                <el-input type="password" placeholder="Password" v-model="password"/>
            </div>
            <div class="actions">
                <el-button type="success" @click="login">Login</el-button>
                <el-button type="primary" @click="login">Sign in</el-button>
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

    .auth-form {
        width: 400px;
    }

    .field {
        padding: 12px 0;
    }

    .actions {
        margin-top: 12px;
        display: flex;
    }
</style>