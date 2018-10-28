<script>
import bgImage from './src/img/bg.jpg';

import RemindPasswordForm from './src/com/Form/RemindPassword.vue';

export default {
  components: {
    RemindPasswordForm
  },
  data () {
    return {
      bgImage,
      userName: '',
      password: '',
      isLoading: false,
      isShowRemindPasswordForm: false
    };
  },
  beforeCreate() {
    /** @type {Api}*/
    this.api = this.$locator.Api;
  },
  mounted() {
    this.focusLoginInput();
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
};
</script>

<template>
  <div class="form-wrapper">
    <div class="logo">Platform<sup class="beta">BETA</sup></div>
    <div 
      v-loading.body="isLoading"
      class="auth-form"
      element-loading-background="#04171f69"
    >
      <div class="title">
        <span>Вход</span>
      </div>
      <div class="field">
        <el-input
          ref="loginInput"
          v-model="userName"
          :disabled="isLoading"
          type="text"
          placeholder="Логин"
          @keydown.native.enter="login"
        />
      </div>
      <div class="field">
        <el-input
          v-model="password"
          :disabled="isLoading"
          type="password"
          placeholder="Пароль"
          @keydown.native.enter="login"
        />
      </div>
      <div class="actions">
        <el-button
          type="info"
          @click="login"
        >
          Войти
        </el-button>
        <el-button
          style="color:#fff"
          type="text"
          @click="showRemindPasswordForm"
        >
          Забыли пароль?
        </el-button>
      </div>
    </div>
    <div>
      <el-dialog
        :visible.sync="isShowRemindPasswordForm"
        title="Восстановление пароля"
        width="560px"
      >
        <remind-password-form @send="closeRemindPasswordForm" />
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>

    .logo {
        color: #fff;
        margin-top: 80px;
        position: relative;
        font-size: 80px;
        font-weight: bold;
        text-transform: uppercase;
    }

    .logo .beta {
        text-transform: uppercase;
        top: -10px;
        position: absolute;
        font-size: 24px;
        color: #fff;
    }

    .title {
        display: flex;
        justify-content: center;
        color: #dad9d9;
        font-size: 10px;
        font-weight: 100;
        text-transform: uppercase;
    }

    .form-wrapper {
        background-image: linear-gradient(0deg, #000000, #4a84c2);
        width: 100%;
        display: flex;
        margin-top: -46px;
        flex-direction: column;
        align-items: center;
    }

    .auth-form {
        padding: 24px;
        border-radius: 4px;
        background-image: linear-gradient(0deg, #00000069, #4a84c2bf);
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


    .el-button--info {
        background-color: #3b6b9e;
        border-color: #3b6b9e;
    }
    .actions button {
        margin: 8px 0;
        width: 100%;
    }
</style>