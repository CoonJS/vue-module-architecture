<script>
  import bgImageSrc from './src/img/bg.jpg';
  console.log(bgImageSrc);

  import RemindPasswordForm from './src/com/Form/RemindPassword.vue'

  export default {
    components: {
      RemindPasswordForm
    },
    beforeCreate() {
      /** @type {Api}*/
      this.api = this.$locator.Api;
    },
    mounted() {
      this.focusLoginInput();
    },
    data () {
      return {
        userName: '',
        password: '',
        isLoading: false,
        isShowRemindPasswordForm: false,
        bgImageSrc: bgImageSrc
      }
    },
    methods: {
      async login() {
        this.isLoading = true;
        try {
          await this.api.auth(this.userName, this.password);
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
      focusLoginInput() {
        this.$nextTick(() => {
          this.$refs.loginInput.$el.querySelector('input').focus();
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
    <div class="form-wrapper" :style="{'background': `url(${bgImageSrc})`}">
        <h1 class="logo">Salestat</h1>
        <div class="auth-form">
            <div class="title">
                <h1>Вход</h1>
            </div>
            <div class="field">
                <el-input
                    ref="loginInput"
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
                    class="remind-btn"
                    plain
                    @click="showRemindPasswordForm"
                >
                    Забыли пароль?
                </el-button>
            </div>
        </div>
        <div>
            <el-dialog
                title="Восстановление пароля"
                :visible.sync="isShowRemindPasswordForm"
                width="560px"
            >
                <remind-password-form @send="closeRemindPasswordForm"/>
            </el-dialog>
        </div>
    </div>
</template>

<style scoped>

    .logo {
        color: #00222e;
        margin-top: 80px;
        font-size: 80px;
        font-weight: normal;
    }

    .title {
        display: flex;
        justify-content: center;
    }

    .form-wrapper {
        background-color: #f1f1f1;
        width: 100%;
        display: flex;
        margin-top: -46px;
        flex-direction: column;
        align-items: center;
    }

    .auth-form {
        padding: 24px;
        border-radius: 4px;
        background-color: #fff;
        margin-top: 80px;
        width: 280px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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

    .remind-btn {
        border: none;
    }
</style>