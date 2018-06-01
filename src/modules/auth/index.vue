<script>
  import RemindPasswordForm from './com/Form/RemindPassword.vue'

  export default {
    components: {
      RemindPasswordForm
    },
    data () {
      return {
        userName: '',
        password: '',
        isLoading: false,
        isShowRemindPasswordForm: false
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
      showRemindPasswordForm() {
        this.isShowRemindPasswordForm = true;
      },
      closeRemindPasswordForm() {
        this.isShowRemindPasswordForm = false;
      }
    }
  }
</script>

<template>
    <page-container style="display: flex; margin-top: 150px;">
        <div class="form-wrapper">
            <div class="auth-form" v-if="!isShowRemindPasswordForm">
                <div class="title"><h1>Вход</h1></div>
                <div class="field">
                    <el-input
                        type="text"
                        placeholder="Логин"
                        :disabled="isLoading"
                        v-model="userName"
                        @keydown.native.enter="login"
                    />
                </div>
                <div class="field">
                    <el-input
                        type="password"
                        placeholder="Пароль"
                        :disabled="isLoading"
                        v-model="password"
                        @keydown.native.enter="login"
                    />
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
                        type="warning"
                        plain
                        @click="showRemindPasswordForm"
                    >
                        Забыли пароль?
                    </el-button>
                </div>
            </div>
            <div v-else>
                <remind-password-form />
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
        display: flex;
        flex-direction: column;
    }

    .actions button {
        margin: 8px 0;
        width: 100%;
    }
</style>