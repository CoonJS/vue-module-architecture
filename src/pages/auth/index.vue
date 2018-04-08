<template>
    <div class="auth-page">
        <el-form>
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
                <el-button>Регистрация</el-button>
            </div>
        </el-form>
    </div>
</template>

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

    .field {
        padding: 12px 0;
    }

    .actions {
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
    }
</style>