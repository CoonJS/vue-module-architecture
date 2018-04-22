<script>
  export default {
    data () {
      return {
        userName: '',
        password: '',
        isLoading: false
      }
    },
    methods: {
      async login() {
        this.isLoading = true;
        try {
          await this.$locator.Api.auth(this.userName, this.password);
        } catch(e) {
          this.showLoginError();
          this.isLoading = false;
        }
      },
      showLoginError() {
        this.$message({
          showClose: true,
          message: 'Неверный логин или пароль',
          type: 'error',
          duration: 2000
        });
      },
      redirectToRegisterPage() {
        this.$router.push('registration');
      }
    }
  }
</script>

<template>
    <page-container style="display: flex; align-items: center">
        <div class="form-wrapper">
            <div class="auth-form">
                <div class="title"><h1>Вход</h1></div>
                <div class="field">
                    <el-input type="text" placeholder="Логин" v-model="userName"/>
                </div>
                <div class="field">
                    <el-input type="password" placeholder="Пароль" v-model="password"/>
                </div>
                <div class="actions">
                    <el-button
                        type="success"
                        :loading="isLoading"
                        @click="login"
                    >
                        Войти
                    </el-button>
                    <el-button
                        type="primary"
                        class="register-button"
                        @click="redirectToRegisterPage"
                    >
                        Зарегистрироваться
                    </el-button>
                </div>
            </div>
        </div>
    </page-container>
</template>

<style scoped>
    .title {
        display: flex;
        justify-content: center;
    }

    .form-wrapper {
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

    .register-button {
        flex: 1;
    }
</style>